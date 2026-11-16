import { Check, Copy } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

/* -------------------------------------------------------------------------- */
/*  Column                                                                    */
/* -------------------------------------------------------------------------- */

export function Panel({
  className,
  children,
  as: As = 'section',
  ...rest
}: React.ComponentProps<'section'> & { as?: 'section' | 'div' | 'aside' | 'nav' }) {
  const Tag = As as React.ElementType;
  return (
    <Tag
      className={cn(
        // `size-full` matters: each column is a flex child of its grid cell and
        // would otherwise be sized by its content, not by the cell.
        'relative flex size-full min-h-0 min-w-0 flex-col overflow-hidden bg-paper',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * The slug line that labels every section of the page, with a rule running
 * out to the column edge — the way a paper labels a standing column.
 */
export function Slug({
  index,
  children,
  rule = true,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  rule?: boolean;
  className?: string;
}) {
  return (
    <p className={cn('slug', rule && 'slug-rule', className)}>
      {/* The parts are spaced by this inline row, so an unruled slug reads
          "01 — IDENTITY" rather than running together. */}
      <span className="inline-flex min-w-0 items-center gap-1.5">
        {index && (
          <>
            <span className="font-semibold text-acid">{index}</span>
            <span className="text-ink-3">—</span>
          </>
        )}
        <span className="slug-ink truncate">{children}</span>
      </span>
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/*  Actions — set as stamped blocks, never as pills                           */
/* -------------------------------------------------------------------------- */

type ActionProps = {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
};

const actionBase =
  'group relative inline-flex shrink-0 items-center justify-center gap-1.5 ' +
  'font-sans font-bold uppercase tracking-[0.07em] whitespace-nowrap ' +
  'transition-[background-color,color,border-color,transform] duration-150 ease-out ' +
  'active:translate-x-px active:translate-y-px';

const actionSize = {
  sm: 'h-7 px-2.5 text-[10px]',
  md: 'h-9 px-3.5 text-[11.5px]',
};

const actionVariant = {
  // The second ink, used for exactly one action per view.
  solid: 'bg-acid text-acid-ink border-[1.5px] border-acid hover:bg-ink hover:border-ink hover:text-paper',
  outline: 'border-[1.5px] border-ink text-ink hover:bg-ink hover:text-paper',
  ghost: 'text-ink-2 hover:text-acid',
};

export function Action({
  variant = 'outline',
  size = 'md',
  children,
  className,
  ...rest
}: ActionProps & React.ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(actionBase, actionSize[size], actionVariant[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ActionLink({
  variant = 'outline',
  size = 'md',
  children,
  className,
  href,
  external,
  ...rest
}: ActionProps & { href: string; external?: boolean } & React.ComponentProps<'a'>) {
  return (
    <a
      href={href}
      className={cn(actionBase, actionSize[size], actionVariant[variant], className)}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

/**
 * "Continued →" — the jump line at the foot of a story. The acid rule wipes
 * in under it rather than the whole thing changing colour.
 */
export function JumpLink({
  children,
  className,
  ...rest
}: { children: React.ReactNode } & React.ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(
        'group inline-flex items-center gap-1 font-sans text-[10.5px] font-bold uppercase tracking-[0.1em]',
        'wipe text-ink-2 transition-colors duration-200 hover:bg-[length:100%_2px] hover:text-ink',
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
        →
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Technology lists — set as a mono byline, not as chips                     */
/* -------------------------------------------------------------------------- */

export function Byline({
  items,
  max,
  className,
}: {
  items: readonly string[];
  max?: number;
  className?: string;
}) {
  const shown = max ? items.slice(0, max) : items;
  const rest = max ? items.length - shown.length : 0;
  return (
    <p className={cn('byline', className)}>
      {shown.join(' · ')}
      {rest > 0 && <span className="text-acid"> +{rest}</span>}
    </p>
  );
}

/** A single boxed term. Used sparingly — the page is mostly unboxed. */
export function Term({
  children,
  accent,
  className,
}: {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center border px-1.5 py-[3px] font-mono text-[9.5px] leading-none tracking-[0.06em] uppercase',
        accent ? 'border-acid bg-acid-wash text-acid' : 'border-rule-soft text-ink-2',
        className,
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Status                                                                    */
/* -------------------------------------------------------------------------- */

export function StatusDot({ className }: { className?: string }) {
  return (
    <span
      className={cn('status-dot inline-block size-[6px] shrink-0 bg-acid', className)}
      aria-hidden="true"
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Copy-to-clipboard                                                         */
/* -------------------------------------------------------------------------- */

export function CopyButton({
  value,
  label = 'Copy email',
  size = 'md',
  className,
}: {
  value: string;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const { copy, status } = useCopyToClipboard();
  const copied = status === 'copied';
  const failed = status === 'error';

  return (
    <>
      <Action
        variant={copied ? 'solid' : 'outline'}
        size={size}
        onClick={() => void copy(value)}
        aria-label={label}
        className={className}
      >
        {copied ? <Check size={12} strokeWidth={2.5} /> : <Copy size={12} strokeWidth={2} />}
        <span>{copied ? 'Copied' : failed ? 'Failed' : 'Copy'}</span>
      </Action>
      {/* Announce the result without moving focus. */}
      <span aria-live="polite" className="sr-only">
        {copied ? `${value} copied to clipboard` : failed ? 'Copy failed' : ''}
      </span>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Overlay body helpers                                                      */
/* -------------------------------------------------------------------------- */

export function Section({
  label,
  index,
  children,
  className,
}: {
  label: string;
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('border-b border-rule px-5 py-7 last:border-b-0 sm:px-7', className)}>
      <Slug index={index} className="mb-5">
        {label}
      </Slug>
      {children}
    </section>
  );
}
