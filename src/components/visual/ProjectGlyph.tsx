import type { GlyphKind } from '../../content/portfolio';
import { cn } from '../../lib/cn';

/**
 * Technical illustrations, one per project archetype.
 *
 * These are schematics of each system rather than screenshots: they stay
 * crisp at any size, cost nothing to load, never shift layout, and say
 * something true about the architecture. Strokes use `currentColor` so a card
 * can tint its own glyph on hover.
 */

const S = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

function Retrieval() {
  // Documents → embedding → vector space → answer.
  return (
    <>
      {/* document stack */}
      <g opacity="0.95">
        <rect x="4" y="12" width="14" height="18" rx="1.5" strokeWidth="1" {...S} />
        <rect x="7" y="9" width="14" height="18" rx="1.5" strokeWidth="1" opacity="0.55" {...S} />
        <path d="M10 15h8M10 18.5h8M10 22h5" strokeWidth="1" opacity="0.5" {...S} />
      </g>
      {/* pipe */}
      <path d="M22 19h9" strokeWidth="1" strokeDasharray="2 2.5" {...S} />
      {/* vector field */}
      <g>
        <circle cx="42" cy="12" r="1.7" strokeWidth="1" {...S} />
        <circle cx="52" cy="17" r="1.7" strokeWidth="1" {...S} />
        <circle cx="39" cy="25" r="1.7" strokeWidth="1" {...S} />
        <circle cx="50" cy="29" r="1.7" strokeWidth="1" {...S} />
        <circle cx="46" cy="19.5" r="2.6" strokeWidth="1.4" className="text-acid" {...S} />
        <path
          d="M43.6 18.3 40.4 13.4M48.6 18.6 50.6 17.6M43.9 21.5 40.6 23.9M48.3 21.3 49.2 27"
          strokeWidth="0.85"
          opacity="0.5"
          {...S}
        />
      </g>
      {/* pipe out */}
      <path d="M57 19h7" strokeWidth="1" strokeDasharray="2 2.5" {...S} />
      {/* answer */}
      <rect x="66" y="12" width="14" height="15" rx="1.5" strokeWidth="1" className="text-acid" {...S} />
      <path d="M69 17h8M69 21h5" strokeWidth="1" opacity="0.6" className="text-acid" {...S} />
    </>
  );
}

function Engine() {
  // Board grid → evaluation bar → language.
  return (
    <>
      <g strokeWidth="1" {...S}>
        <rect x="5" y="7" width="24" height="24" rx="1.5" />
        <path d="M5 13h24M5 19h24M5 25h24M11 7v24M17 7v24M23 7v24" opacity="0.28" />
        <rect x="11" y="13" width="6" height="6" className="text-acid" opacity="0.9" />
      </g>
      {/* eval bar */}
      <g strokeWidth="1" {...S}>
        <rect x="35" y="7" width="5" height="24" rx="1" opacity="0.6" />
      </g>
      <rect x="35" y="7" width="5" height="9" rx="1" className="fill-current text-acid" opacity="0.65" stroke="none" />
      {/* language lines */}
      <path d="M47 11h33M47 16h28M47 21h33M47 26h20" strokeWidth="1" opacity="0.45" {...S} />
      <circle cx="43.5" cy="19" r="0" />
    </>
  );
}

function Document() {
  // Scan → structured fields → draft awaiting confirmation.
  return (
    <>
      <g strokeWidth="1" {...S}>
        <rect x="5" y="8" width="18" height="23" rx="1.5" />
        <path d="M9 13h10M9 17h10M9 21h6" opacity="0.45" />
        {/* scan line */}
        <path d="M3 24.5h22" className="text-acid" strokeWidth="1.3" />
      </g>
      <path d="M27 19.5h8" strokeWidth="1" strokeDasharray="2 2.5" {...S} />
      {/* key/value rows */}
      <g strokeWidth="1" {...S}>
        <rect x="39" y="9" width="24" height="6" rx="1" opacity="0.6" />
        <rect x="39" y="17" width="24" height="6" rx="1" opacity="0.6" />
        <rect x="39" y="25" width="24" height="6" rx="1" opacity="0.6" />
        <path d="M47 9v6M47 17v6M47 25v6" opacity="0.35" />
      </g>
      <path d="M67 19.5h5" strokeWidth="1" strokeDasharray="2 2.5" {...S} />
      {/* confirmation check */}
      <g className="text-acid" strokeWidth="1.3" {...S}>
        <rect x="74" y="13" width="13" height="13" rx="1.5" />
        <path d="M77.5 19.5l2.6 2.6 5-5.6" />
      </g>
    </>
  );
}

