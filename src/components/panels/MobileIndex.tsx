import { experience, expertise, profile, projects } from '../../content/portfolio';
import { NAV, type OverlayKey } from '../../lib/overlays';
import { cn } from '../../lib/cn';

/** Short readouts so each entry says something, not just a label. */
const READOUT: Record<OverlayKey, string> = {
  about: profile.locationShort,
  work: `${projects.length} projects`,
  experience: `${experience.length} roles`,
  skills: `${expertise.length} areas`,
  contact: 'Email · GitHub',
};

/**
 * Below `md` the columns would have to shrink past legibility, so the front
 * page stays concise and each section is reached through its own overlay —
 * set as the paper's index. Nothing is lost, only relocated.
 */
export function MobileIndex({ onOpen }: { onOpen: (key: OverlayKey) => void }) {
  return (
    <nav aria-label="Sections" className="press-grid grid shrink-0 grid-cols-2 md:hidden">
      {NAV.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onOpen(item.key)}
          aria-haspopup="dialog"
          className={cn(
            'group relative flex items-baseline gap-2 bg-paper px-3.5 py-3 text-left',
            'transition-colors duration-150 active:bg-acid active:text-acid-ink',
            // The last entry spans the full width when the count is odd.
            'last:odd:col-span-2',
          )}
        >
          <span className="slug font-semibold text-acid group-active:text-acid-ink">
            {item.index}
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="deck truncate text-[14px] text-ink group-active:text-acid-ink">
              {item.label}
            </span>
            <span className="slug truncate group-active:text-acid-ink">{READOUT[item.key]}</span>
          </span>
          <span aria-hidden className="shrink-0 text-[11px] text-ink-3 group-active:text-acid-ink">
            →
          </span>
        </button>
      ))}
    </nav>
  );
}
