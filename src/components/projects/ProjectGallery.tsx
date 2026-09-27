import { useRef, useState, type KeyboardEvent, type TouchEvent } from 'react';
import { Icon } from '@/components/icons';
import Modal from '@/components/ui/Modal';
import { screenshotSrcSet, thumbnailSrc } from '@/lib/screenshots';
import { swipeStep } from '@/lib/swipe';

export type GalleryImage = { src: string; alt: string };

type Props = {
  images: GalleryImage[];
  className?: string;
};

export default function ProjectGallery({ images, className = '' }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const count = images.length;
  if (count === 0) return null;

  const current = images[index];
  const step = (delta: number) => setIndex((i) => (i + delta + count) % count);

  // Esc is handled by the <dialog>; arrows page through the images.
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
  };

  // On touch screens, swipe left / right to page. A second finger (pinch to
  // zoom) cancels the swipe. The dialog's touch-pan-y keeps the browser from
  // also treating the swipe as back / forward navigation.
  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = e.touches.length === 1 ? { x: t.clientX, y: t.clientY } : null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const delta = swipeStep(t.clientX - start.x, t.clientY - start.y);
    if (delta) step(delta);
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-[10px] border border-border-DEFAULT bg-bg-muted transition-colors duration-200 ease-out hover:border-border-strong"
          >
            {/* Tiles are at most ~340 px wide (3 columns from 768 px, 2 below),
                so they load the 720 px thumbnail; the lightbox loads the original. */}
            <img
              src={thumbnailSrc(img.src)}
              srcSet={screenshotSrcSet(img.src)}
              sizes="(min-width: 768px) 340px, 50vw"
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-[320ms] ease-out group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        label={`${current.alt} — image ${index + 1} of ${count}`}
        className="h-full max-h-none w-full max-w-none touch-pan-y touch-pinch-zoom bg-transparent p-4 open:flex open:items-center open:justify-center backdrop:bg-[rgb(12_10_9/0.88)] backdrop:backdrop-blur-[6px] sm:p-10"
      >
        {/* The dialog fills the screen; its empty area acts as the backdrop. */}
        <div
          onKeyDown={onKeyDown}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={() => {
            touchStart.current = null;
          }}
          className="contents"
        >
          <figure className="relative flex max-h-full max-w-[1200px] flex-col">
            <img
              src={current.src}
              alt={current.alt}
              loading="lazy"
              className="max-h-[78vh] w-auto rounded-[12px] border border-white/10 object-contain shadow-xl"
            />
            <figcaption className="mt-3 flex items-center justify-between gap-4 font-mono text-[11px] text-stone-400">
              <span>{current.alt}</span>
              <span className="shrink-0">
                {index + 1} / {count}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close gallery"
            className="overlay-button absolute right-4 top-4 h-10 w-10"
          >
            <Icon.Close className="h-5 w-5" />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="overlay-button absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 sm:left-4"
              >
                <Icon.ArrowRight className="h-5 w-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="overlay-button absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 sm:right-4"
              >
                <Icon.ArrowRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
