"use client";

import { useEffect, useRef } from "react";

/* ====================== */
/* BRAND COLORS           */
/* ====================== */
const BLUE  = { r: 74,  g: 144, b: 217 };
const GREEN = { r: 16,  g: 185, b: 129 };
const VIOLET= { r: 139, g: 92,  b: 246 };
const ORANGE= { r: 255, g: 107, b: 53  };

/* ====================== */
/* TYPES                  */
/* ====================== */
interface CurveParticle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  life: number; maxLife: number;
  color: { r: number; g: number; b: number };
}

interface FlowingParticle {
  x: number; y: number;
  progress: number;
  speed: number;
  size: number;
  opacity: number;
  offset: number;
}

interface AmbientParticle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

interface SparkParticle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number;
}

/* ====================== */
/* HELPERS                */
/* ====================== */
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function lerpColor(a: { r: number; g: number; b: number }, b: { r: number; g: number; b: number }, t: number) {
  return { r: lerp(a.r, b.r, t), g: lerp(a.g, b.g, t), b: lerp(a.b, b.b, t) };
}
function rgba(c: { r: number; g: number; b: number }, a: number) {
  return `rgba(${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)},${a})`;
}

/* Bar chart data - 12 bars */
const barHeights = [0.35, 0.42, 0.38, 0.55, 0.50, 0.65, 0.60, 0.72, 0.68, 0.80, 0.75, 0.88];

/* Growth curve control points (normalized 0-1) */
const curvePoints = [
  { x: 0.05, y: 0.75 },
  { x: 0.15, y: 0.68 },
  { x: 0.25, y: 0.62 },
  { x: 0.35, y: 0.55 },
  { x: 0.45, y: 0.48 },
  { x: 0.55, y: 0.40 },
  { x: 0.65, y: 0.32 },
  { x: 0.75, y: 0.24 },
  { x: 0.85, y: 0.16 },
  { x: 0.92, y: 0.10 },
];

