import express from "express";
import multer from "multer";
import { toFile } from "@imagekit/nodejs";
import imagekit from "../config/imagekit.js";
import Image from "../models/Image.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB per file
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

// GET /api/images — list all images, ordered for display
router.get("/", async (req, res) => {
  try {
    const images = await Image.find().sort({ order: 1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// POST /api/images — upload one or more images
router.post("/", upload.array("images", 20), async (req, res) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const lastImage = await Image.findOne().sort({ order: -1 });
    let nextOrder = lastImage ? lastImage.order + 1 : 0;

    const saved = [];
    for (const file of req.files) {
      // v5+ API: client.files.upload() with toFile() helper for Buffer
      const result = await imagekit.files.upload({
        file: await toFile(file.buffer, file.originalname, { type: file.mimetype }),
        fileName: file.originalname,
        folder: "/gallery",
      });

      const image = await Image.create({
        url: result.url,
        fileId: result.fileId,
        name: file.originalname,
        width: result.width,
        height: result.height,
        order: nextOrder++,
      });
      saved.push(image);
    }

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// PATCH /api/images/reorder — body: { orderedIds: [id1, id2, id3, ...] }
router.patch("/reorder", async (req, res) => {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ error: "orderedIds must be an array" });
    }

    await Promise.all(
      orderedIds.map((id, index) => Image.findByIdAndUpdate(id, { order: index }))
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Reorder failed" });
  }
});

// DELETE /api/images/:id
router.delete("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });

    // v5+ API: client.files.delete()
    await imagekit.files.delete(image.fileId);
    await image.deleteOne();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// Multer + general error handler for this router
router.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "File too large. Maximum allowed size is 50MB per image." });
  }
  if (err.code === "LIMIT_FILE_COUNT") {
    return res.status(400).json({ error: "Too many files. Maximum is 20 images per upload." });
  }
  if (err.message === "Only image files are allowed") {
    return res.status(415).json({ error: err.message });
  }
  console.error(err);
  res.status(500).json({ error: "An unexpected error occurred." });
});

export default router;