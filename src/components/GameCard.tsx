"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Player {
  x: number;
  y: number;
  size: number;
}

interface Bullet {
  x: number;
  y: number;
  speed: number;
  radius: number;
}

interface Enemy {
  x: number;
  y: number;
  speed: number;
  size: number;
}

interface BGParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PLAYER_SIZE = 18;
const BULLET_SPEED = 7;
const BULLET_RADIUS = 3;
const BULLET_INTERVAL = 180;
const ENEMY_MIN_SPEED = 1.2;
const ENEMY_MAX_SPEED = 3.5;
const BASE_ENEMY_SIZE = 14;
const SPAWN_INTERVAL = 900;
const BG_PARTICLE_COUNT = 30;
const STAR_COUNT = 80;

// ─── Component ───────────────────────────────────────────────────────────────

export default function GameCard() {
  const [expanded, setExpanded] = useState(false);

  // DOM refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Data refs (no re-renders)
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef<Star[]>([]);

  const gameRef = useRef({
    player: { x: 0, y: 0, size: PLAYER_SIZE } as Player,
    bullets: [] as Bullet[],
    enemies: [] as Enemy[],
    score: 0,
    lastBullet: 0,
    lastSpawn: 0,
    frameId: 0,
    running: false,
  });

  const bgParticlesRef = useRef<BGParticle[]>([]);
  const bgFrameRef = useRef<number>(0);

  // ── Open / Close ─────────────────────────────────────────────────────

  const open = useCallback(() => {
    setExpanded(true);
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    const gs = gameRef.current;
    gs.running = false;
    cancelAnimationFrame(gs.frameId);
    setExpanded(false);
    document.body.style.overflow = "";
  }, []);

  // ── Unmount cleanup ──────────────────────────────────────────────────

  useEffect(() => {
    const gs = gameRef.current;
    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(gs.frameId);
      cancelAnimationFrame(bgFrameRef.current);
    };
  }, []);

  // ── Background particles (card idle state) ───────────────────────────

  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resize();
    window.addEventListener("resize", resize);

    // Init particles
    const rect = parent.getBoundingClientRect();
    bgParticlesRef.current = Array.from({ length: BG_PARTICLE_COUNT }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.4 + 0.15,
    }));

    const animate = () => {
      const pr = parent.getBoundingClientRect();
      const cw = pr.width;
      const ch = pr.height;
      const dpr = window.devicePixelRatio || 1;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);

      for (const p of bgParticlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = cw;
        if (p.x > cw) p.x = 0;
        if (p.y < 0) p.y = ch;
        if (p.y > ch) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(112, 90, 69, ${p.alpha * 0.45})`;
        ctx.fill();
      }

      ctx.restore();
      bgFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(bgFrameRef.current);
    };
  }, []);

  // ── ESC key exit ────────────────────────────────────────────────────

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded, close]);

  // ── Game loop (expanded) ─────────────────────────────────────────────

  useEffect(() => {
    if (!expanded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High-DPI setup
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    // ── Mouse / touch tracking ──

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) return;
      mouseRef.current.x = touch.clientX;
      mouseRef.current.y = touch.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    // ── Initialise game state ──

    const gs = gameRef.current;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    gs.player = { x: vw / 2, y: vh - 80, size: PLAYER_SIZE };
    gs.bullets = [];
    gs.enemies = [];
    gs.score = 0;
    gs.lastBullet = 0;
    gs.lastSpawn = 0;
    gs.running = true;

    // Generate subtle paper dots
    starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * vw,
      y: Math.random() * vh,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    // ── Resize ──

    const onResize = () => {
      const d = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * d;
      canvas.height = window.innerHeight * d;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    window.addEventListener("resize", onResize);

    // ── Game loop ──

    const loop = (timestamp: number) => {
      if (!gs.running) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // ── Update ──

      // Clamp player within bounds, bottom 60 % of screen
      gs.player.x = Math.max(PLAYER_SIZE, Math.min(mouseRef.current.x, w - PLAYER_SIZE));
      gs.player.y = Math.max(h * 0.4, Math.min(mouseRef.current.y, h - 40));

      // Auto-fire bullets
      if (timestamp - gs.lastBullet > BULLET_INTERVAL) {
        gs.bullets.push({
          x: gs.player.x,
          y: gs.player.y - gs.player.size,
          speed: BULLET_SPEED,
          radius: BULLET_RADIUS,
        });
        gs.lastBullet = timestamp;
      }

      // Spawn enemies from random X at top
      if (timestamp - gs.lastSpawn > SPAWN_INTERVAL) {
        const enemySize = BASE_ENEMY_SIZE + Math.random() * 6;
        gs.enemies.push({
          x: enemySize + Math.random() * (w - enemySize * 2),
          y: -enemySize,
          speed: ENEMY_MIN_SPEED + Math.random() * (ENEMY_MAX_SPEED - ENEMY_MIN_SPEED),
          size: enemySize,
        });
        gs.lastSpawn = timestamp;
      }

      // Move bullets upward
      for (let i = gs.bullets.length - 1; i >= 0; i--) {
        gs.bullets[i].y -= gs.bullets[i].speed;
        if (gs.bullets[i].y < -10) {
          gs.bullets.splice(i, 1);
        }
      }

      // Move enemies downward
      for (let i = gs.enemies.length - 1; i >= 0; i--) {
        gs.enemies[i].y += gs.enemies[i].speed;
        if (gs.enemies[i].y > h + 30) {
          gs.enemies.splice(i, 1);
        }
      }

      // Collision: bullet vs enemy
      for (let i = gs.bullets.length - 1; i >= 0; i--) {
        const bullet = gs.bullets[i];
        let used = false;

        for (let j = gs.enemies.length - 1; j >= 0; j--) {
          const enemy = gs.enemies[j];
          const dx = bullet.x - enemy.x;
          const dy = bullet.y - enemy.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < bullet.radius + enemy.size / 2) {
            gs.enemies.splice(j, 1);
            used = true;
            gs.score += 10;
            break;
          }
        }

        if (used) {
          gs.bullets.splice(i, 1);
        }
      }

      // ── Draw ──

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Background fill
      ctx.fillStyle = "#fbf8f1";
      ctx.fillRect(0, 0, w, h);

      // Warm paper-like surface
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.6);
      grad.addColorStop(0, "rgba(255, 253, 248, 0.9)");
      grad.addColorStop(1, "rgba(245, 239, 229, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(44, 42, 39, 0.045)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 36) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 36) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Subtle paper dots
      for (const star of starsRef.current) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(112, 90, 69, ${star.alpha * 0.22})`;
        ctx.fill();
      }

      // ── Bullets (warm dots) ──
      ctx.shadowColor = "rgba(112, 90, 69, 0.18)";
      ctx.shadowBlur = 4;
      ctx.fillStyle = "#8e6b50";
      for (const b of gs.bullets) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Enemies (muted diamonds) ──
      ctx.shadowColor = "rgba(158, 103, 83, 0.2)";
      ctx.shadowBlur = 5;

      for (const e of gs.enemies) {
        const s = e.size * 0.6;

        // Outer diamond
        ctx.fillStyle = "#a96f5b";
        ctx.beginPath();
        ctx.moveTo(e.x, e.y - s);
        ctx.lineTo(e.x + s, e.y);
        ctx.lineTo(e.x, e.y + s);
        ctx.lineTo(e.x - s, e.y);
        ctx.closePath();
        ctx.fill();

        // Inner highlight
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(255, 253, 248, 0.45)";
        ctx.beginPath();
        ctx.moveTo(e.x, e.y - s * 0.4);
        ctx.lineTo(e.x + s * 0.4, e.y);
        ctx.lineTo(e.x, e.y + s * 0.4);
        ctx.lineTo(e.x - s * 0.4, e.y);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 12;
      }

      // ── Player (triangle / arrow) ──
      const p = gs.player;
      ctx.shadowColor = "rgba(105, 127, 159, 0.2)";
      ctx.shadowBlur = 6;

      // Main fuselage (triangle)
      ctx.fillStyle = "#697f9f";
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - p.size);
      ctx.lineTo(p.x - p.size * 0.85, p.y + p.size * 0.55);
      ctx.lineTo(p.x + p.size * 0.85, p.y + p.size * 0.55);
      ctx.closePath();
      ctx.fill();

      // Engine exhaust glow
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(142, 107, 80, 0.45)";
      ctx.beginPath();
      ctx.moveTo(p.x - p.size * 0.35, p.y + p.size * 0.4);
      ctx.lineTo(p.x, p.y + p.size * 0.8);
      ctx.lineTo(p.x + p.size * 0.35, p.y + p.size * 0.4);
      ctx.closePath();
      ctx.fill();

      // Core highlight (white inner triangle)
      ctx.fillStyle = "rgba(255, 253, 248, 0.72)";
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - p.size * 0.55);
      ctx.lineTo(p.x - p.size * 0.3, p.y + p.size * 0.15);
      ctx.lineTo(p.x + p.size * 0.3, p.y + p.size * 0.15);
      ctx.closePath();
      ctx.fill();

      // ── Score ──
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(44, 42, 39, 0.82)";
      ctx.font = 'bold 22px "Geist Mono", "Fira Code", monospace';
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(`SCORE: ${gs.score}`, 20, 24);

      // Score glow highlight for scores > 0
      if (gs.score > 0) {
        ctx.fillStyle = "rgba(105, 127, 159, 0.12)";
        ctx.fillText(`SCORE: ${gs.score}`, 22, 26);
      }

      ctx.restore();

      gs.frameId = requestAnimationFrame(loop);
    };

    gs.frameId = requestAnimationFrame(loop);

    // ── Cleanup ──

    return () => {
      gs.running = false;
      cancelAnimationFrame(gs.frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
    };
  }, [expanded]);

  // ─── Render ────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Card (default / idle state) ── */}
      <motion.div
        ref={cardRef}
        className="relative cursor-pointer overflow-hidden rounded-lg border border-black/[0.08]"
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
          willChange: "transform",
          background:
            "linear-gradient(135deg, #fffdf8 0%, #fff8eb 58%, #f3eadc 100%)",
          minHeight: 220,
          boxShadow: "0 18px 44px rgba(86,65,41,0.08)",
        }}
        whileHover={{
          y: -2,
          boxShadow: "0 24px 56px rgba(86,65,41,0.11)",
          transition: { type: "spring", stiffness: 250, damping: 18 },
        }}
        onClick={open}
      >
        {/* Background particle canvas */}
        <canvas
          ref={bgCanvasRef}
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 0 }}
        />

        {/* Content */}
        <div
          className="relative z-10 flex min-h-[220px] flex-col items-center justify-center px-6 py-8"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span
            className="mb-3 block font-mono text-sm text-accent-secondary/75"
            style={{ transform: "translateZ(20px)" }}
          >
            PLAY
          </span>
          <h3
            className="mb-1 text-xl font-semibold text-text-primary"
            style={{ transform: "translateZ(10px)" }}
          >
            Canvas 飞机大战小游戏
          </h3>
          <p
            className="text-sm text-text-secondary/85"
            style={{ transform: "translateZ(5px)" }}
          >
            作品集里的一个浅色交互 Demo
          </p>
        </div>

        {/* Hover hint */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="text-xs text-text-muted/75">点击展开</span>
        </div>
      </motion.div>

      {/* ── Fullscreen overlay (game) ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(251,248,241,0.96)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              ref={containerRef}
              className="relative m-3 h-[calc(100%-24px)] w-[calc(100%-24px)] overflow-hidden rounded-[1.75rem] border border-black/[0.08] bg-bg-card shadow-[0_24px_70px_rgba(64,52,39,0.14)]"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              {/* Top bar */}
              <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-5 py-4">
                <span className="font-mono text-sm tracking-[0.08em] text-text-muted">
                  Canvas 飞机大战小游戏 &middot; 交互 Demo
                </span>

                {/* Close button */}
                <button
                  className="flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/75 px-4 py-2 text-sm text-text-secondary transition-all duration-200 hover:bg-white hover:text-text-primary"
                  onClick={close}
                  aria-label="关闭游戏"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M14 4L4 14M4 4l10 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Exit (ESC)
                </button>
              </div>

              {/* Game canvas */}
              <canvas ref={canvasRef} className="block" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
