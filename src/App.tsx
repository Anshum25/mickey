import { lazy, Suspense, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Masthead } from './components/Masthead';
import { Footer } from './components/Footer';
import { HeroPanel } from './components/panels/HeroPanel';
import { IdentityPanel } from './components/panels/IdentityPanel';
import { WorkPanel } from './components/panels/WorkPanel';
import { ExperiencePanel } from './components/panels/ExperiencePanel';
import { ExpertisePanel } from './components/panels/ExpertisePanel';
import { ContactPanel } from './components/panels/ContactPanel';
import { MobileIndex } from './components/panels/MobileIndex';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { useEdition } from './hooks/useEdition';
import type { OverlayKey } from './lib/overlays';
import { cn } from './lib/cn';

/* Overlays are not needed for first paint, so they ship in their own chunk. */
const AboutOverlay = lazy(() =>
  import('./components/overlays/AboutOverlay').then((m) => ({ default: m.AboutOverlay })),
);
const WorkOverlay = lazy(() =>
  import('./components/overlays/WorkOverlay').then((m) => ({ default: m.WorkOverlay })),
);
const ExperienceOverlay = lazy(() =>
  import('./components/overlays/ExperienceOverlay').then((m) => ({
    default: m.ExperienceOverlay,
  })),
);
const SkillsOverlay = lazy(() =>
  import('./components/overlays/SkillsOverlay').then((m) => ({ default: m.SkillsOverlay })),
);
const ContactOverlay = lazy(() =>
  import('./components/overlays/ContactOverlay').then((m) => ({ default: m.ContactOverlay })),
);

/* -------------------------------------------------------------------------- */
/*  Grid placement                                                            */
/*                                                                            */
/*  Rows are weighted rather than equal: the composition is asymmetric by      */
/*  design, and equal rows starve the panels that carry the most content.      */
/*                                                                            */
/*  Desktop — 12 columns x 3 weighted rows:                                   */
/*    hero 5c · identity 3c · experience 4c                                   */
/*    work 8c (two rows) · expertise 4c · contact 4c                          */
/*                                                                            */
/*  Tablet — 6 columns x 4 weighted rows, same hierarchy, reflowed, with      */
/*  contact as a full-width terminating bar.                                  */
/*                                                                            */
/*  Mobile — a flex column; the detail panels give way to the overlay index.  */
/* -------------------------------------------------------------------------- */

// `minmax(0, …)` rather than a bare `fr`: a bare `fr` row floors at its
// content's min-content height, so a dense panel would steal space from the
// hero instead of the row keeping the share the composition assigns it.
const ROWS = [
  'md:grid-rows-[minmax(0,1.58fr)_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.56fr)]',
  'lg:grid-rows-[minmax(0,1.18fr)_minmax(0,1fr)_minmax(0,0.44fr)]',
].join(' ');

const AREA = {
  hero: 'md:[grid-area:1/1/2/5] lg:[grid-area:1/1/2/6]',
  identity: 'md:[grid-area:1/5/2/7] lg:[grid-area:1/6/2/9]',
  experience: 'md:[grid-area:3/1/4/4] lg:[grid-area:1/9/2/13]',
  work: 'md:[grid-area:2/1/3/7] lg:[grid-area:2/1/4/9]',
  expertise: 'md:[grid-area:3/4/4/7] lg:[grid-area:2/9/3/13]',
  contact: 'md:[grid-area:4/1/5/7] lg:[grid-area:3/9/4/13]',
};

/** Entrance order: the eye should land on the hero first. */
const ORDER = { hero: 0, identity: 1, work: 2, experience: 3, expertise: 4, contact: 5 };

export default function App() {
  const [overlay, setOverlay] = useState<OverlayKey | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const { edition, toggle: toggleEdition } = useEdition();

  const open = useCallback((key: OverlayKey) => {
    setProjectId(null);
    setRoleId(null);
    setOverlay(key);
  }, []);

  const close = useCallback(() => setOverlay(null), []);

  const openProject = useCallback((id: string) => {
    setProjectId(id);
    setOverlay('work');
  }, []);

  const openRole = useCallback((id: string) => {
    setRoleId(id);
    setOverlay('experience');
  }, []);

  /** Staggered panel entrance, collapsed entirely under reduced motion. */
  const enter = (key: keyof typeof ORDER) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.62,
            delay: 0.06 + ORDER[key] * 0.07,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  const Cell = motion.div;

  return (
    <>
      {/* The whole composition is viewport-locked: this element never scrolls. */}
      <div id="app-shell" className="relative flex h-full flex-col overflow-hidden bg-paper">
        <Masthead
          active={overlay}
          onOpen={open}
          edition={edition}
          onToggleEdition={toggleEdition}
        />

        <main
          id="main"
          className={cn(
            'min-h-0 flex-1',
            // Mobile: a simple column. Tablet and up: the hairline grid.
            'flex flex-col',
            'md:press-grid md:grid md:grid-cols-6 lg:grid-cols-12',
            ROWS,
          )}
        >
          {/* --- Hero: always present ------------------------------------- */}
          <Cell {...enter('hero')} data-panel="hero" className={cn('flex min-h-0 flex-1 md:flex-none', AREA.hero)}>
            <HeroPanel onOpen={open} />
          </Cell>

          {/* --- Identity: a short band on mobile, a tall plate above md --- */}
          <Cell
            {...enter('identity')} data-panel="identity"
            className={cn(
              'flex h-[clamp(88px,15dvh,140px)] shrink-0 border-t-[2.5px] border-ink short:h-[clamp(70px,12dvh,104px)] md:h-auto md:border-t-0 md:short:h-auto',
              AREA.identity,
            )}
          >
            <IdentityPanel onOpen={open} />
          </Cell>

          {/* --- Mobile only: the overlay index ---------------------------- */}
          <div className="shrink-0 border-t-[2.5px] border-ink md:hidden">
            <MobileIndex onOpen={open} />
          </div>

          {/* --- Detail panels: md and up ---------------------------------- */}
          <Cell {...enter('work')} data-panel="work" className={cn('hidden md:flex', AREA.work)}>
            <WorkPanel onOpen={open} onOpenProject={openProject} />
          </Cell>

          <Cell {...enter('experience')} data-panel="experience" className={cn('hidden md:flex', AREA.experience)}>
            <ExperiencePanel onOpen={open} onOpenRole={openRole} />
          </Cell>

          <Cell {...enter('expertise')} data-panel="expertise" className={cn('hidden md:flex', AREA.expertise)}>
            <ExpertisePanel onOpen={open} />
          </Cell>

          <Cell {...enter('contact')} data-panel="contact" className={cn('hidden md:flex', AREA.contact)}>
            <ContactPanel onOpen={open} />
          </Cell>
        </main>

        <Footer />
      </div>

      {/* --- Overlay host ------------------------------------------------- */}
      <Suspense fallback={null}>
        {overlay === 'about' && <AboutOverlay open onClose={close} />}
        {overlay === 'work' && <WorkOverlay open onClose={close} initialProjectId={projectId} />}
        {overlay === 'experience' && (
          <ExperienceOverlay open onClose={close} initialRoleId={roleId} />
        )}
        {overlay === 'skills' && <SkillsOverlay open onClose={close} />}
        {overlay === 'contact' && <ContactOverlay open onClose={close} />}
      </Suspense>
    </>
  );
}
