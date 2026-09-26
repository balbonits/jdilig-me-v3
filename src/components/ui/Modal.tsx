import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';

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
 * layer, an inert background (focus can't escape), Esc to close, and focus
 * return to the trigger — no library needed. Clicking the backdrop closes it.
 *
 * Keep `children` rendered while closed (the dialog hides them): unmounting
 * them first would drop focus and the browser couldn't restore it.
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
  const onClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={onClick}
      aria-label={label}
      aria-labelledby={labelledBy}
      className={`m-auto text-fg ${className}`}
    >
      {children}
    </dialog>
  );
}
