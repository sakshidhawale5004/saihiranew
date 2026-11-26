import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  badge?: string;
}

// Contextual helpers to infer slide type for gourmet packaging shots
function getImageLabel(index: number, total: number): string {
  if (total === 7) {
    switch (index) {
      case 0:
        return "3D Box Pack";
      case 1:
        return "Box Front";
      case 2:
        return "Pack & Bhakhri";
      case 3:
        return "Vacuum Pouch";
      case 4:
        return "Serving Shot";
      case 5:
        return "Purity & Quality";
      case 6:
        return "Nutrition Facts";
      default:
        return `Photo ${index + 1}`;
    }
  }
  if (total === 6) {
    switch (index) {
      case 0:
        return "Vacuum Pack";
      case 1:
        return "Crisp Discs";
      case 2:
        return "Chai Pairing";
      case 3:
        return "Golden Stack";
      case 4:
        return "Purity Highlights";
      case 5:
        return "Nutrition Facts";
      default:
        return `Photo ${index + 1}`;
    }
  }
  if (total === 5) {
    switch (index) {
      case 0:
        return "Vacuum Pouch";
      case 1:
        return "Artisan Stack";
      case 2:
        return "Serving Platter";
      case 3:
        return "100% Vegan";
      case 4:
        return "Nutrition Facts";
      default:
        return `Photo ${index + 1}`;
    }
  }
  if (index === 0) {
    return "Vacuum Pouch";
  }
  return `View ${index + 1}`;
}

export function ProductGallery({ images, productName, badge }: ProductGalleryProps) {
  // Ensure we have at least one valid image
  const galleryList = images && images.length > 0 ? images : ["/favicon.png"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Keep index in bounds if images change
  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  const currentImage = galleryList[selectedIndex] || galleryList[0];

  const goNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % galleryList.length);
  }, [galleryList.length]);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
  }, [galleryList.length]);

  // Keyboard navigation for gallery & lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      } else if (e.key === "Escape" && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, isLightboxOpen]);

  return (
    <div className="flex flex-col gap-4">
      {/* ──────────────── Main Hero Image Frame ──────────────── */}
      <div className="relative group overflow-hidden rounded-2xl border border-border/80 bg-[#FAF7F2] p-6 sm:p-8 shadow-deep transition-all duration-300">
        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
          {badge && (
            <span className="rounded-full bg-accent/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
              {badge}
            </span>
          )}
          <span className="rounded-full bg-primary/80 px-2.5 py-1 text-[0.65rem] font-medium text-white shadow-sm backdrop-blur-md">
            {getImageLabel(selectedIndex, galleryList.length)}
          </span>
        </div>

        {/* Counter and Fullscreen Trigger */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <span className="rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white/95 backdrop-blur-md">
            {selectedIndex + 1} / {galleryList.length}
          </span>
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            aria-label="Enlarge image"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm backdrop-blur-md transition-all hover:bg-white hover:text-accent hover:scale-105"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        {/* The Active Image */}
        <div
          className="relative aspect-square w-full flex items-center justify-center cursor-zoom-in"
          onClick={() => setIsLightboxOpen(true)}
        >
          <img
            key={currentImage}
            src={currentImage}
            alt={`${productName} - ${getImageLabel(selectedIndex, galleryList.length)}`}
            className="h-full w-full object-contain max-h-[460px] mx-auto transition-all duration-300 animate-in fade-in zoom-in-95"
            loading="eager"
          />
        </div>

        {/* Prev / Next Navigation Arrows (visible if more than 1 image) */}
        {galleryList.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-md backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-accent hover:scale-110 active:scale-95 opacity-80 group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-md backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-accent hover:scale-110 active:scale-95 opacity-80 group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Subtle click to zoom helper */}
        <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-[0.7rem] text-muted-foreground/80 pointer-events-none">
          <ZoomIn className="h-3 w-3" />
          <span>Click to expand</span>
        </div>
      </div>

      {/* ──────────────── Thumbnails Strip ──────────────── */}
      {galleryList.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 px-1 scrollbar-thin">
          {galleryList.map((thumbUrl, idx) => {
            const isSelected = idx === selectedIndex;
            const label = getImageLabel(idx, galleryList.length);
            return (
              <button
                key={`${thumbUrl}-${idx}`}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`group relative flex-shrink-0 h-18 w-18 sm:h-20 sm:w-20 rounded-xl overflow-hidden border-2 bg-[#FAF7F2] p-1 transition-all duration-200 ${
                  isSelected
                    ? "border-accent ring-2 ring-accent/30 shadow-md scale-102"
                    : "border-border/70 hover:border-accent/60 opacity-75 hover:opacity-100"
                }`}
                title={label}
              >
                <img
                  src={thumbUrl}
                  alt={label}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[0.55rem] font-medium text-white/90 py-0.5 text-center truncate px-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* ──────────────── Fullscreen Lightbox Modal ──────────────── */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close fullscreen"
            className="absolute top-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Lightbox Header Info */}
          <div className="absolute top-5 left-6 z-50 text-white">
            <h3 className="font-display text-lg font-medium text-white/95">
              {productName}
            </h3>
            <p className="text-xs text-white/70">
              {getImageLabel(selectedIndex, galleryList.length)} · {selectedIndex + 1} of{" "}
              {galleryList.length}
            </p>
          </div>

          {/* Modal Image Box */}
          <div
            className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage}
              alt={`${productName} view`}
              className="max-h-[80vh] max-w-[85vw] object-contain rounded-lg drop-shadow-2xl"
            />
          </div>

          {/* Lightbox Previous / Next */}
          {galleryList.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous"
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next"
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          {/* Lightbox Bottom Thumbnails */}
          {galleryList.length > 1 && (
            <div
              className="absolute bottom-5 inset-x-0 flex justify-center gap-2 px-4 overflow-x-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryList.map((thumb, i) => (
                <button
                  key={`lb-${thumb}-${i}`}
                  type="button"
                  onClick={() => setSelectedIndex(i)}
                  className={`h-14 w-14 rounded-lg overflow-hidden border-2 bg-white/10 p-0.5 transition-all ${
                    i === selectedIndex
                      ? "border-accent ring-2 ring-accent scale-105"
                      : "border-white/30 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={thumb}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
