import { useEffect, useRef } from 'react';
import { education, experience, type Role } from '../../content/portfolio';
import { Overlay } from './Overlay';
import { Slug, StatusDot, Term } from '../ui/Primitives';
import { cn } from '../../lib/cn';

export function ExperienceOverlay({
  open,
  onClose,
  initialRoleId,
}: {
  open: boolean;
  onClose: () => void;
  initialRoleId?: string | null;
}) {
  const scroller = useRef<HTMLDivElement>(null);

  // If opened from a specific timeline node, bring that entry into view.
  useEffect(() => {
    if (!open || !initialRoleId) return;
    const id = window.requestAnimationFrame(() => {
      document
        .getElementById(`role-${initialRoleId}`)
        ?.scrollIntoView({ block: 'start', behavior: 'auto' });
    });
    return () => window.cancelAnimationFrame(id);
  }, [open, initialRoleId]);

  return (
    <Overlay
      open={open}
      onClose={onClose}
      eyebrow="03 — Experience"
      title="Professional experience"
      standfirst={`${experience.length} roles across enterprise AI engineering and full-stack product work.`}
    >
      <div ref={scroller}>
        {experience.map((role, i) => (
          <RoleEntry key={role.id} role={role} position={i} />
        ))}

        {/* --- Education ---------------------------------------------------- */}
        <section className="bg-paper-2 px-5 py-7 sm:px-7">
          <Slug index="ED" className="mb-5">
            Education
          </Slug>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="deck text-[16px] text-ink">
                {education.degree}
              </h3>
              <p className="mt-1.5 text-[12.5px] text-ink-2">{education.institution}</p>
              <p className="mt-0.5 text-[12px] text-ink-3">{education.location}</p>
            </div>
            <span className="tag">{education.period}</span>
          </div>
        </section>
      </div>
    </Overlay>
  );
}

function RoleEntry({ role, position }: { role: Role; position: number }) {
  return (
    <article
      id={`role-${role.id}`}
      className="scroll-mt-0 border-b border-rule px-5 py-7 sm:px-7"
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[180px_1fr] lg:gap-8">
        {/* --- Period rail -------------------------------------------------- */}
        <div className="lg:text-right">
          <span className="slug">{String(position + 1).padStart(2, '0')}</span>
          <p className="mt-2 font-mono text-[11.5px] leading-[1.5] text-ink-2">{role.start}</p>
          <p className="font-mono text-[11.5px] leading-[1.5] text-ink-3">— {role.end}</p>
          {role.current && (
            <span
              className={cn(
                'mt-3 inline-flex items-center gap-1.5 rounded-[3px] border border-acid',
                'bg-acid-wash px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-acid',
              )}
            >
              <StatusDot />
              Current
            </span>
          )}
        </div>

        {/* --- Detail -------------------------------------------------------- */}
        <div className="min-w-0 lg:border-l lg:border-rule lg:pl-8">
          <h3 className="deck text-[19px] text-ink sm:text-[22px]">
            {role.role}
          </h3>
          <p className="mt-1.5 text-[13px] font-bold uppercase tracking-[0.04em] text-acid">{role.company}</p>
          <p className="mt-0.5 text-[11.5px] text-ink-3">{role.location}</p>

          <p className="mt-4 max-w-[64ch] text-pretty text-[12.5px] leading-[1.65] text-ink-2">
            {role.summary}
          </p>

          <ul className="mt-5 space-y-2.5">
            {role.responsibilities.map((r) => (
              <li key={r} className="flex gap-2.5 text-[12.5px] leading-[1.55] text-ink-2">
                <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-acid" />
                <span className="text-pretty">{r}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-1.5 border-t border-rule pt-4">
            {role.stack.map((t) => (
              <Term key={t}>{t}</Term>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
