"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { smoothTransition } from "@/lib/animations";

// ─── Master data ───────────────────────────────────────────────────────

const MASTERS = {
  adler: {
    id: "adler",
    name: "阿尔弗雷德·阿德勒",
    nameEn: "Alfred Adler",
    avatar: "🧑‍🏫",
    avatarBg: "from-accent-primary/20 to-accent-warm/10",
    accent: "text-accent-primary",
    border: "border-accent-primary/20",
    tagBg: "bg-accent-primary/10",
    welcome:
      "朋友，我感觉到你心里有些包袱。今天想聊聊人际关系，还是对未来的迷茫？",
  },
  jung: {
    id: "jung",
    name: "卡尔·荣格",
    nameEn: "Carl Jung",
    avatar: "🌙",
    avatarBg: "from-[#8b7cf7]/20 to-[#8b7cf7]/5",
    accent: "text-[#8b7cf7]",
    border: "border-[#8b7cf7]/20",
    tagBg: "bg-[#8b7cf7]/10",
    welcome:
      "你来了。我感觉到你内心深处的某种波动。最近有什么梦境让你印象深刻吗？",
  },
};

type MasterId = keyof typeof MASTERS;

type Message = { role: "user" | "assistant"; content: string };

// ─── Component ─────────────────────────────────────────────────────────

