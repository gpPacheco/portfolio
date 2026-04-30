"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  life: number;
  maxLife: number;
  hue: number;
}

export default function MistCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const initialX = width / 2;
    const initialY = height * 0.34;

    // Mouse tracking
    let mouseX = initialX;
    let mouseY = initialY;
    let targetX = initialX;
    let targetY = initialY;
    let lastMouseX = initialX;
    let lastMouseY = initialY;
    let velocityX = 0;
    let velocityY = 0;

    const particles: Particle[] = [];

    const MAX_PARTICLES = 140;

    const createParticle = (x: number, y: number, vx: number, vy: number): Particle => {
      const speed = Math.sqrt(vx * vx + vy * vy);
      const maxLife = 80 + Math.random() * 90;
      return {
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: vx * 0.3 + (Math.random() - 0.5) * 0.8,
        vy: vy * 0.3 + (Math.random() - 0.5) * 0.8 - 0.15,
        radius: 30 + Math.random() * 50 + speed * 3,
        alpha: 0,
        life: 0,
        maxLife,
        hue: 190 + Math.random() * 30, // cyan range
      };
    };

    const spawnCloud = () => {
      velocityX = (mouseX - lastMouseX) * 0.5;
      velocityY = (mouseY - lastMouseY) * 0.5;
      lastMouseX = mouseX;
      lastMouseY = mouseY;

      const count = 2 + Math.floor(Math.sqrt(velocityX ** 2 + velocityY ** 2) * 0.4);
      for (let i = 0; i < Math.min(count, 4); i++) {
        if (particles.length < MAX_PARTICLES) {
          particles.push(createParticle(mouseX, mouseY, velocityX, velocityY));
        }
      }
    };

    let animId: number;

    const animate = () => {
      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.07;
      targetY += (mouseY - targetY) * 0.07;

      // Trail spawn
      spawnCloud();

      // Clear with trailing fade
      ctx.clearRect(0, 0, width, height);

      // Draw background glow at cursor
      const grad = ctx.createRadialGradient(
        targetX,
        targetY,
        0,
        targetX,
        targetY,
        220
      );
      grad.addColorStop(0, "rgba(56,189,248,0.03)");
      grad.addColorStop(0.5, "rgba(56,189,248,0.015)");
      grad.addColorStop(1, "rgba(15,15,15,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.radius += 0.4;

        // Fade in then out
        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.alpha = (progress / 0.2) * 0.12;
        } else {
          p.alpha = ((1 - progress) / 0.8) * 0.12;
        }

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const pGrad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius
        );
        pGrad.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${p.alpha})`);
        pGrad.addColorStop(0.4, `hsla(${p.hue}, 70%, 60%, ${p.alpha * 0.5})`);
        pGrad.addColorStop(1, `hsla(${p.hue}, 60%, 50%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = pGrad;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
