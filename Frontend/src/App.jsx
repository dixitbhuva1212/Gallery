import { useState, useRef, useCallback, useEffect } from "react";
import assest from './assets/logo.png'

const API_BASE = import.meta.env.VITE_API_BASE;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconUpload = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const IconDownload = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const IconX = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconAperture = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
    <line x1="9.69" y1="8" x2="21.17" y2="8" />
    <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
    <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
    <line x1="14.31" y1="16" x2="2.83" y2="16" />
    <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
  </svg>
);

// ─── Admin Password Modal ─────────────────────────────────────────────────────
function AdminModal({ onSuccess, onClose }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = () => {
    if (pw === ADMIN_PASSWORD) { onSuccess(); }
    else { setError(true); setPw(""); setTimeout(() => setError(false), 1200); }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1B19]/40 backdrop-blur-[3px] animate-[fadeIn_0.15s_ease]"
      onClick={onClose}
    >
      <div
        className="flex w-[330px] flex-col items-center gap-3.5 rounded-2xl border border-[#E8E3D8] bg-white p-8 shadow-[0_32px_64px_-16px_rgba(28,27,25,0.22)] animate-[modalIn_0.2s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-0.5 flex h-12 w-12 items-center justify-center rounded-full bg-[#3D5A4C]/10 text-[#3D5A4C] ring-1 ring-inset ring-[#3D5A4C]/15">
          <IconLock />
        </div>
        <h2 className="font-serif text-lg font-semibold tracking-tight text-[#1C1B19]">Admin access</h2>
        <p className="-mt-1 text-center text-[13px] leading-relaxed text-[#8A8478]">Enter the password to upload images</p>
        <input
          ref={inputRef}
          type="password"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className={`mt-1.5 w-full rounded-xl border bg-[#FAFAF8] px-4 py-2.5 text-sm text-[#1C1B19] outline-none transition-all duration-150 placeholder:text-[#B5AE9F] focus:bg-white focus:ring-2 focus:ring-[#3D5A4C]/15 ${
            error ? "border-[#B5483F] animate-[shake_0.35s_ease]" : "border-[#E8E3D8] focus:border-[#3D5A4C]"
          }`}
        />
        {error && (
          <p className="-mt-1.5 flex items-center gap-1.5 self-start text-xs font-medium text-[#B5483F]">
            <span className="h-1 w-1 rounded-full bg-[#B5483F]" />
            Incorrect password
          </p>
        )}
        <div className="mt-1.5 flex w-full gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-[#E8E3D8] py-2.5 text-[13px] font-medium text-[#8A8478] transition-colors duration-150 hover:border-[#D8D3C6] hover:bg-[#FAFAF8] hover:text-[#5C5648] active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="flex-1 rounded-xl bg-[#1C1B19] py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#3D5A4C] active:scale-[0.98]"
          >
            Unlock
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onNav }) {
  const img = images[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNav]);

  const download = async () => {
    try {
      const res = await fetch(img.url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = img.name || `image-${index + 1}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(img.url, "_blank");
    }
  };
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1C1B19]/96 backdrop-blur-sm animate-[fadeIn_0.18s_ease]"
      onClick={onClose}
    >
      <div
        className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-[#1C1B19]/70 via-[#1C1B19]/20 to-transparent px-5 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="max-w-[60%] truncate text-[13px] font-medium tracking-wide text-[#D8D3C6]">
          {img.name || `Image ${index + 1}`}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={download}
            aria-label="Download"
            className="flex items-center rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-[13px] font-medium text-[#F4F2EC] transition-colors duration-150 hover:border-white/25 hover:bg-white/20"
          >
            <IconDownload />

            <span className="ml-1.5">Download</span>
          </button>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-[#F4F2EC] transition-colors duration-150 hover:border-white/25 hover:bg-white/20"
          >
            <IconX size={14} />
          </button>
        </div>
      </div>

      <div
        key={img._id}
        className="flex max-h-[85vh] max-w-[90vw] items-center justify-center animate-[lightboxIn_0.22s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={img.url}
          alt={img.name}
          className="max-h-[85vh] max-w-[90vw] select-none rounded-sm object-contain shadow-[0_24px_64px_-12px_rgba(0,0,0,0.5)]"
          draggable={false}
        />
      </div>

      {index > 0 && (
        <button
          className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#F4F2EC] transition-all duration-150 hover:border-white/25 hover:bg-white/20 active:scale-95"
          onClick={(e) => { e.stopPropagation(); onNav(-1); }}
          aria-label="Previous"
        >
          <IconChevronLeft />
        </button>
      )}
      {index < images.length - 1 && (
        <button
          className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#F4F2EC] transition-all duration-150 hover:border-white/25 hover:bg-white/20 active:scale-95"
          onClick={(e) => { e.stopPropagation(); onNav(1); }}
          aria-label="Next"
        >
          <IconChevronRight />
        </button>
      )}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-xs font-medium tabular-nums tracking-wide text-[#D8D3C6]">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

// ─── Main Gallery ─────────────────────────────────────────────────────────────
export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const dragIndexRef = useRef(null);
  const inputRef = useRef(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    fetch(API_BASE)
      .then((r) => r.json())
      .then(setImages)
      .catch(() => showNotification("Couldn't load the gallery — check the server and refresh.", "error"))
      .finally(() => setLoading(false));
  }, []);

  const handleFiles = useCallback(async (fileList) => {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;
    const formData = new FormData();
    files.forEach((f) => formData.append("images", f));
    setUploading(true);
    setUploadProgress(0);
    const iv = setInterval(() => setUploadProgress((p) => (p < 85 ? p + 5 : p)), 200);
    try {
      const res = await fetch(API_BASE, { method: "POST", body: formData });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      clearInterval(iv);
      setUploadProgress(100);
      setTimeout(() => {
        setImages((prev) => [...prev, ...saved]);
        setUploading(false);
        setUploadProgress(0);
        showNotification(`${saved.length} image${saved.length > 1 ? "s" : ""} added to the gallery`);
      }, 400);
    } catch {
      clearInterval(iv);
      setUploading(false);
      setUploadProgress(0);
      showNotification("Upload failed — check the server and try again.", "error");
    }
  }, []);

  const onInputChange = (e) => { if (e.target.files?.length) handleFiles(e.target.files); e.target.value = ""; };

  const onDropZone = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!isAdmin) { setShowAdminModal(true); return; }
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  };

  const handleUploadClick = () => {
    if (!isAdmin) { setShowAdminModal(true); return; }
    inputRef.current?.click();
  };

  const persistOrder = useCallback(async (ordered) => {
    try {
      await fetch(`${API_BASE}/reorder`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: ordered.map((i) => i._id) }),
      });
    } catch { showNotification("Couldn't save the new order — try again.", "error"); }
  }, []);

  const moveImage = useCallback((index, dir) => {
    setImages((prev) => {
      const ni = index + dir;
      if (ni < 0 || ni >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[ni]] = [next[ni], next[index]];
      persistOrder(next);
      return next;
    });
  }, [persistOrder]);

  const removeImage = useCallback(async (index) => {
    const image = images[index];
    setImages((prev) => prev.filter((_, i) => i !== index));
    try {
      await fetch(`${API_BASE}/${image._id}`, { method: "DELETE" });
      showNotification("Image removed");
    } catch { showNotification("Couldn't delete the image — try again.", "error"); }
  }, [images]);

  const downloadImage = async (img, e) => {
    e.stopPropagation();
    try {
      const res = await fetch(img.url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = img.name || "image";
      a.click();
      URL.revokeObjectURL(url);
      showNotification("Download started");
    } catch { window.open(img.url, "_blank"); }
  };

  const onKeyDown = (e, index) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); moveImage(index, -1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); moveImage(index, 1); }
    else if ((e.key === "Delete" || e.key === "Backspace") && isAdmin) { e.preventDefault(); removeImage(index); }
    else if (e.key === "Enter") setLightboxIndex(index);
  };

  const onCardDragStart = (index) => { dragIndexRef.current = index; };
  const onCardDragOver = (e, index) => { e.preventDefault(); setDragOverIndex(index); };
  const onCardDrop = (e, index) => {
    e.preventDefault();
    const from = dragIndexRef.current;
    if (from === null || from === index) { setDragOverIndex(null); return; }
    setImages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(index, 0, moved);
      persistOrder(next);
      return next;
    });
    dragIndexRef.current = null;
    setDragOverIndex(null);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-sans text-[#1C1B19] antialiased">
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={(dir) => setLightboxIndex((i) => Math.max(0, Math.min(images.length - 1, i + dir)))}
        />
      )}

      {showAdminModal && (
        <AdminModal
          onSuccess={() => { setIsAdmin(true); setShowAdminModal(false); setTimeout(() => inputRef.current?.click(), 100); }}
          onClose={() => setShowAdminModal(false)}
        />
      )}

      {notification && (
        <div
          className={`fixed right-5 top-5 z-[300] flex items-center gap-2.5 rounded-xl px-4 py-3 text-[13px] font-medium text-white shadow-[0_12px_32px_-8px_rgba(28,27,25,0.3)] animate-[toastIn_0.25s_cubic-bezier(0.16,1,0.3,1)] ${
            notification.type === "error" ? "bg-[#B5483F]" : "bg-[#3D5A4C]"
          }`}
        >
          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/70" />
          {notification.message}
        </div>
      )}

      <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-14 sm:px-8">
        {/* Header */}
        <header className="mb-12 flex flex-wrap items-end justify-between gap-5 border-b border-[#E8E3D8] pb-7">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-12 items-center justify-center rounded-xl bg-[#1C1B19] text-[#FAFAF8] shadow-sm">
              <img src={assest} alt="" />
            </div>
            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A8478]">
                Contact Sheet
              </div>
              <h1 className="font-serif text-[32px] font-semibold leading-none tracking-tight text-[#1C1B19]">
                Dixit's Lens
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!loading && (
              <span className="rounded-full bg-[#EFEBE2] px-3 py-1 text-[12px] font-medium tabular-nums text-[#8A8478]">
                {images.length} {images.length === 1 ? "frame" : "frames"}
              </span>
            )}
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <span className="flex items-center rounded-full border border-[#3D5A4C]/20 bg-[#3D5A4C]/8 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-[#3D5A4C]">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" className="mr-1.5">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                  Admin
                </span>
                <button
                  onClick={handleUploadClick}
                  disabled={uploading}
                  className="flex items-center rounded-xl bg-[#1C1B19] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#3D5A4C] hover:shadow-md active:scale-[0.97] disabled:opacity-60 disabled:active:scale-100"
                >
                  <IconUpload />
                  <span className="ml-1.5">{uploading ? "Uploading…" : "Upload"}</span>
                </button>
                <button
                  onClick={() => setIsAdmin(false)}
                  title="Sign out of admin"
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-[#E8E3D8] text-[#8A8478] transition-colors duration-150 hover:border-[#D8D3C6] hover:bg-white hover:text-[#5C5648]"
                >
                  <IconX size={12} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleUploadClick}
                className="flex items-center rounded-xl border border-[#E8E3D8] px-4 py-2.5 text-[13px] font-medium text-[#8A8478] transition-all duration-150 hover:border-[#C9C2B4] hover:bg-white hover:text-[#1C1B19] active:scale-[0.97]"
              >
                <IconLock />
                <span className="ml-1.5">Admin upload</span>
              </button>
            )}
            <input ref={inputRef} type="file" accept="image/*" multiple onChange={onInputChange} className="hidden" />
          </div>
        </header>

        {uploading && (
          <div className="mb-7 h-[3px] overflow-hidden rounded-full bg-[#EFEBE2]">
            <div
              className="h-full animate-[progressPulse_1s_ease_infinite] rounded-full bg-[#3D5A4C] transition-[width] duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        {isAdmin && (
          <div
            onDrop={onDropZone}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onClick={handleUploadClick}
            className={`mb-14 cursor-pointer rounded-2xl border border-dashed px-6 py-11 text-center transition-all duration-200 ${
              isDragOver
                ? "border-[#3D5A4C] bg-[#3D5A4C]/[0.05] shadow-[inset_0_0_0_1px_rgba(61,90,76,0.1)]"
                : "border-[#D8D3C6] hover:border-[#B5AE9F] hover:bg-[#1C1B19]/[0.012]"
            }`}
          >
            <div className={`mb-3 flex justify-center text-[#B5AE9F] transition-transform duration-200 ${isDragOver ? "scale-110" : ""}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div className="mb-1.5 text-[15px] font-medium text-[#5C5648]">
              {uploading ? "Uploading…" : isDragOver ? "Drop to upload" : "Drop images here or click to browse"}
            </div>
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#B5AE9F]">PNG · JPG · GIF · WebP · up to 50 MB each</div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
            {[220, 280, 200, 260, 230, 240].map((h, i) => (
              <div
                key={i}
                className="animate-[skeletonPulse_1.6s_ease_infinite] rounded-2xl bg-[#EFEBE2]"
                style={{ height: h, animationDelay: `${i * 90}ms` }}
              />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-[#E8E3D8] py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFEBE2] text-[#B5AE9F]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div>
              <p className="mb-1 text-[15px] font-medium text-[#5C5648]">Nothing here yet</p>
              <p className="text-[13px] text-[#B5AE9F]">{isAdmin ? "Upload images to fill the sheet" : "Check back soon"}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-end gap-1.5 text-[11px] font-medium tracking-wide text-[#B5AE9F]">
              {isAdmin
                ? "Click to view · Drag to reorder · ← → on a focused frame"
                : "Click to view · ← → to browse"}
            </div>
            <div className="[column-gap:16px] sm:columns-2 md:columns-3 lg:columns-3">
              {images.map((img, index) => (
                <div
                  key={img._id}
                  tabIndex={0}
                  draggable={isAdmin}
                  onDragStart={() => isAdmin && onCardDragStart(index)}
                  onDragOver={(e) => isAdmin && onCardDragOver(e, index)}
                  onDrop={(e) => isAdmin && onCardDrop(e, index)}
                  onDragEnd={() => setDragOverIndex(null)}
                  onKeyDown={(e) => onKeyDown(e, index)}
                  onClick={() => setLightboxIndex(index)}
                  className={`group relative mb-4 cursor-pointer break-inside-avoid rounded-2xl bg-white p-2 shadow-[0_1px_2px_rgba(28,27,25,0.04),0_8px_24px_-8px_rgba(28,27,25,0.10)] outline-none transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(28,27,25,0.04),0_20px_40px_-14px_rgba(28,27,25,0.18)] focus-visible:ring-2 focus-visible:ring-[#3D5A4C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF8] ${
                    dragOverIndex === index ? "scale-[0.97] opacity-60 ring-2 ring-[#3D5A4C]" : ""
                  }`}
                >
                  {/* mat-board frame, the signature element */}
                  <div className="relative overflow-hidden rounded-xl ring-1 ring-inset ring-[#1C1B19]/[0.05] transition-[padding] duration-200 group-hover:p-2">
                    <img
                      src={img.url}
                      alt={img.name}
                      width={img.width}
                      height={img.height}
                      className="block w-full select-none rounded-lg transition-[border-radius] duration-200 group-hover:rounded-md"
                      draggable={false}
                    />

                    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-[#1C1B19]/25 via-transparent to-[#1C1B19]/35 p-2.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                      <div className="pointer-events-auto flex items-start justify-between">
                        <span className="rounded-md bg-[#1C1B19]/60 px-2 py-0.5 text-[10px] font-semibold tabular-nums tracking-wide text-white/95 backdrop-blur-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={(e) => downloadImage(img, e)}
                            aria-label="Download"
                            title="Download"
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1C1B19]/60 text-white/95 backdrop-blur-sm transition-colors duration-150 hover:bg-[#1C1B19]/80"
                          >
                            <IconDownload />
                          </button>
                          {isAdmin && (
                            <button
                              onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                              aria-label="Remove"
                              title="Delete"
                              className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1C1B19]/60 text-[#F0A39C] backdrop-blur-sm transition-colors duration-150 hover:bg-[#1C1B19]/80"
                            >
                              <IconX />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="pointer-events-auto">
                        {img.name && (
                          <div className="mb-1.5 truncate text-[11px] font-medium text-white/95">{img.name}</div>
                        )}
                        {isAdmin && (
                          <div className="flex gap-1.5">
                            <button
                              onClick={(e) => { e.stopPropagation(); moveImage(index, -1); }}
                              disabled={index === 0}
                              aria-label="Move left"
                              className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1C1B19]/60 text-white/95 backdrop-blur-sm transition-colors duration-150 hover:bg-[#1C1B19]/80 disabled:opacity-25"
                            >
                              <IconChevronLeft />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); moveImage(index, 1); }}
                              disabled={index === images.length - 1}
                              aria-label="Move right"
                              className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1C1B19]/60 text-white/95 backdrop-blur-sm transition-colors duration-150 hover:bg-[#1C1B19]/80 disabled:opacity-25"
                            >
                              <IconChevronRight />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-sans { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.96) translateY(4px) } to { opacity: 1; transform: scale(1) translateY(0) } }
        @keyframes lightboxIn { from { opacity: 0; transform: scale(0.98) } to { opacity: 1; transform: scale(1) } }
        @keyframes skeletonPulse { 0%, 100% { opacity: .5 } 50% { opacity: .85 } }
        @keyframes toastIn { from { transform: translateY(-12px) scale(0.96); opacity: 0 } to { transform: translateY(0) scale(1); opacity: 1 } }
        @keyframes progressPulse { 0%, 100% { opacity: 1 } 50% { opacity: .65 } }
        @keyframes shake { 0%, 100% { transform: translateX(0) } 20%, 60% { transform: translateX(-6px) } 40%, 80% { transform: translateX(6px) } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}