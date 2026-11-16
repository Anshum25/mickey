import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/* -------------------------------------------------------------------------- */
/*  Geometry                                                                  */
/* -------------------------------------------------------------------------- */

type V3 = [number, number, number];

/** Icosahedron: 12 vertices on three orthogonal golden rectangles. */
function icosahedron(): { points: V3[]; edges: [number, number][] } {
  const t = (1 + Math.sqrt(5)) / 2;
  const raw: V3[] = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ];

  // Normalise to the unit sphere so the silhouette is predictable.
  const points = raw.map((p) => {
    const len = Math.hypot(p[0], p[1], p[2]);
    return [p[0] / len, p[1] / len, p[2] / len] as V3;
  });

  // Edges are the vertex pairs at the minimum separation.
  let min = Infinity;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const d = dist(points[i]!, points[j]!);
      if (d < min) min = d;
    }
  }
  const edges: [number, number][] = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (dist(points[i]!, points[j]!) < min * 1.05) edges.push([i, j]);
    }
  }
  return { points, edges };
}

function dist(a: V3, b: V3) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function rotate(p: V3, rx: number, ry: number): V3 {
  const [x, y, z] = p;
  // Y axis
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  // X axis
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  const y1 = y * cx - z1 * sx;
  const z2 = y * sx + z1 * cx;
  return [x1, y1, z2];
}

const SOLID = icosahedron();

