"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  pulse: number;
};

export function NeuralParticles({
  className = "",
  density = 54,
}: {
  className?: string;
  density?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const node = canvas;
    const ctx = context;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.5, y: 0.5 };
    const particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    function resize() {
      const rect = node.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      node.width = Math.max(1, Math.floor(width * pixelRatio));
      node.height = Math.max(1, Math.floor(height * pixelRatio));
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      particles.length = 0;
      const count = Math.min(90, Math.max(26, Math.floor((width * height) / 16000) + density));

      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.38,
          vy: (Math.random() - 0.5) * 0.38,
          size: 1 + Math.random() * 1.9,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    function movePointer(event: PointerEvent) {
      const rect = node.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      const pointerX = pointer.x * width;
      const pointerY = pointer.y * height;

      particles.forEach((particle, index) => {
        if (!prefersReducedMotion) {
          const dx = particle.x - pointerX;
          const dy = particle.y - pointerY;
          const distance = Math.max(80, Math.sqrt(dx * dx + dy * dy));
          const influence = Math.min(0.018, 16 / (distance * distance));

          particle.vx += dx * influence;
          particle.vy += dy * influence;
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vx *= 0.985;
          particle.vy *= 0.985;
          particle.pulse += 0.025;
        }

        if (particle.x < -12) particle.x = width + 12;
        if (particle.x > width + 12) particle.x = -12;
        if (particle.y < -12) particle.y = height + 12;
        if (particle.y > height + 12) particle.y = -12;

        for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
          const next = particles[nextIndex];
          const dx = particle.x - next.x;
          const dy = particle.y - next.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 132) {
            const alpha = (1 - distance / 132) * 0.26;
            ctx.strokeStyle = `rgba(32, 201, 151, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
          }
        }

        const glow = 0.42 + Math.sin(particle.pulse) * 0.22;
        ctx.fillStyle = `rgba(245, 158, 11, ${0.14 + glow * 0.16})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size + glow, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(132, 255, 221, 0.82)";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.72, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";
    }

    resize();
    window.addEventListener("resize", resize);
    node.addEventListener("pointermove", movePointer);
    gsap.ticker.add(draw);

    return () => {
      gsap.ticker.remove(draw);
      window.removeEventListener("resize", resize);
      node.removeEventListener("pointermove", movePointer);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-auto absolute inset-0 h-full w-full ${className}`}
    />
  );
}
