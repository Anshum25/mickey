import { footer, profile } from '../content/portfolio';

/** The colophon. */
export function Footer() {
  return (
    <footer className="flex h-9 shrink-0 items-center justify-between gap-3 border-t-[2.5px] border-ink bg-paper px-3 sm:h-10 sm:px-5">
      <p className="slug truncate">
        {footer.copyright}
        <span className="hidden sm:inline"> · {profile.roleShort}</span>
      </p>

      <p className="hidden truncate font-editorial text-[13px] italic tracking-normal text-ink-2 lg:block">
        “{footer.quote}”
      </p>

      <p className="slug shrink-0 truncate">
        <span className="hidden sm:inline">Set in Archivo &amp; Instrument Serif · </span>
        {footer.note}
      </p>
    </footer>
  );
}
