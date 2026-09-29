import {
  useEffect,
  useRef,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  /** Accessible name — pass one of these two. */
  label?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

/**
 * A native <dialog> opened with showModal(). The browser provides the top
 * layer, an inert page behind it (Tab never lands there), Esc to close, and
 * focus return to the trigger — no library needed. Clicking the backdrop
 * closes it (but not a press that starts or ends inside the dialog, like
 * selecting text).
 *
 * `children` stay rendered while closed (the dialog hides them), so focus is
 * still inside the dialog when close() runs. In Chromium, focus also returned
 * to the trigger when the content unmounted first; other browsers are untested.
 */
export default function Modal({
  open,
  onClose,
  label,
  labelledBy,
  className = '',
  children,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  // Clicks on the ::backdrop are dispatched to the <dialog> element itself.
  // A drag that starts in the content and ends on the backdrop is also
  // reported as a click on the <dialog> (the nearest common ancestor), so the
  // press and the release must both land on the backdrop.
  const onBackdrop = useRef(false);
  const onPointerDown = (e: PointerEvent<HTMLDialogElement>) => {
    onBackdrop.current = e.target === e.currentTarget;
  };
  const onPointerUp = (e: PointerEvent<HTMLDialogElement>) => {
    onBackdrop.current &&= e.target === e.currentTarget;
  };
  const onClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget && onBackdrop.current) onClose();
    onBackdrop.current = false;
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onClick={onClick}
      aria-label={label}
      aria-labelledby={labelledBy}
      className={`m-auto text-fg ${className}`}
    >
      {children}
    </dialog>
  );
}
