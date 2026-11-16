import { education, experience } from '../../content/portfolio';
import type { OverlayKey } from '../../lib/overlays';
import { JumpLink, Panel, Slug, StatusDot } from '../ui/Primitives';

/** The listings column: dated entries, ruled, in reverse order. */
export function ExperiencePanel({
  onOpen,
  onOpenRole,
}: {
  onOpen: (key: OverlayKey) => void;
  onOpenRole: (id: string) => void;
}) {
  return (
    <Panel>
      <div className="flex shrink-0 items-center gap-4 px-4 pt-4 lg:px-5 lg:pt-5">
        <Slug index="03" className="min-w-0 flex-1">
          Experience
        </Slug>
        <JumpLink onClick={() => onOpen('experience')} aria-haspopup="dialog">
          Detail
        </JumpLink>
      </div>

      <ol className="mt-3 flex min-h-0 flex-1 flex-col px-4 lg:px-5">
        {experience.map((role) => (
          <li key={role.id} className="shrink-0 border-t border-rule-soft first:border-t-0">
            <button
              type="button"
              onClick={() => onOpenRole(role.id)}
              aria-haspopup="dialog"
              aria-label={`${role.role} at ${role.company} — view detail`}
              className="group block w-full py-3 text-left"
            >
              <div className="flex items-center gap-2">
                {role.current ? (
                  <StatusDot />
                ) : (
                  <span aria-hidden className="size-[6px] shrink-0 border border-ink-3" />
                )}
                <span className="slug slug-ink">{role.period}</span>
              </div>

              <h3 className="deck mt-1.5 truncate text-[14.5px] text-ink transition-colors duration-150 group-hover:text-acid lg:text-[16px]">
                {role.role}
              </h3>

              <p className="mt-0.5 truncate text-[11.5px] font-medium text-ink-2">{role.company}</p>

              {/* Two nested elements rather than one with stacked display
                  variants: `hidden`, `xl:block` and `short:hidden` are the same
                  utility group and resolve by source order. */}
              <div className="hidden xl:block">
                <p className="clamp-2 mt-1.5 text-[11px] leading-[1.45] text-ink-3 short:hidden">
                  {role.summary}
                </p>
              </div>
            </button>
          </li>
        ))}

        {/* The origin of the record, set at the foot of the column. */}
        <li className="mt-auto hidden shrink-0 lg:block">
          <div className="border-t-[1.5px] border-ink py-3 short:hidden">
            <Slug rule={false} className="mb-1.5">
              Education
            </Slug>
            <p className="truncate text-[11.5px] text-ink-2">
              <span className="font-bold uppercase tracking-[0.03em] text-ink">
                {education.degreeShort}
              </span>{' '}
              · {education.institutionShort} · {education.period}
            </p>
          </div>
        </li>
      </ol>
    </Panel>
  );
}
