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
    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(gameRef.current.frameId);
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
        ctx.fillStyle = `rgba(162, 155, 254, ${p.alpha})`;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // Generate starfield
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
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, w, h);

      // Subtle purple vignette
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.6);
      grad.addColorStop(0, "rgba(30, 20, 60, 0.25)");
      grad.addColorStop(1, "rgba(10, 10, 15, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Starfield
      for (const star of starsRef.current) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      }

      // ── Bullets (yellow dots) ──
      ctx.shadowColor = "#fdcb6e";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#fdcb6e";
      for (const b of gs.bullets) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Enemies (red diamonds) ──
      ctx.shadowColor = "#e74c3c";
      ctx.shadowBlur = 12;

      for (const e of gs.enemies) {
        const s = e.size * 0.6;

        // Outer diamond
        ctx.fillStyle = "#e74c3c";
        ctx.beginPath();
        ctx.moveTo(e.x, e.y - s);
        ctx.lineTo(e.x + s, e.y);
        ctx.lineTo(e.x, e.y + s);
        ctx.lineTo(e.x - s, e.y);
        ctx.closePath();
        ctx.fill();

        // Inner highlight
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(255, 120, 120, 0.3)";
        ctx.beginPath();
        ctx.moveTo(e.x, e.y - s * 0.4);
        ctx.lineTo(e.x + s * 0.4, e.y);
        ctx.lineTo(e.x, e.y + s * 0.4);
        ctx.lineTo(e.x - s * 0.4, e.y);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 12;
      }

      // ── Player (triangle / arrow spaceship) ──
      const p = gs.player;
      ctx.shadowColor = "#a29bfe";
      ctx.shadowBlur = 18;

      // Main fuselage (triangle)
      ctx.fillStyle = "#a29bfe";
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - p.size);
      ctx.lineTo(p.x - p.size * 0.85, p.y + p.size * 0.55);
      ctx.lineTo(p.x + p.size * 0.85, p.y + p.size * 0.55);
      ctx.closePath();
      ctx.fill();

      // Engine exhaust glow
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(253, 203, 110, 0.55)";
      ctx.beginPath();
      ctx.moveTo(p.x - p.size * 0.35, p.y + p.size * 0.4);
      ctx.lineTo(p.x, p.y + p.size * 0.8);
      ctx.lineTo(p.x + p.size * 0.35, p.y + p.size * 0.4);
      ctx.closePath();
      ctx.fill();

      // Core highlight (white inner triangle)
      ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - p.size * 0.55);
      ctx.lineTo(p.x - p.size * 0.3, p.y + p.size * 0.15);
      ctx.lineTo(p.x + p.size * 0.3, p.y + p.size * 0.15);
      ctx.closePath();
      ctx.fill();

      // ── Score ──
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.font = 'bold 22px "Geist Mono", "Fira Code", monospace';
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(`SCORE: ${gs.score}`, 20, 24);

      // Score glow highlight for scores > 0
      if (gs.score > 0) {
        ctx.fillStyle = "rgba(162, 155, 254, 0.15)";
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
        className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06]"
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
          willChange: "transform",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #141414 50%, #111111 100%)",
          minHeight: 220,
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
        }}
        whileHover={{
          rotateX: 4,
          rotateY: -4,
          scale: 1.02,
          boxShadow: "0 12px 56px rgba(201, 168, 76, 0.12)",
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
            className="mb-3 block text-4xl"
            style={{ transform: "translateZ(20px)" }}
          >
            🎮
          </span>
          <h3
            className="mb-1 text-xl font-bold text-white"
            style={{ transform: "translateZ(10px)" }}
          >
            飞机大战
          </h3>
          <p
            className="text-sm text-text-muted"
            style={{ transform: "translateZ(5px)" }}
          >
            手势控制 &middot; Canvas 射击游戏
          </p>
        </div>

        {/* Hover hint */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="text-xs text-text-muted/40">点击展开</span>
        </div>
      </motion.div>

      {/* ── Fullscreen overlay (game) ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              ref={containerRef}
              className="relative h-full w-full"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              {/* Top bar */}
              <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-5 py-4">
                <span className="font-mono text-sm tracking-wider text-white/50">
                  飞机大战 &middot; CANVAS
                </span>

                {/* Close button */}
                <button
                  className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/70 transition-all duration-200 hover:bg-white/15 hover:text-white"
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
