import { useCallback, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export type OverlayProps = {
  open: boolean;
  onClose: () => void;
  /** Small uppercase metadata label, e.g. "02 / SELECTED WORK". */
  eyebrow: string;
  /** The accessible name and the visible display title. */
  title: string;
  /** Optional one-line standfirst under the title. */
  standfirst?: string;
  /** Rendered at the right of the header, left of the close button. */
  headerAside?: React.ReactNode;
  children: React.ReactNode;
  /** Widen for the project explorer, narrow for prose. */
  size?: 'prose' | 'wide';
};

/**
 * The single overlay primitive used by every panel.
 *
 * Behaviour:
 *  - occupies the viewport; its own body scrolls, the page never does
 *  - Escape closes; backdrop click closes
 *  - focus moves in on open and returns to the opener on close
 *  - Tab is trapped inside the dialog
 *  - `aria-modal` dialog with a labelled heading
 *  - entrance motion collapses to an instant swap under reduced motion
 */
export function Overlay({
  open,
  onClose,
  eyebrow,
  title,
  standfirst,
  headerAside,
  children,
  size = 'prose',
}: OverlayProps) {
  const reduced = usePrefersReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const titleId = useId();

  /* --- Remember the opener, and hand focus back on close ---------------- */
  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement as HTMLElement | null;
    return () => {
      const el = restoreTo.current;
      // Defer so the element is back in the tree and interactive.
      if (el && document.contains(el)) {
        window.requestAnimationFrame(() => el.focus({ preventScroll: true }));
      }
    };
  }, [open]);

  /* --- Move focus into the dialog --------------------------------------- */
  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const first = panel.querySelector<HTMLElement>('[data-autofocus]');
      (first ?? panel).focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  /* --- Escape to close, Tab trapped inside ------------------------------ */
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (items.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }

      const first = items[0]!;
      const last = items[items.length - 1]!;
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  /* --- Make the rest of the app inert to assistive tech ----------------- */
  useEffect(() => {
    if (!open) return;
    const shell = document.getElementById('app-shell');
    shell?.setAttribute('aria-hidden', 'true');
    return () => shell?.removeAttribute('aria-hidden');
  }, [open]);

  const motionProps = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.12 } }
    : {
        initial: { opacity: 0, y: 18, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 10, scale: 0.99 },
        transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] as const },
      };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-stretch justify-center p-0 sm:items-center sm:p-5 lg:p-7">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.12 : 0.26 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            {...motionProps}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            onKeyDown={onKeyDown}
            className={cn(
              'relative flex h-full w-full flex-col overflow-hidden bg-paper outline-none',
              'border-ink sm:border-[2.5px]',
              'shadow-[10px_10px_0_0_var(--color-acid)]',
              size === 'wide' ? 'sm:max-w-[1180px]' : 'sm:max-w-[920px]',
              'sm:h-full sm:max-h-full',
            )}
          >
            {/* Header */}
            <header className="flex shrink-0 items-start gap-4 border-b-[2.5px] border-ink px-5 py-4 sm:px-7 sm:py-5">
              <div className="min-w-0 flex-1">
                <p className="slug mb-2 font-semibold text-acid">{eyebrow}</p>
                <h2 id={titleId} className="headline text-[28px] text-ink sm:text-[38px]">
                  {title}
                </h2>
                {standfirst && (
                  <p className="mt-2.5 max-w-[66ch] text-[12.5px] leading-[1.55] text-ink-2 sm:text-[13.5px]">
                    {standfirst}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {headerAside}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={`Close ${title}`}
                  className={cn(
                    'group grid size-9 place-items-center border-[1.5px] border-ink',
                    'text-ink transition-colors duration-150',
                    'hover:bg-acid hover:border-acid hover:text-acid-ink',
                  )}
                >
                  <X size={15} strokeWidth={2.25} />
                </button>
              </div>
            </header>

            {/* Body */}
            <div className="scroll-region min-h-0 flex-1">{children}</div>

            {/* Footer hint */}
            <footer className="hidden shrink-0 items-center justify-between border-t-[1.5px] border-ink px-7 py-2.5 sm:flex">
              <span className="slug">Anshum Dev · {title}</span>
              <span className="slug">
                Press <kbd className="font-bold text-ink">Esc</kbd> to close
              </span>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
