import { facts, profile, resume } from '../../content/portfolio';
import type { OverlayKey } from '../../lib/overlays';
import { Action, ActionLink, Panel, Slug } from '../ui/Primitives';

/**
 * The lead story.
 *
 * Every vertical measure is tied to `dvh` rather than fixed px: the column has
 * a fixed share of the viewport, so its contents give way as the viewport
 * shortens instead of overrunning the actions below them.
 */
export function HeroPanel({ onOpen }: { onOpen: (key: OverlayKey) => void }) {
  return (
    <Panel className="justify-between px-4 py-[clamp(11px,2dvh,24px)] very-short:py-1.5 sm:px-6 lg:px-7">
      {/* --- Kicker -------------------------------------------------------- */}
      <div className="flex shrink-0 items-start justify-between gap-4">
        <Slug index="00" className="min-w-0 flex-1">
          {profile.role}
        </Slug>
      </div>

      {/* --- Headline ------------------------------------------------------ */}
      <div className="flex min-h-0 flex-col justify-center overflow-hidden py-[clamp(4px,1.1dvh,15px)] very-short:py-0.5">
        <h1 className="headline text-ink [font-size:clamp(2.5rem,11.4vw,4.4rem)] md:[font-size:clamp(2rem,min(6vw,5.8dvh),4.4rem)] lg:[font-size:clamp(2.1rem,min(5vw,5.9dvh),5.4rem)]">
          <span className="block">{profile.headline[0]}</span>
          {/* The second voice: a serif italic cut into all that condensed sans. */}
          <span className="editorial block text-acid [font-size:1.14em] [line-height:0.88]">
            {profile.headline[1]}
          </span>
          <span className="block">{profile.headline[2]}</span>
        </h1>

        {/* The deck, opened by a bold lead-in the way a standfirst is set. */}
        <div className="mt-[clamp(10px,1.8dvh,20px)] max-w-[64ch] border-t-[1.5px] border-ink pt-[clamp(8px,1.4dvh,14px)] very-short:mt-2 very-short:pt-1.5">
          <p className="clamp-3 text-pretty text-[13px] leading-[1.5] text-ink-2 sm:text-[13.5px]">
            <span className="font-bold uppercase tracking-[0.04em] text-ink">
              {profile.identity}
            </span>{' '}
            {profile.description}
          </p>
        </div>
      </div>

      {/* --- Actions + standing figures ------------------------------------ */}
      <div className="flex shrink-0 flex-col gap-[clamp(9px,1.5dvh,15px)]">
        <div className="flex flex-wrap items-center gap-2">
          <Action variant="solid" onClick={() => onOpen('work')} aria-haspopup="dialog">
            View selected work →
          </Action>

          {resume.available ? (
            <ActionLink href={resume.url} download={resume.filename} variant="outline">
              Download résumé
            </ActionLink>
          ) : (
            <ActionLink
              href={`mailto:${profile.email}?subject=R%C3%A9sum%C3%A9%20request`}
              variant="outline"
            >
              Request résumé
            </ActionLink>
          )}
        </div>

        {/* Standing figures, set as a dateline. Nothing here is a performance
            claim — and it is the first furniture to go on a short viewport. */}
        <div className="hidden lg:block">
          <dl className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t-[1.5px] border-ink pt-[clamp(7px,1.2dvh,12px)] short:hidden">
          {facts.map((f, i) => (
            <div key={f.label} className="flex items-baseline gap-1.5">
              {i > 0 && (
                <span aria-hidden className="mr-1.5 text-ink-3">
                  ·
                </span>
              )}
              <dd className="nameplate text-[15px] leading-none text-ink">{f.value}</dd>
              <dt className="slug">{f.label}</dt>
            </div>
            ))}
          </dl>
        </div>
      </div>
    </Panel>
  );
}