function Ledger() {
  // Assessment rows → score → tracked action.
  return (
    <>
      <g strokeWidth="1" {...S}>
        <rect x="5" y="7" width="38" height="25" rx="1.5" />
        <path d="M5 13.5h38" opacity="0.5" />
        <path d="M5 20h38M5 26h38" opacity="0.25" />
        <path d="M31 7v25" opacity="0.3" />
      </g>
      {/* score marks */}
      <g className="text-acid" strokeWidth="1.3" {...S}>
        <path d="M34 16.5h6M34 23h3.5M34 29h5" />
      </g>
      {/* gap bars */}
      <g strokeWidth="1" {...S}>
        <path d="M51 31V18" opacity="0.45" />
        <path d="M58 31v-9" opacity="0.45" />
        <path d="M65 31V12" className="text-acid" strokeWidth="1.4" />
        <path d="M72 31v-14" opacity="0.45" />
        <path d="M79 31v-6" opacity="0.45" />
        <path d="M47 31h36" opacity="0.4" />
      </g>
    </>
  );
}

function Factory() {
  // Routing → quality gate → stock.
  return (
    <>
      <g strokeWidth="1" {...S}>
        <rect x="4" y="11" width="13" height="13" rx="1.5" />
        <path d="M17 17.5h7" strokeDasharray="2 2" />
        <rect x="24" y="11" width="13" height="13" rx="1.5" />
        <path d="M37 17.5h7" strokeDasharray="2 2" />
      </g>
      {/* quality gate */}
      <g className="text-acid" strokeWidth="1.3" {...S}>
        <path d="M51 9.5 58.5 14v9L51 27.5 43.5 23v-9L51 9.5Z" />
        <path d="M48 17.8l2.2 2.2 4-4.4" />
      </g>
      <path d="M59 17.5h6" strokeWidth="1" strokeDasharray="2 2" {...S} />
      {/* stock bins */}
      <g strokeWidth="1" {...S}>
        <rect x="66" y="8" width="8" height="8" rx="1" opacity="0.7" />
        <rect x="76" y="8" width="8" height="8" rx="1" opacity="0.4" />
        <rect x="66" y="19" width="8" height="8" rx="1" opacity="0.4" />
        <rect x="76" y="19" width="8" height="8" rx="1" opacity="0.7" />
      </g>
    </>
  );
}

function Forecast() {
  // Risk curve → SHAP contributions.
  return (
    <>
      <g strokeWidth="1" {...S}>
        <path d="M5 31V6" opacity="0.4" />
        <path d="M5 31h36" opacity="0.4" />
        <path d="M7 27c5 0 7-3.5 10-9s6-9 11-9 8 5 11 9" className="text-acid" strokeWidth="1.4" />
        <circle cx="31" cy="11.5" r="2" className="text-acid" strokeWidth="1.3" />
      </g>
      {/* SHAP: contributions either side of a baseline */}
      <g strokeWidth="1" {...S}>
        <path d="M63 7v26" opacity="0.4" strokeDasharray="2 2" />
        <path d="M63 11h14" className="text-acid" strokeWidth="2.4" />
        <path d="M63 17h-9" strokeWidth="2.4" opacity="0.4" />
        <path d="M63 23h8" className="text-acid" strokeWidth="2.4" opacity="0.65" />
        <path d="M63 29h-14" strokeWidth="2.4" opacity="0.4" />
      </g>
    </>
  );
}

function Surface() {
  // Component tree → rendered layout.
  return (
    <>
      <g strokeWidth="1" {...S}>
        <rect x="5" y="16" width="7" height="7" rx="1" opacity="0.5" />
        <path d="M12 19.5h6" opacity="0.4" />
        <rect x="18" y="8" width="7" height="7" rx="1" opacity="0.7" />
        <rect x="18" y="16" width="7" height="7" rx="1" className="text-acid" />
        <rect x="18" y="24" width="7" height="7" rx="1" opacity="0.7" />
        <path d="M15.5 19.5v-8h2.5M15.5 19.5v8h2.5" opacity="0.35" />
      </g>
      <path d="M30 19.5h6" strokeWidth="1" strokeDasharray="2 2" {...S} />
      {/* viewport */}
      <g strokeWidth="1" {...S}>
        <rect x="41" y="7" width="43" height="25" rx="1.5" />
        <path d="M41 13h43" opacity="0.5" />
        <rect x="45" y="17" width="16" height="11" rx="1" className="text-acid" opacity="0.8" />
        <path d="M65 18h15M65 22h12M65 26h15" opacity="0.35" />
      </g>
    </>
  );
}

const GLYPHS: Record<GlyphKind, () => React.ReactElement> = {
  retrieval: Retrieval,
  engine: Engine,
  document: Document,
  ledger: Ledger,
  factory: Factory,
  forecast: Forecast,
  surface: Surface,
};

export function ProjectGlyph({
  kind,
  className,
}: {
  kind: GlyphKind;
  className?: string;
}) {
  const Glyph = GLYPHS[kind];
  return (
    <svg
      viewBox="0 0 92 39"
      className={cn('h-full w-full text-ink-3 transition-colors duration-200 group-hover:text-ink-2', className)}
      stroke="currentColor"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <g vectorEffect="non-scaling-stroke">
        <Glyph />
      </g>
    </svg>
  );
}
