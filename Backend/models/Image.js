import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    fileId: { type: String, required: true }, // ImageKit file id, needed to delete the file later
    name: { type: String, default: "" },
    width: { type: Number },
    height: { type: Number },
    order: { type: Number, required: true }, // position in the gallery, lower = earlier
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);