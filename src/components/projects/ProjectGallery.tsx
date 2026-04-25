import { useCallback, useEffect, useState } from 'react';
import { Icon } from '@/components/icons';

export type GalleryImage = { src: string; alt: string };

type Props = {
  images: GalleryImage[];
  className?: string;
};

export default function ProjectGallery({ images, className = '' }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const close = useCallback(() => setOpenIdx(null), []);

  const next = useCallback(() => {
    setOpenIdx((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  const prev = useCallback(() => {
    setOpenIdx((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIdx, close, next, prev]);

  if (images.length === 0) return null;

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpenIdx(i)}
            className="group relative overflow-hidden rounded-[10px] border border-border-DEFAULT bg-bg-muted transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:border-border-strong"
            style={{ aspectRatio: '16 / 10' }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-[320ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {openIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${images[openIdx].alt} — image ${openIdx + 1} of ${images.length}`}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10"
        >
          <div
            onClick={close}
            className="absolute inset-0"
            style={{
              background: 'rgba(12, 10, 9, 0.88)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          <div className="relative flex max-h-full max-w-[1200px] flex-col">
            <img
              src={images[openIdx].src}
              alt={images[openIdx].alt}
              className="max-h-[82vh] w-auto rounded-[12px] border border-border-DEFAULT object-contain shadow-xl"
            />
            <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-fg-faint">
              <span>{images[openIdx].alt}</span>
              <span>
                {openIdx + 1} / {images.length}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-slate-100 transition hover:bg-white/10"
            style={{
              background: 'rgba(28, 25, 23, 0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Icon.Close className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-slate-100 transition hover:bg-white/10"
                style={{
                  background: 'rgba(28, 25, 23, 0.6)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Icon.ArrowRight className="h-5 w-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-slate-100 transition hover:bg-white/10"
                style={{
                  background: 'rgba(28, 25, 23, 0.6)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Icon.ArrowRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