export default function GoldParticleChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = 1;
    let W = 0;
    let H = 0;
    let time = 0;

    /* Particles arrays */
    let curveParticles: CurveParticle[] = [];
    let flowingParticles: FlowingParticle[] = [];
    let ambientParticles: AmbientParticle[] = [];
    let sparkParticles: SparkParticle[] = [];

    /* Resize handler */
    function resize() {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    /* Get curve Y at a given X progress (0-1) */
    function getCurveY(t: number): number {
      const pts = curvePoints;
      const n = pts.length - 1;
      const idx = Math.min(Math.floor(t * n), n - 1);
      const localT = (t * n) - idx;
      const p0 = pts[idx];
      const p1 = pts[idx + 1];
      return lerp(p0.y, p1.y, localT);
    }

    /* Initialize particles */
    function initParticles() {
      curveParticles = [];
      for (let i = 0; i < 70; i++) {
        curveParticles.push(createCurveParticle());
      }
      flowingParticles = [];
      for (let i = 0; i < 25; i++) {
        flowingParticles.push({
          x: 0, y: 0,
          progress: Math.random(),
          speed: 0.0005 + Math.random() * 0.001,
          size: 1.5 + Math.random() * 2,
          opacity: 0.2 + Math.random() * 0.4,
          offset: (Math.random() - 0.5) * 30,
        });
      }
      ambientParticles = [];
      for (let i = 0; i < 45; i++) {
        ambientParticles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 1 + Math.random() * 2,
          opacity: 0.1 + Math.random() * 0.25,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.01 + Math.random() * 0.02,
        });
      }
      sparkParticles = [];
    }

    function createCurveParticle(): CurveParticle {
      const t = Math.random();
      const cx = t * W;
      const cy = getCurveY(t) * H;
      const c = lerpColor(BLUE, GREEN, t);
      return {
        x: cx + (Math.random() - 0.5) * 40,
        y: cy + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 1 + Math.random() * 2.5,
        life: 0,
        maxLife: 100 + Math.random() * 200,
        color: c,
      };
    }

    function createSpark(): SparkParticle {
      const endPt = curvePoints[curvePoints.length - 1];
      const ex = endPt.x * W;
      const ey = endPt.y * H;
      return {
        x: ex, y: ey,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3 - 1,
        life: 0,
        maxLife: 30 + Math.random() * 40,
        size: 1 + Math.random() * 2,
      };
    }

    /* ====================== */
    /* DRAW FUNCTIONS         */
    /* ====================== */

    function drawGrid() {
      if (!ctx) return;
      // Horizontal lines
      for (let i = 0; i < 8; i++) {
        const y = (i / 7) * H * 0.8 + H * 0.1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.strokeStyle = `rgba(74,144,217,0.04)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      // Vertical lines
      for (let i = 0; i < 14; i++) {
        const x = (i / 13) * W;
        ctx.beginPath();
        ctx.moveTo(x, H * 0.1);
        ctx.lineTo(x, H * 0.9);
        ctx.strokeStyle = `rgba(74,144,217,0.03)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function drawBars() {
      if (!ctx) return;
      const barCount = barHeights.length;
      const barW = W / (barCount + 2);
      const gap = barW * 0.3;
      const maxH = H * 0.65;

      for (let i = 0; i < barCount; i++) {
        const x = (i + 1) * barW + gap / 2;
        const w = barW - gap;
        const baseH = barHeights[i] * maxH;
        const pulse = Math.sin(time * 0.02 + i * 0.5) * 0.05 + 1;
        const h = baseH * pulse;
        const y = H - H * 0.1 - h;

        const grad = ctx.createLinearGradient(x, y, x, H - H * 0.1);
        grad.addColorStop(0, `rgba(74,144,217,0.25)`);
        grad.addColorStop(1, `rgba(74,144,217,0.05)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        const r = Math.min(3, w / 4);
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, H - H * 0.1);
        ctx.lineTo(x, H - H * 0.1);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.fill();
      }
    }

    function drawCurve() {
      if (!ctx) return;
      const pts = curvePoints.map(p => ({
        x: p.x * W,
        y: p.y * H,
      }));

      // Area fill
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const curr = pts[i];
        const cpx = (prev.x + curr.x) / 2;
        ctx.quadraticCurveTo(prev.x + (curr.x - prev.x) * 0.5, prev.y, cpx, (prev.y + curr.y) / 2);
      }
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();

      const areaGrad = ctx.createLinearGradient(0, 0, W, 0);
      areaGrad.addColorStop(0, `rgba(74,144,217,0.08)`);
      areaGrad.addColorStop(0.5, `rgba(16,185,129,0.06)`);
      areaGrad.addColorStop(1, `rgba(16,185,129,0.03)`);
      ctx.fillStyle = areaGrad;
      ctx.fill();

      // Curve line with glow
      for (let pass = 0; pass < 2; pass++) {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          const prev = pts[i - 1];
          const curr = pts[i];
          const cpx = (prev.x + curr.x) / 2;
          ctx.quadraticCurveTo(prev.x + (curr.x - prev.x) * 0.5, prev.y, cpx, (prev.y + curr.y) / 2);
        }
        ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);

        if (pass === 0) {
          // Glow
          ctx.strokeStyle = `rgba(74,144,217,0.15)`;
          ctx.lineWidth = 8;
          ctx.stroke();
        } else {
          // Main line
          const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
          lineGrad.addColorStop(0, rgba(BLUE, 0.8));
          lineGrad.addColorStop(0.7, rgba(GREEN, 0.8));
          lineGrad.addColorStop(1, rgba(GREEN, 1));
          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }
      }

      // Data points along curve
      for (let i = 0; i < pts.length; i += 2) {
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, 4, 0, Math.PI * 2);
        ctx.fillStyle = rgba(VIOLET, 0.6);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, 2, 0, Math.PI * 2);
        ctx.fillStyle = rgba(VIOLET, 0.9);
        ctx.fill();
      }
    }

    function drawEndpoint() {
      if (!ctx) return;
      const endPt = curvePoints[curvePoints.length - 1];
      const ex = endPt.x * W;
      const ey = endPt.y * H;
      const pulse = Math.sin(time * 0.05) * 0.5 + 0.5;

      // Expanding rings
      for (let i = 0; i < 3; i++) {
        const ringTime = ((time * 0.02 + i * 0.33) % 1);
        const ringR = ringTime * 30;
        const ringAlpha = (1 - ringTime) * 0.3;
        ctx.beginPath();
        ctx.arc(ex, ey, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(ORANGE, ringAlpha);
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Core dot
      ctx.beginPath();
      ctx.arc(ex, ey, 5 + pulse * 2, 0, Math.PI * 2);
      ctx.fillStyle = rgba(ORANGE, 0.4 + pulse * 0.3);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ex, ey, 3, 0, Math.PI * 2);
      ctx.fillStyle = rgba(ORANGE, 0.9);
      ctx.fill();

      // Outer glow
      const glow = ctx.createRadialGradient(ex, ey, 0, ex, ey, 25);
      glow.addColorStop(0, rgba(ORANGE, 0.2 + pulse * 0.1));
      glow.addColorStop(1, rgba(ORANGE, 0));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(ex, ey, 25, 0, Math.PI * 2);
      ctx.fill();
    }

    function updateAndDrawCurveParticles() {
      if (!ctx) return;
      for (let i = curveParticles.length - 1; i >= 0; i--) {
        const p = curveParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life > p.maxLife) {
          curveParticles[i] = createCurveParticle();
          continue;
        }
        const alpha = Math.min(p.life / 30, (p.maxLife - p.life) / 30, 1) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = rgba(p.color, alpha);
        ctx.fill();
      }
    }

    function updateAndDrawFlowingParticles() {
      if (!ctx) return;
      for (const p of flowingParticles) {
        p.progress += p.speed;
        if (p.progress > 1) p.progress -= 1;

        const t = p.progress;
        const cx = t * W;
        const cy = getCurveY(t) * H + p.offset;
        p.x = cx;
        p.y = cy;

        const c = lerpColor(BLUE, GREEN, t);
        const alpha = p.opacity * (0.5 + Math.sin(time * 0.03 + t * 5) * 0.3);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = rgba(c, alpha);
        ctx.fill();

        // Trail
        for (let j = 1; j <= 3; j++) {
          const tt = Math.max(0, t - j * 0.01);
          const tx = tt * W;
          const ty = getCurveY(tt) * H + p.offset;
          ctx.beginPath();
          ctx.arc(tx, ty, p.size * (1 - j * 0.25), 0, Math.PI * 2);
          ctx.fillStyle = rgba(c, alpha * (1 - j * 0.3));
          ctx.fill();
        }
      }
    }

    function updateAndDrawAmbientParticles() {
      if (!ctx) return;
      for (const p of ambientParticles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Wrap around
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        const alpha = p.opacity * (0.5 + Math.sin(p.pulse) * 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = rgba(BLUE, alpha);
        ctx.fill();

        // Subtle glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        glow.addColorStop(0, rgba(BLUE, alpha * 0.15));
        glow.addColorStop(1, rgba(BLUE, 0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function updateAndDrawSparks() {
      if (!ctx) return;
      // Emit sparks periodically
      if (time % 8 === 0 && sparkParticles.length < 15) {
        sparkParticles.push(createSpark());
      }

      for (let i = sparkParticles.length - 1; i >= 0; i--) {
        const s = sparkParticles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.02; // slight gravity
        s.life++;
        if (s.life > s.maxLife) {
          sparkParticles.splice(i, 1);
          continue;
        }
        const alpha = (1 - s.life / s.maxLife) * 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (1 - s.life / s.maxLife), 0, Math.PI * 2);
        ctx.fillStyle = rgba(ORANGE, alpha);
        ctx.fill();
      }
    }

    /* Main animation loop */
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      drawGrid();
      drawBars();
      drawCurve();
      drawEndpoint();
      updateAndDrawAmbientParticles();
      updateAndDrawCurveParticles();
      updateAndDrawFlowingParticles();
      updateAndDrawSparks();

      time++;
      animRef.current = requestAnimationFrame(animate);
    }

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
}
