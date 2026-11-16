import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { profile, resume } from '../content/portfolio';
import { NAV, type OverlayKey } from '../lib/overlays';
import { Action, ActionLink, StatusDot } from './ui/Primitives';
import type { Edition } from '../hooks/useEdition';
import { cn } from '../lib/cn';

const EDITION_NO = String(new Date().getFullYear() - 2023).padStart(2, '0');

/**
 * The nameplate. Flanked by the standing metadata a masthead carries —
 * edition, place, date — and closed by a double rule.
 */
export function Masthead({
  active,
  onOpen,
  edition,
  onToggleEdition,
}: {
  active: OverlayKey | null;
  onOpen: (key: OverlayKey) => void;
  edition: Edition;
  onToggleEdition: () => void;
}) {
  const [hovered, setHovered] = useState<OverlayKey | null>(null);
  const marker = hovered ?? active;

  return (
    <header className="relative z-20 shrink-0 border-b-[2.5px] border-ink bg-paper">
      <div className="flex h-12 items-center gap-3 px-3 sm:h-[58px] sm:gap-5 sm:px-5">
        {/* --- Left standing matter ---------------------------------------- */}
        <div className="hidden w-[186px] shrink-0 flex-col gap-[3px] whitespace-nowrap xl:flex">
          <span className="slug">Vol. {EDITION_NO} · No. 01</span>
          <span className="slug slug-ink">{profile.locationShort} · IST</span>
        </div>

        {/* --- Nameplate ----------------------------------------------------- */}
        <a href="/" className="group shrink-0" aria-label={`${profile.name} — home`}>
          <span className="nameplate text-[21px] sm:text-[26px]">
            {profile.wordmark}
            <span className="text-acid">.</span>
          </span>
        </a>

        {/* --- Availability, mobile ------------------------------------------- */}
        <span className="slug mx-auto flex min-w-0 items-center gap-1.5 lg:hidden">
          <StatusDot />
          <span className="truncate text-ink-2">Available</span>
        </span>

        {/* --- Section index --------------------------------------------------- */}
        <nav
          aria-label="Sections"
          className="mx-auto hidden items-center lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV.map((item) => {
            const isMarked = marker === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onOpen(item.key)}
                onMouseEnter={() => setHovered(item.key)}
                onFocus={() => setHovered(item.key)}
                onBlur={() => setHovered(null)}
                aria-haspopup="dialog"
                aria-expanded={active === item.key}
                className={cn(
                  'relative px-3 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.1em]',
                  'transition-colors duration-150',
                  active === item.key
                    ? 'text-acid-ink'
                    : isMarked
                      ? 'text-acid-ink'
                      : 'text-ink-2 hover:text-ink',
                )}
              >
                {/* One inked block travels between the sections. */}
                {isMarked && (
                  <motion.span
                    layoutId="nav-marker"
                    className="absolute inset-0 -z-10 bg-acid"
                    transition={{ type: 'spring', stiffness: 520, damping: 38, mass: 0.6 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* --- Right standing matter -------------------------------------------- */}
        <div className="flex shrink-0 items-center gap-2">
          <span className="slug hidden items-center gap-1.5 lg:flex">
            <StatusDot />
            <span className="text-ink-2">{profile.availability}</span>
          </span>

          <button
            type="button"
            onClick={onToggleEdition}
            aria-pressed={edition === 'night'}
            aria-label={
              edition === 'night' ? 'Switch to the day edition' : 'Switch to the night edition'
            }
            title={edition === 'night' ? 'Day edition' : 'Night edition'}
            className={cn(
              'grid size-7 shrink-0 place-items-center border-[1.5px] border-ink text-ink',
              'transition-colors duration-150 hover:bg-ink hover:text-paper',
            )}
          >
            {edition === 'night' ? (
              <Sun size={13} strokeWidth={2} />
            ) : (
              <Moon size={13} strokeWidth={2} />
            )}
          </button>

          {/* The breakpoint lives on the wrapper: `hidden` and the button's own
              display utility are the same group and would collide. */}
          <div className="hidden sm:block">
            {resume.available ? (
              <ActionLink href={resume.url} download={resume.filename} variant="outline" size="sm">
                Résumé
              </ActionLink>
            ) : (
              <Action
                variant="outline"
                size="sm"
                onClick={() => onOpen('contact')}
                aria-haspopup="dialog"
                title="No résumé file is published yet — request it by email"
              >
                Résumé
              </Action>
            )}
          </div>

          <ActionLink href={`mailto:${profile.email}`} variant="solid" size="sm">
            <span className="hidden sm:inline">Contact</span>
            <span className="sm:hidden">Email</span>
          </ActionLink>
        </div>
      </div>

      {/* The thin second line of the double rule. */}
      <span aria-hidden className="absolute -bottom-[5px] left-0 h-px w-full bg-ink" />
    </header>
  );
}
