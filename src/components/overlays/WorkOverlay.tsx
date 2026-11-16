import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { projects, type Project } from '../../content/portfolio';
import { Overlay } from './Overlay';
import { Slug, Term } from '../ui/Primitives';
import { ProjectGlyph } from '../visual/ProjectGlyph';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../lib/cn';

/**
 * Project explorer. A list rail plus a case-study reader on wide viewports;
 * below `lg` the same two views stack and the reader gets a back control.
 */
export function WorkOverlay({
  open,
  onClose,
  initialProjectId,
}: {
  open: boolean;
  onClose: () => void;
  initialProjectId?: string | null;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(initialProjectId ?? null);
  const reduced = usePrefersReducedMotion();

  // Re-seed whenever the overlay is opened from a specific card.
  useEffect(() => {
    if (open) setSelectedId(initialProjectId ?? projects[0]!.id);
  }, [open, initialProjectId]);

  const selected = useMemo(
    () => projects.find((p) => p.id === selectedId) ?? projects[0]!,
    [selectedId],
  );

  // On narrow viewports, show either the list or the reader — never both.
  const [narrowView, setNarrowView] = useState<'list' | 'detail'>('detail');
  useEffect(() => {
    if (open) setNarrowView(initialProjectId ? 'detail' : 'list');
  }, [open, initialProjectId]);

  return (
    <Overlay
      open={open}
      onClose={onClose}
      eyebrow="02 — Selected work"
      title="Project explorer"
      standfirst={`${projects.length} systems across applied AI, backend engineering, and enterprise software.`}
      size="wide"
    >
      <div className="grid h-full grid-cols-1 lg:grid-cols-[300px_1fr]">
        {/* --- List rail ---------------------------------------------------- */}
        <nav
          aria-label="Projects"
          className={cn(
            'scroll-region border-rule lg:block lg:border-r',
            narrowView === 'list' ? 'block' : 'hidden',
          )}
        >
          <ul>
            {projects.map((p) => {
              const active = p.id === selected.id;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    aria-current={active ? 'true' : undefined}
                    onClick={() => {
                      setSelectedId(p.id);
                      setNarrowView('detail');
                    }}
                    className={cn(
                      'group relative flex w-full items-start gap-3 border-b border-rule px-5 py-3.5 text-left',
                      'transition-colors duration-200',
                      active ? 'bg-paper-2' : 'hover:bg-paper-2/60',
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-y-0 left-0 w-px bg-acid transition-opacity duration-200',
                        active ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    <span className="slug mt-0.5 w-5 shrink-0">{p.index}</span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          'deck block text-[13px] leading-snug',
                          active ? 'text-acid' : 'text-ink group-hover:text-ink',
                        )}
                      >
                        {p.shortTitle}
                      </span>
                      <span className="slug mt-1 block">{p.category}</span>
                    </span>
                    {p.featured && (
                      <span
                        aria-label="Featured"
                        title="Featured"
                        className="mt-1 size-1 shrink-0 rounded-full bg-acid"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* --- Case study --------------------------------------------------- */}
        <div
          className={cn(
            'scroll-region min-w-0',
            narrowView === 'detail' ? 'block' : 'hidden lg:block',
          )}
        >
          <button
            type="button"
            onClick={() => setNarrowView('list')}
            className="slug flex items-center gap-1.5 border-b border-rule px-5 py-3 transition-colors hover:text-acid lg:hidden"
          >
            <ArrowLeft size={11} strokeWidth={2} />
            All projects
          </button>

          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={selected.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: reduced ? 0.1 : 0.24, ease: 'easeOut' }}
            >
              <CaseStudy project={selected} />
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </Overlay>
  );
}

function CaseStudy({ project }: { project: Project }) {
  return (
    <>
      {/* --- Plate -------------------------------------------------------- */}
      <header className="border-b border-rule px-5 py-6 sm:px-7">
        <div className="flex items-baseline justify-between gap-4">
          <Slug index={project.index}>{project.domain}</Slug>
          <span className="slug">{project.category}</span>
        </div>

        <h3 className="headline mt-3 text-balance text-[26px] text-ink sm:text-[34px]">
          {project.title}
        </h3>
        <p className="mt-3 max-w-[64ch] text-pretty text-[13px] leading-[1.62] text-ink-2">
          {project.tagline}
        </p>

        <div className="blueprint mt-5 h-[88px] w-full border border-rule bg-paper-2/40 p-4 sm:h-[104px]">
          <ProjectGlyph kind={project.glyph} className="text-ink-2" />
        </div>
      </header>

      {/* --- Problem / approach -------------------------------------------- */}
      {(project.problem || project.approach) && (
        <div className="grid grid-cols-1 border-b border-rule sm:grid-cols-2">
          {project.problem && (
            <div className="border-rule px-5 py-6 sm:border-r sm:px-7">
              <Slug className="mb-3">The problem</Slug>
              <p className="text-pretty text-[12.5px] leading-[1.68] text-ink-2">
                {project.problem}
              </p>
            </div>
          )}
          {project.approach && (
            <div className="border-t border-rule px-5 py-6 sm:border-t-0 sm:px-7">
              <Slug className="mb-3">The approach</Slug>
              <p className="text-pretty text-[12.5px] leading-[1.68] text-ink-2">
                {project.approach}
              </p>
            </div>
          )}
        </div>
      )}

      {/* --- What it does --------------------------------------------------- */}
      <section className="border-b border-rule px-5 py-6 sm:px-7">
        <Slug className="mb-4">What it does</Slug>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-[12.5px] leading-[1.5] text-ink-2">
              <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-acid" />
              <span className="text-pretty">{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* --- Stack ---------------------------------------------------------- */}
      <section className="border-b border-rule px-5 py-6 last:border-b-0 sm:px-7">
        <Slug className="mb-4">Stack</Slug>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <Term key={t}>{t}</Term>
          ))}
        </div>
      </section>

      {/* --- Source --------------------------------------------------------- */}
      {project.links && project.links.length > 0 && (
        <section className="px-5 py-6 sm:px-7">
          <Slug className="mb-4">Source</Slug>
          <ul className="flex flex-col gap-px bg-rule-soft">
            {project.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center justify-between gap-3 bg-paper px-3 py-2.5 transition-colors duration-200 hover:bg-paper-2"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Github size={13} strokeWidth={1.75} className="shrink-0 text-ink-3" />
                    <span className="truncate font-mono text-[11.5px] text-ink-2 transition-colors group-hover:text-acid">
                      {l.label}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.75}
                    className="shrink-0 text-ink-3 transition-all duration-200 group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-acid"
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