export default function CyberPhilosopherPage() {
  const [view, setView] = useState<"home" | "chat">("home");
  const [master, setMaster] = useState<(typeof MASTERS)[MasterId] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [exchangeCount, setExchangeCount] = useState(0);

  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, 50);
  }, []);

  // Auto-scroll when messages change
  useEffect(() => scrollToBottom(), [messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (view === "chat") setTimeout(() => inputRef.current?.focus(), 300);
  }, [view]);

  // ESC to close modal
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showModal]);

  // ── Start chat ─────────────────────────────────────────────────

  const startChat = (id: MasterId) => {
    const m = MASTERS[id];
    setMaster(m);
    setMessages([{ role: "assistant", content: m.welcome }]);
    setHistory([]);
    setExchangeCount(0);
    setView("chat");
  };

  const goHome = () => {
    setView("home");
    setMaster(null);
  };

  // ── Send ───────────────────────────────────────────────────────

  const handleSend = async () => {
    const text = input.trim();
    if (!text || !master || isSending) return;

    setInput("");
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setHistory((prev) => [...prev, userMsg]);
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          master: master.id,
          history,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `服务暂时不可用 (${res.status})`);
      }

      const data = await res.json();
      const aiMsg: Message = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, aiMsg]);
      setHistory((prev) => [...prev, aiMsg]);
      setExchangeCount((prev) => prev + 1);
    } catch (err) {
      const msg =
        err instanceof TypeError
          ? "网络连接失败，请检查服务器是否运行。"
          : err instanceof Error
            ? err.message
            : "抱歉，我暂时无法回应。请稍后再试。";
      setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
      setExchangeCount((prev) => prev + 1);
    } finally {
      setIsSending(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────

  const isAdler = master?.id === "adler";
  const accentColor = master?.accent || "text-accent-primary";
  const borderColor = master?.border || "border-accent-primary/20";

  return (
    <div className="relative min-h-dvh bg-bg-primary overflow-hidden">
      {/* ── Ambient glow ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 10% 20%, rgba(139,124,247,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 80%, rgba(201,168,76,0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* ── Particles canvas ── */}
      <ParticlesCanvas />

      {/* ══════════════ HOME VIEW ══════════════ */}
      {view === "home" && (
        <motion.div
          className="relative z-10 flex min-h-dvh flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top bar */}
          <header className="flex items-center justify-between px-6 pt-6 pb-2 sm:px-10">
            <span className="flex items-center gap-2 text-sm font-medium tracking-wide text-text-primary/80">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent-primary/20 text-xs text-accent-primary">
                ✦
              </span>
              赛博先哲
            </span>
            <button
              onClick={() => setShowModal(true)}
              className="rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-text-muted transition-all duration-300 hover:border-accent-primary/30 hover:text-accent-primary/80"
            >
              关于
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-6 pb-10 sm:px-10">
            {/* Hero */}
            <section className="mt-8 sm:mt-16">
              <div className="inline-block rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5 text-[11px] tracking-wider text-accent-primary/70">
                ✦ AI 赛博疗愈 · 情感陪伴
              </div>
              <h1 className="mt-6 text-[clamp(2rem,7vw,3.6rem)] font-extrabold leading-[1.12] tracking-tight text-white/95">
                深夜 emo 了？
                <br />
                <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                  跟百年心理学巨匠
                </span>
                <br />
                聊聊
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary/80">
                你的专属 AI 赛博疗愈站。
                <br className="hidden sm:block" />
                穿越时空，与心理学大师进行一场只属于你的深度对话。
              </p>
              <div className="mt-10 flex items-center gap-2 text-[11px] tracking-widest text-text-muted/40 uppercase">
                <span>选择一位先哲</span>
                <span className="inline-block h-px w-8 bg-white/[0.06]" />
              </div>
            </section>

            {/* Master cards */}
            <section className="mt-5 flex flex-col gap-5 sm:flex-row">
              {(Object.keys(MASTERS) as MasterId[]).map((id) => {
                const m = MASTERS[id];
                const isA = id === "adler";
                return (
                  <div
                    key={id}
                    onClick={() => startChat(id)}
                    className={`group relative flex-1 cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:border-white/[0.12] sm:p-8`}
                  >
                    <div
                      className={`pointer-events-none absolute -right-8 -top-8 h-[120px] w-[120px] rounded-full opacity-30 blur-[50px] transition-opacity duration-500 ${
                        isA ? "bg-accent-primary/25" : "bg-[#8b7cf7]/25"
                      }`}
                    />
                    <div className="relative z-10">
                      <div
                        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl shadow-lg ${
                          isA
                            ? "from-accent-primary/20 to-accent-warm/10 shadow-accent-primary/5"
                            : "from-[#8b7cf7]/20 to-[#8b7cf7]/5 shadow-[#8b7cf7]/5"
                        }`}
                      >
                        {m.avatar}
                      </div>
                      <h3 className="text-xl font-bold text-white/95">
                        {m.name}
                      </h3>
                      <p className="mt-1 text-sm text-text-muted">{m.nameEn}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(
                          isA
                            ? ["#专治内耗", "#被讨厌的勇气"]
                            : ["#梦境解析", "#潜意识"]
                        ).map((tag) => (
                          <span
                            key={tag}
                            className={`rounded-full border px-3 py-1 text-[11px] font-medium ${
                              isA
                                ? "border-accent-primary/20 bg-accent-primary/8 text-accent-primary/80"
                                : "border-[#8b7cf7]/20 bg-[#8b7cf7]/8 text-[#8b7cf7]/80"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-text-secondary/70">
                        {isA
                          ? "「一切烦恼都来自人际关系。」帮你剖析自卑与超越，找到内心的勇气。"
                          : "「你的潜意识正在操控你的人生。」带你探索梦境、阴影与集体无意识。"}
                      </p>
                      <div
                        className={`mt-6 flex items-center gap-2 text-sm font-medium transition-colors ${
                          isA
                            ? "text-accent-primary hover:text-accent-primary/80"
                            : "text-[#8b7cf7] hover:text-[#8b7cf7]/80"
                        }`}
                      >
                        <span>开始对话</span>
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>

            <footer className="mt-14 text-center text-xs text-text-muted/30">
              赛博先哲 · Cyber Philosopher — 让智慧穿越时空
            </footer>
          </div>
        </motion.div>
      )}

      {/* ══════════════ CHAT VIEW ══════════════ */}
      {view === "chat" && master && (
        <motion.div
          className="relative z-10 flex min-h-dvh flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top bar */}
          <header className="fixed left-0 right-0 top-0 z-20 flex items-center gap-3 border-b border-white/[0.06] bg-bg-card/85 px-4 py-3 backdrop-blur-2xl sm:px-6">
            <button
              onClick={goHome}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-text-muted transition-all duration-200 hover:border-white/[0.12] hover:text-text-primary active:scale-95"
              aria-label="返回"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg bg-gradient-to-br ${master.avatarBg}`}
              >
                {master.avatar}
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-text-primary">
                  正在与 {master.name} 对话
                </h2>
                <p className={`flex items-center gap-1 text-[11px] ${accentColor}/60`}>
                  <span className={`inline-block h-1.5 w-1.5 rounded-full ${accentColor.replace("text", "bg")}/60`} />
                  在线
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[11px] font-medium transition-all duration-300 active:scale-95 ${borderColor} ${master.tagBg} ${accentColor}/90 hover:bg-white/[0.08]`}
            >
              解锁全部
            </button>
          </header>

          {/* Messages */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto px-4 pt-20 pb-28 sm:px-6"
            style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"} message-item`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed sm:max-w-[75%] ${
                    msg.role === "user"
                      ? "bubble-user text-text-primary/90"
                      : "bubble-ai text-text-secondary/90"
                  }`}
                  style={{
                    borderRadius:
                      msg.role === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
                    background:
                      msg.role === "user"
                        ? "rgba(139, 124, 247, 0.15)"
                        : "rgba(22, 22, 42, 0.8)",
                    border: msg.role === "user"
                      ? "1px solid rgba(139, 124, 247, 0.15)"
                      : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {msg.role === "assistant" && (
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-sm">{master.avatar}</span>
                      <span className={`text-[11px] font-medium ${accentColor}`}>
                        {master.name}
                      </span>
                    </div>
                  )}
                  <p className={msg.role === "user" ? "text-right" : ""}>
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isSending && (
              <div className="mb-4 flex justify-start message-item">
                <div
                  className="bubble-ai px-5 py-4"
                  style={{
                    borderRadius: "4px 18px 18px 18px",
                    background: "rgba(22, 22, 42, 0.8)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{master.avatar}</span>
                    <div className="flex">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Unlock hint */}
            {exchangeCount >= 2 && (
              <div className="my-4 flex justify-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="group flex items-center gap-2 rounded-full border border-accent-primary/20 bg-accent-primary/8 px-5 py-2.5 text-sm font-medium text-accent-primary/90 transition-all duration-300 hover:border-accent-primary/30 hover:bg-accent-primary/15 hover:shadow-[0_0_30px_rgba(168,134,68,0.08)]"
                >
                  <span>🔓</span>
                  <span>解锁深度疗愈对话</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/[0.04] bg-gradient-to-t from-bg-primary via-bg-primary to-transparent px-4 pb-5 pt-3 sm:px-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-end gap-3"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="说说你的心事…"
                  disabled={isSending}
                  className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-3.5 text-sm text-text-primary placeholder:text-text-muted/50 outline-none transition-all duration-300 focus:border-accent-primary/40 focus:bg-white/[0.05] disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={!input.trim() || isSending}
                className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary text-bg-primary shadow-lg shadow-accent-primary/20 transition-all duration-300 hover:shadow-accent-primary/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13" />
                  <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>
          </div>
        </motion.div>
      )}

      {/* ══════════════ MODAL ══════════════ */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/70 p-6 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="w-full max-w-sm rounded-3xl border border-white/[0.08] bg-bg-card/95 p-8 shadow-2xl backdrop-blur-2xl"
              initial={{ scale: 0.92, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 16, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-primary/15 to-accent-warm/5 text-3xl shadow-lg shadow-accent-primary/10">
                🔮
              </div>

              <h3 className="text-center text-xl font-bold text-white/95">
                {master ? `${master.name}需要休息了` : "解锁深度疗愈"}
              </h3>

              <p className="mt-3 text-center text-sm leading-relaxed text-text-secondary/80">
                你已体验完毕基础对话。
                <br />
                解锁无限制深度对话，并生成专属<wbr />《心理疗愈诊断长图》。
              </p>

              <ul className="mt-6 space-y-3">
                {["无限制深度对话", "专属疗愈诊断长图", "解锁更多先哲大师"].map(
                  (item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-text-secondary/90"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-primary/10 text-xs text-accent-primary">
                        ✦
                      </span>
                      {item}
                    </li>
                  )
                )}
              </ul>

              <button
                onClick={() => setShowModal(false)}
                className="btn-shine mt-8 w-full rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary px-6 py-4 text-base font-bold text-bg-primary shadow-xl shadow-accent-primary/20 transition-all duration-300 hover:shadow-accent-primary/30 active:scale-[0.98]"
              >
                获取完整权限
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="mt-4 w-full text-center text-xs text-text-muted/50 transition-colors hover:text-text-muted/80"
              >
                再看看
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Floating Particles ───────────────────────────────────────────────

function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    let mouse = { x: -999, y: -999 };
    let frameId = 0;

    const resize = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(60, Math.floor(window.innerWidth / 15));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.25 + 0.05,
      });
    }

    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMouse);

    const animate = () => {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= dx * 0.01;
          p.y -= dy * 0.01;
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(168, 134, 68, ${p.alpha})`;
        ctx!.fill();
      }
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
