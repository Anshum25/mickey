import { profile, social } from '../../content/portfolio';
import type { OverlayKey } from '../../lib/overlays';
import { CopyButton, JumpLink, Panel, Slug } from '../ui/Primitives';
import { cn } from '../../lib/cn';

const linkClass = cn(
  'wipe font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-ink-2',
  'transition-colors duration-200 hover:bg-[length:100%_2px] hover:text-ink',
);

/** The classified box. The one panel on the page that is properly boxed. */
export function ContactPanel({ onOpen }: { onOpen: (key: OverlayKey) => void }) {
  return (
    <Panel className="bg-paper-2">
      <div className="flex min-h-0 flex-1 flex-col justify-between gap-[clamp(4px,1.2dvh,14px)] px-4 py-[clamp(7px,1.5dvh,18px)] very-short:py-1.5 lg:px-5">
        <div className="flex items-center gap-4">
          <Slug index="05" className="min-w-0 flex-1">
            Contact
          </Slug>
          <JumpLink onClick={() => onOpen('contact')} aria-haspopup="dialog">
            Open
          </JumpLink>
        </div>

        {/* --- Email, clickable, with a copy affordance --------------------- */}
        <div className="flex min-w-0 items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="wipe min-w-0 flex-1 truncate font-sans text-[13px] font-bold tracking-[-0.01em] text-ink transition-all duration-200 hover:bg-[length:100%_2px]"
          >
            {profile.email}
          </a>
          <CopyButton value={profile.email} size="sm" label={`Copy ${profile.email}`} />
        </div>

        {/* --- Channels ------------------------------------------------------ */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t-[1.5px] border-ink pt-[clamp(6px,1.3dvh,12px)] very-short:pt-1.5">
          <span className="flex items-center gap-4">
            <a href={social.github} target="_blank" rel="noreferrer noopener" className={linkClass}>
              GitHub
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className={linkClass}
            >
              LinkedIn
            </a>
            <a href={social.x} target="_blank" rel="noreferrer noopener" className={linkClass}>
              X
            </a>
          </span>
          <span className="slug">{profile.locationShort}</span>
        </div>
      </div>
    </Panel>
  );
}