/** Satellite nodes orbiting the solid — the "system" around the core. */
const SATELLITES: { radius: number; speed: number; phase: number; tilt: number }[] = [
  { radius: 1.52, speed: 0.22, phase: 0.0, tilt: 0.42 },
  { radius: 1.78, speed: -0.15, phase: 2.1, tilt: -0.3 },
  { radius: 1.64, speed: 0.18, phase: 4.2, tilt: 1.05 },
  { radius: 1.92, speed: -0.11, phase: 5.4, tilt: 0.18 },
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

/** Read live from the stylesheet so the night edition re-inks the plate. */
function readInks(el: HTMLElement) {
  const cs = getComputedStyle(el);
  const pick = (name: string, fallback: string) => {
    const v = cs.getPropertyValue(name).trim();
    return v || fallback;
  };
  return {
    ink: pick('--color-ink', '#121110'),
    acid: pick('--color-acid', '#ff4d1c'),
  };
}

/** Hex (or rgb) to an `r, g, b` triple usable inside rgba(). */
function triple(color: string): string {
  const hex = color.replace('#', '');
  if (/^[0-9a-f]{6}$/i.test(hex)) {
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(', ');
  }
  const m = color.match(/-?\d+(\.\d+)?/g);
  return m && m.length >= 3 ? m.slice(0, 3).map(Number).join(', ') : '18, 17, 16';
}

/**
 * A rotating wireframe solid drawn on a 2D canvas with a hand-rolled
 * perspective projection.
 *
 * Deliberately not React Three Fiber: this is roughly 4 KB of logic against
 * ~600 KB of library for a single static object, and it gives exact control
 * over depth-based stroke weight — which is what makes the object read as
 * machined rather than lit.
 */
export function IdentitySculpture({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let disposed = false;

    /* --- Pointer parallax ---------------------------------------------- */
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };

    /* --- Sizing --------------------------------------------------------- */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /* --- Draw ----------------------------------------------------------- */
    let INK = '18, 17, 16';
    let ACCENT = '255, 77, 28';
    const refreshInks = () => {
      const inks = readInks(document.documentElement);
      INK = triple(inks.ink);
      ACCENT = triple(inks.acid);
    };
    refreshInks();

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      if (w < 2 || h < 2) return;

      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) * 0.345;
      const fov = 3.1;

      // Ease the pointer influence so it feels weighted, not twitchy.
      eased.x += (pointer.x - eased.x) * 0.055;
      eased.y += (pointer.y - eased.y) * 0.055;

      const ry = t * 0.16 + eased.x * 0.42;
      const rx = Math.sin(t * 0.11) * 0.34 - eased.y * 0.34;

      const project = (p: V3): [number, number, number] => {
        const [x, y, z] = rotate(p, rx, ry);
        const d = fov / (fov - z);
        return [cx + x * scale * d, cy + y * scale * d, z];
      };

      /* --- Orbit rings: thin, behind the solid ------------------------- */
      ctx.lineWidth = 1;
      for (let i = 0; i < 2; i++) {
        const rr = scale * (1.58 + i * 0.26);
        const squash = 0.26 + i * 0.1;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-0.42 + i * 0.3 + eased.x * 0.06);
        ctx.beginPath();
        ctx.ellipse(0, 0, rr, rr * squash, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${INK}, ${0.16 - i * 0.05})`;
        ctx.stroke();
        ctx.restore();
      }

      /* --- Edges: depth-sorted, depth-weighted ------------------------- */
      const pts = SOLID.points.map(project);

      const sorted = SOLID.edges
        .map(([a, b]) => {
          const pa = pts[a]!;
          const pb = pts[b]!;
          return { pa, pb, z: (pa[2] + pb[2]) / 2 };
        })
        .sort((m, n) => m.z - n.z);

      for (const { pa, pb, z } of sorted) {
        // z runs roughly -1 (far) to 1 (near).
        const depth = (z + 1) / 2;
        ctx.beginPath();
        ctx.moveTo(pa[0], pa[1]);
        ctx.lineTo(pb[0], pb[1]);
        ctx.lineWidth = 0.75 + depth * 1.45;
        ctx.strokeStyle = `rgba(${INK}, ${0.14 + depth * 0.68})`;
        ctx.stroke();
      }

      /* --- Vertices ---------------------------------------------------- */
      const order = pts.map((p, i) => ({ p, i })).sort((m, n) => m.p[2] - n.p[2]);
      for (const { p } of order) {
        const depth = (p[2] + 1) / 2;
        const r = 1.1 + depth * 2.0;

        // A faint halo on the forward-facing nodes only.
        if (depth > 0.62) {
          ctx.beginPath();
          ctx.arc(p[0], p[1], r * 3.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${ACCENT}, ${(depth - 0.62) * 0.2})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p[0], p[1], r, 0, Math.PI * 2);
        ctx.fillStyle =
          depth > 0.78
            ? `rgba(${ACCENT}, ${0.72 + (depth - 0.78) * 1.3})`
            : `rgba(${INK}, ${0.24 + depth * 0.66})`;
        ctx.fill();
      }

      /* --- Satellites: the surrounding system -------------------------- */
      for (const s of SATELLITES) {
        const a = t * s.speed + s.phase;
        const base: V3 = [Math.cos(a) * s.radius, Math.sin(a) * s.radius * 0.34, Math.sin(a) * s.radius];
        const tilted: V3 = [
          base[0],
          base[1] * Math.cos(s.tilt) - base[2] * Math.sin(s.tilt),
          base[1] * Math.sin(s.tilt) + base[2] * Math.cos(s.tilt),
        ];
        const [px, py, pz] = project(tilted);
        const depth = (pz + 1) / 2;
        ctx.beginPath();
        ctx.arc(px, py, 0.9 + depth * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, ${0.28 + depth * 0.6})`;
        ctx.fill();
      }
    };

    /* --- Loop ----------------------------------------------------------- */
    const start = performance.now();
    const frame = (now: number) => {
      if (disposed) return;
      draw((now - start) / 1000);
      raf = window.requestAnimationFrame(frame);
    };

    resize();

    if (reduced) {
      // A single composed still frame. No loop, no pointer tracking.
      draw(1.9);
    } else {
      raf = window.requestAnimationFrame(frame);
      canvas.addEventListener('pointermove', onPointerMove);
      canvas.addEventListener('pointerleave', onPointerLeave);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(1.9);
    });
    ro.observe(canvas);

    // Stop burning frames while the tab is hidden.
    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        window.cancelAnimationFrame(raf);
      } else {
        raf = window.requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    // The edition toggle swaps the ink tokens; pick the new ones up at once.
    const themeWatcher = new MutationObserver(() => {
      refreshInks();
      if (reduced) draw(1.9);
    });
    themeWatcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      themeWatcher.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="A rotating wireframe icosahedron drawn in line art with orbiting registration nodes, used as a personal mark."
    />
  );
}
