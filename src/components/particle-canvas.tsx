"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  type: "dot" | "line";
  lineLength: number;
  drift: number;
  driftSpeed: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const PARTICLE_COUNT = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    const createParticle = (startFromBottom = true): Particle => {
      const type = Math.random() > 0.6 ? "line" : "dot";
      return {
        x: Math.random() * canvas.width,
        y: startFromBottom
          ? canvas.height + Math.random() * 100
          : Math.random() * canvas.height,
        speed: 0.3 + Math.random() * 1.2,
        size: type === "dot" ? 1 + Math.random() * 2 : 1,
        opacity: 0.1 + Math.random() * 0.4,
        type,
        lineLength: type === "line" ? 20 + Math.random() * 60 : 0,
        drift: 0,
        driftSpeed: (Math.random() - 0.5) * 0.3,
      };
    };

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle(false));
      }
    };

    const drawParticle = (p: Particle) => {
      if (!ctx) return;

      if (p.type === "dot") {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 255, ${p.opacity})`;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 3
        );
        gradient.addColorStop(0, `rgba(0, 242, 255, ${p.opacity * 0.3})`);
        gradient.addColorStop(1, "rgba(0, 242, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();
      } else {
        // Data line flowing upward
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + p.lineLength);
        ctx.strokeStyle = `rgba(0, 242, 255, ${p.opacity * 0.6})`;
        ctx.lineWidth = p.size;
        ctx.stroke();

        // Line glow
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + p.lineLength);
        ctx.strokeStyle = `rgba(0, 242, 255, ${p.opacity * 0.15})`;
        ctx.lineWidth = p.size * 4;
        ctx.stroke();
      }
    };

    const update = () => {
      for (const p of particles) {
        p.y -= p.speed;
        p.drift += p.driftSpeed;
        p.x += Math.sin(p.drift) * 0.3;

        // Reset when off screen
        if (p.y + (p.lineLength || 0) < -20) {
          Object.assign(p, createParticle(true));
        }
      }
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        drawParticle(p);
      }

      update();
      animationId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener("resize", () => {
      resize();
    });

    // Observe body height changes
    const observer = new ResizeObserver(() => {
      resize();
    });
    observer.observe(document.body);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
