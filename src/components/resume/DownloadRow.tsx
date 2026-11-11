import { Icon } from '@/components/icons';
import { PROFILE } from '@/data/profile';

/** The resume PDF download link, shown on Home and Resume. */
export function DownloadRow() {
  return (
    <a
      href={PROFILE.resumePdf}
      download
      className="mt-5 flex min-h-12 w-full items-center gap-2 rounded-[2px] border border-border-DEFAULT bg-surface px-4 text-[15px] font-medium text-accent underline underline-offset-[3px] sm:w-auto sm:inline-flex"
    >
      <Icon.Document className="h-4 w-4" aria-hidden="true" />
      Download resume (PDF, {PROFILE.resumePdfSize})
    </a>
  );
}
