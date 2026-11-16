import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { expertise } from '../../content/portfolio';
import type { OverlayKey } from '../../lib/overlays';
import { JumpLink, Panel, Slug } from '../ui/Primitives';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../lib/cn';

/**
 * The index column: a contents list of the five areas, with the selected one
 * setting its terms underneath. A ruled list, not a wall of badges.
 */
export function ExpertisePanel({ onOpen }: { onOpen: (key: OverlayKey) => void }) {
  const [activeId, setActiveId] = useState(expertise[0]!.id);
  const reduced = usePrefersReducedMotion();
  const active = expertise.find((g) => g.id === activeId) ?? expertise[0]!;
  const total = expertise.reduce((n, g) => n + g.primary.length + g.extended.length, 0);

  return (
    <Panel>
      <div className="flex shrink-0 items-center gap-4 px-4 pt-4 lg:px-5 lg:pt-5">
        <Slug index="04" className="min-w-0 flex-1">
          Technical expertise
        </Slug>
        <JumpLink onClick={() => onOpen('skills')} aria-haspopup="dialog">
          Full index
        </JumpLink>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-3 short:pb-2.5 short:pt-2 lg:px-5">
        {/* --- Contents list ------------------------------------------------ */}
        <div
          role="tablist"
          aria-label="Skill categories"
          aria-orientation="vertical"
          className="shrink-0"
        >
          {expertise.map((g) => {
            const selected = g.id === active.id;
            return (
              <button
                key={g.id}
                type="button"
                role="tab"
                id={`exp-tab-${g.id}`}
                aria-selected={selected}
                aria-controls={`exp-panel-${g.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(g.id)}
                onMouseEnter={() => setActiveId(g.id)}
                onFocus={() => setActiveId(g.id)}
                onKeyDown={(e) => {
                  const dir =
                    e.key === 'ArrowDown' || e.key === 'ArrowRight'
                      ? 1
                      : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
                        ? -1
                        : 0;
                  if (!dir) return;
                  e.preventDefault();
                  const i = expertise.findIndex((x) => x.id === active.id);
                  const next = expertise[(i + dir + expertise.length) % expertise.length]!;
                  setActiveId(next.id);
                  document.getElementById(`exp-tab-${next.id}`)?.focus();
                }}
                className={cn(
                  'flex w-full items-baseline gap-2 border-t border-rule-soft py-[5px] first:border-t-0 max-lg:py-[3px] short:py-[2px]',
                  'font-sans text-[11.5px] font-bold uppercase tracking-[0.06em] transition-colors duration-150',
                  selected ? 'text-acid' : 'text-ink-2 hover:text-ink',
                )}
              >
                <span className="font-mono text-[9.5px] font-medium tracking-[0.12em] opacity-70">
                  {g.index}
                </span>
                <span className="truncate">{g.label}</span>
                <span
                  aria-hidden
                  className={cn(
                    'ml-auto shrink-0 transition-all duration-200',
                    selected ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0',
                  )}
                >
                  ▸
                </span>
              </button>
            );
          })}
        </div>

        {/* --- Terms for the selected area ----------------------------------- */}
        <div className="mt-2.5 min-h-[32px] flex-1 overflow-hidden border-t-[1.5px] border-ink pt-2.5 short:mt-1.5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              id={`exp-panel-${active.id}`}
              role="tabpanel"
              aria-labelledby={`exp-tab-${active.id}`}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -3 }}
              transition={{ duration: reduced ? 0.1 : 0.18, ease: 'easeOut' }}
            >
              <p className="text-[11.5px] font-semibold leading-[1.55] text-ink">
                {active.primary.join(' · ')}
              </p>
              {/* Secondary terms are the first thing to give way on a short
                  viewport; the full index lives in the overlay. */}
              <p className="byline mt-1.5 max-lg:hidden short:hidden">
                {active.extended.join(' · ')}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Standing figures ----------------------------------------------- */}
        <div className="hidden shrink-0 lg:block">
          <dl className="flex items-baseline justify-between gap-3 border-t border-rule-soft pt-2 short:hidden">
          <div className="flex min-w-0 items-baseline gap-1.5">
            <dd className="nameplate text-[14px] text-ink">
              {String(active.primary.length + active.extended.length).padStart(2, '0')}
            </dd>
            <dt className="slug truncate">in {active.label}</dt>
          </div>
          <div className="flex shrink-0 items-baseline gap-1.5">
            <dd className="nameplate text-[14px] text-ink">{total}</dd>
            <dt className="slug">total</dt>
            </div>
          </dl>
        </div>
      </div>
    </Panel>
  );
}
