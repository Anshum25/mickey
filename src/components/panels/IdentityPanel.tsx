import { education, interests } from '../../content/portfolio';
import type { OverlayKey } from '../../lib/overlays';
import { JumpLink, Panel, Slug } from '../ui/Primitives';
import { IdentitySculpture } from '../visual/IdentitySculpture';

/**
 * The plate.
 *
 * A line-art solid printed on a halftone screen and captioned like a figure
 * in a technical paper. Deliberately not a photograph and not a stock AI
 * illustration.
 *
 * Below `md` the plate turns on its side: the object sits in a square at the
 * left of a short band with its caption beside it, so it keeps a usable size
 * instead of being squeezed into a sliver.
 */
export function IdentityPanel({ onOpen }: { onOpen: (key: OverlayKey) => void }) {
  return (
    <Panel className="flex-row bg-paper-2 md:flex-col">
      {/* --- The plate ------------------------------------------------------ */}
      <div className="relative aspect-square h-full shrink-0 overflow-hidden border-r border-rule md:order-2 md:aspect-auto md:h-auto md:min-h-0 md:w-auto md:flex-1 md:border-r-0">
        <span aria-hidden className="halftone pointer-events-none absolute inset-0" />
        <IdentitySculpture className="absolute inset-0 size-full" />

        {/* Crop marks, as on a printed plate. */}
        <span aria-hidden className="pointer-events-none absolute left-2 top-2 size-2 border-l border-t border-ink" />
        <span aria-hidden className="pointer-events-none absolute right-2 top-2 size-2 border-r border-t border-ink" />
        <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 size-2 border-b border-l border-ink" />
        <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 size-2 border-b border-r border-ink" />

        <span className="slug absolute bottom-2.5 left-1/2 hidden -translate-x-1/2 md:block">
          Fig. 1 — Ico. 12V / 30E
        </span>
      </div>

      {/* --- Plate number ---------------------------------------------------- */}
      <div className="hidden shrink-0 px-4 pt-4 md:order-1 md:block lg:px-5 lg:pt-5">
        <Slug index="01">Identity</Slug>
      </div>

      {/* --- Caption --------------------------------------------------------- */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 px-4 py-3 md:order-3 md:flex-none md:justify-start md:gap-0 md:border-t md:border-rule md:py-3.5 lg:px-5">
        <Slug index="01" rule={false} className="md:hidden">
          Identity
        </Slug>

        <p className="text-[11.5px] leading-[1.5] text-ink-2">
          <span className="font-bold uppercase tracking-[0.03em] text-ink">
            {education.degreeShort}
          </span>
          <br className="hidden md:block" />
          <span className="md:hidden"> · </span>
          {education.institutionShort} · {education.period}
        </p>

        <p className="byline mt-3 hidden xl:block short:xl:hidden">
          {interests.slice(0, 3).join(' · ')}
        </p>

        <JumpLink className="mt-1 self-start md:mt-3" onClick={() => onOpen('about')} aria-haspopup="dialog">
          About Anshum
        </JumpLink>
      </div>
    </Panel>
  );
}
