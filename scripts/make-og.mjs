/**
 * Generates the Open Graph card for the portfolio.
 * Emits public/og.svg, and public/og.png when a rasteriser is available.
 *
 * Usage: node -I make-og.mjs <projectDir>
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const projectDir = process.argv[2];
if (!projectDir) {
  console.error('usage: node make-og.mjs <projectDir>');
  process.exit(1);
}

const W = 1200;
const H = 630;

const BASE = '#EDEAE3';
const PANEL = '#E4E0D5';
const INK = '#121110';
const DIM = '#55504A';
const FAINT = '#8B8578';
const ACCENT = '#FF4D1C';
const LINE = 'rgba(18,17,16,0.16)';

/* ---------- Icosahedron, projected ---------------------------------------- */

const t = (1 + Math.sqrt(5)) / 2;
const raw = [
  [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
  [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
  [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
];
const pts = raw.map((p) => {
  const l = Math.hypot(...p);
  return p.map((v) => v / l);
});

const d3 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
let min = Infinity;
for (let i = 0; i < pts.length; i++)
  for (let j = i + 1; j < pts.length; j++) min = Math.min(min, d3(pts[i], pts[j]));

const edges = [];
for (let i = 0; i < pts.length; i++)
  for (let j = i + 1; j < pts.length; j++)
    if (d3(pts[i], pts[j]) < min * 1.05) edges.push([i, j]);

// A pleasant resting attitude.
const RX = 0.46;
const RY = 0.82;

function rot([x, y, z], rx, ry) {
  const cy = Math.cos(ry), sy = Math.sin(ry);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  const cx = Math.cos(rx), sx = Math.sin(rx);
  return [x1, y * cx - z1 * sx, y * sx + z1 * cx];
}

const CX = 946;
const CY = 300;
const SCALE = 158;
const FOV = 3.1;

const proj = pts.map((p) => {
  const [x, y, z] = rot(p, RX, RY);
  const d = FOV / (FOV - z);
  return [CX + x * SCALE * d, CY + y * SCALE * d, z];
});

const edgeSvg = edges
  .map(([a, b]) => ({ a: proj[a], b: proj[b], z: (proj[a][2] + proj[b][2]) / 2 }))
  .sort((m, n) => m.z - n.z)
  .map(({ a, b, z }) => {
    const depth = (z + 1) / 2;
    const sw = (0.75 + depth * 1.45) * 1.9;
    const op = (0.2 + depth * 0.72).toFixed(3);
    return `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${INK}" stroke-opacity="${op}" stroke-width="${sw.toFixed(2)}" stroke-linecap="round"/>`;
  })
  .join('\n      ');

const nodeSvg = proj
  .slice()
  .sort((m, n) => m[2] - n[2])
  .map(([x, y, z]) => {
    const depth = (z + 1) / 2;
    const r = (1.1 + depth * 2.0) * 1.9;
    const near = depth > 0.78;
    const halo =
      depth > 0.62
        ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * 3.1).toFixed(1)}" fill="${ACCENT}" fill-opacity="${((depth - 0.62) * 0.2).toFixed(3)}"/>`
        : '';
    const fill = near ? ACCENT : INK;
    const op = near ? Math.min(1, 0.75 + (depth - 0.78) * 1.3) : 0.28 + depth * 0.68;
    return `${halo}<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${fill}" fill-opacity="${op.toFixed(3)}"/>`;
  })
  .join('\n      ');

/* ---------- Type ---------------------------------------------------------- */

const SANS = "Haettenschweiler, Impact, Arial Narrow Bold, Segoe UI Black, sans-serif";
const SANS_B = "Segoe UI Semibold, Segoe UI, Arial, sans-serif";
const SANS_R = "Segoe UI, Arial, sans-serif";
const SERIF = "Georgia, Times New Roman, serif";
const MONO = "Consolas, Menlo, monospace";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M28 0H0V28" fill="none" stroke="#121110" stroke-opacity="0.028" stroke-width="1"/>
    </pattern>
    <radialGradient id="bloom" cx="0%" cy="100%" r="110%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.07"/>
      <stop offset="58%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="rightwash" cx="78%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Stock -->
  <rect width="${W}" height="${H}" fill="${BASE}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#bloom)"/>

  <!-- Masthead: nameplate closed by a double rule -->
  <text x="64" y="74" font-family="${SANS}" font-size="56" letter-spacing="1" fill="${INK}">ANSHUM DEV</text>
  <text x="292" y="74" font-family="${SANS}" font-size="56" fill="${ACCENT}">.</text>
  <text x="${W - 64}" y="52" text-anchor="end" font-family="${MONO}" font-size="13" letter-spacing="2" fill="${FAINT}">VOL. 03 · NO. 01</text>
  <text x="${W - 64}" y="74" text-anchor="end" font-family="${MONO}" font-size="13" letter-spacing="2" fill="${DIM}">AHMEDABAD, IN · IST</text>
  <rect x="0" y="96" width="${W}" height="5" fill="${INK}"/>
  <rect x="0" y="106" width="${W}" height="1.5" fill="${INK}"/>

  <!-- Column rule -->
  <rect x="712" y="107" width="1.5" height="${566 - 107}" fill="${LINE}"/>

  <!-- The plate -->
  <g>
    <ellipse cx="${CX}" cy="${CY}" rx="${SCALE * 1.58}" ry="${SCALE * 1.58 * 0.26}" fill="none" stroke="${INK}" stroke-opacity="0.18" stroke-width="1.6" transform="rotate(-24 ${CX} ${CY})"/>
    <ellipse cx="${CX}" cy="${CY}" rx="${SCALE * 1.84}" ry="${SCALE * 1.84 * 0.36}" fill="none" stroke="${INK}" stroke-opacity="0.1" stroke-width="1.6" transform="rotate(-7 ${CX} ${CY})"/>
      ${edgeSvg}
      ${nodeSvg}
  </g>
  <text x="${CX}" y="500" text-anchor="middle" font-family="${MONO}" font-size="12" letter-spacing="2" fill="${FAINT}">FIG. 1 — ICO. 12V / 30E</text>

  <!-- Kicker -->
  <text x="64" y="150" font-family="${MONO}" font-size="13" letter-spacing="2.4" fill="${ACCENT}">00 —</text>
  <text x="112" y="150" font-family="${MONO}" font-size="13" letter-spacing="2.4" fill="${DIM}">AI ENGINEER &amp; SOFTWARE ENGINEER</text>

  <!-- Headline -->
  <text x="62" y="240" font-family="${SANS}" font-size="96" letter-spacing="0" fill="${INK}">ENGINEERING</text>
  <text x="62" y="334" font-family="${SERIF}" font-size="104" font-style="italic" letter-spacing="-2" fill="${ACCENT}">Intelligent</text>
  <text x="62" y="424" font-family="${SANS}" font-size="96" letter-spacing="0" fill="${INK}">SYSTEMS.</text>

  <!-- Deck -->
  <rect x="64" y="456" width="600" height="2" fill="${INK}"/>
  <text x="64" y="488" font-family="${SANS_B}" font-size="19" fill="${INK}">I'M ANSHUM DEV.</text>
  <text x="235" y="488" font-family="${SANS_R}" font-size="19" fill="${DIM}">Building AI-powered products,</text>
  <text x="64" y="516" font-family="${SANS_R}" font-size="19" fill="${DIM}">scalable backend systems, and intelligent enterprise automation.</text>

  <!-- Colophon -->
  <rect x="0" y="560" width="${W}" height="2.5" fill="${INK}"/>
  <rect x="0" y="562.5" width="${W}" height="${H - 562.5}" fill="${PANEL}"/>
  <text x="64" y="604" font-family="${MONO}" font-size="14" letter-spacing="1.6" fill="${DIM}">ANSHUM25506@GMAIL.COM</text>
  <text x="${W / 2}" y="604" text-anchor="middle" font-family="${SERIF}" font-size="16" font-style="italic" fill="${FAINT}">“There is so much left to build.”</text>
  <text x="${W - 64}" y="604" text-anchor="end" font-family="${MONO}" font-size="14" letter-spacing="1.6" fill="${FAINT}">GITHUB.COM/ANSHUM25</text>
</svg>
`;

mkdirSync(join(projectDir, 'public'), { recursive: true });
const svgPath = join(projectDir, 'public', 'og.svg');
writeFileSync(svgPath, svg, 'utf8');
console.log('wrote', svgPath);

/* ---------- Rasterise, if a converter is on hand -------------------------- */

let done = false;
try {
  const { Resvg } = await import('@resvg/resvg-js');
  const r = new Resvg(svg, { font: { loadSystemFonts: true }, fitTo: { mode: 'width', value: W } });
  writeFileSync(join(projectDir, 'public', 'og.png'), r.render().asPng());
  console.log('wrote og.png via resvg');
  done = true;
} catch (e) {
  console.log('resvg unavailable:', e.message.split('\n')[0]);
}

if (!done) {
  try {
    const sharp = (await import('sharp')).default;
    await sharp(Buffer.from(svg), { density: 192 })
      .resize(W, H, { fit: 'fill' })
      .png({ compressionLevel: 9 })
      .toFile(join(projectDir, 'public', 'og.png'));
    console.log('wrote og.png via sharp');
    done = true;
  } catch (e) {
    console.log('sharp unavailable:', e.message.split('\n')[0]);
  }
}

if (!done) process.exitCode = 3;
