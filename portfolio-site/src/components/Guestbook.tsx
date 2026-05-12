"use client";

import { useState } from "react";

export default function Guestbook() {
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim() || !message.trim()) return;
    // TODO: 接入后端 API，将留言发送到服务器
    console.log("留言提交:", { contact, message });
    setSubmitted(true);
    setContact("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 sm:px-10">
      {/* ---- Section Label ---- */}
      <div className="mb-10 flex items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-accent-primary/40 to-transparent" />
        <span className="text-xs tracking-[0.2em] uppercase text-accent-primary/60">
          留言 · Guestbook
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-accent-primary/40 to-transparent" />
      </div>

      {/* ---- Two-Column Layout (stacks on mobile) ---- */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* ============ LEFT: Form Card ============ */}
        <div className="group/card rounded-3xl border border-white/[0.06] bg-[var(--bg-card)] p-8 shadow-[var(--shadow-card)] transition-all duration-500 hover:border-white/[0.10] hover:shadow-[var(--shadow-card-hover)] sm:p-10">
          {/* Card header */}
          <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
            一起做些有意思的
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            无论是合作机会、技术交流，还是随便聊聊，都欢迎留下你的声音。
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* 联系方式 */}
            <div>
              <label
                htmlFor="contact"
                className="mb-2 block text-xs font-medium tracking-wide text-[var(--text-secondary)]"
              >
                你的微信 / 联系方式
              </label>
              <input
                id="contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="@username 或手机号 / 邮箱"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all duration-300 focus:border-accent-primary/50 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_var(--accent-glow)]"
              />
            </div>

            {/* 留言内容 */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-medium tracking-wide text-[var(--text-secondary)]"
              >
                聊聊合作或想法
              </label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="想说什么都可以 ✦"
                className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all duration-300 focus:border-accent-primary/50 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_var(--accent-glow)]"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="group/btn relative w-full overflow-hidden rounded-xl border border-accent-primary/20 bg-gradient-to-b from-accent-primary/15 to-accent-primary/5 px-6 py-3 text-sm font-medium text-accent-secondary transition-all duration-300 hover:border-accent-primary/40 hover:from-accent-primary/25 hover:to-accent-primary/10 hover:shadow-[0_0_30px_var(--accent-glow)] active:scale-[0.98]"
            >
              {/* Shimmer overlay */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />

              <span className="relative z-10 flex items-center justify-center gap-2">
                {submitted ? (
                  <>
                    <svg
                      className="h-4 w-4 text-accent-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    已发送 ✦
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    发送留言
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* ============ RIGHT: QR / Brand Card ============ */}
        <div className="rounded-3xl border border-white/[0.06] bg-[var(--bg-card)] p-8 shadow-[var(--shadow-card)] transition-all duration-500 hover:border-white/[0.10] hover:shadow-[var(--shadow-card-hover)] sm:p-10">
          {/* 二维码占位区 */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
              找到我
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              扫码添加微信，备注「合作」更快通过
            </p>

            {/* ---- QR Code Placeholder ---- */}
            <div className="relative mt-8 flex aspect-square w-full max-w-[220px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:border-accent-primary/20 hover:shadow-[var(--shadow-glow-hover)]">
              {/* Decorative grid dots */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #fff 0.5px, transparent 0.5px)",
                  backgroundSize: "16px 16px",
                }}
              />
              {/* Placeholder content */}
              <div className="relative flex flex-col items-center gap-3">
                <svg
                  className="h-12 w-12 text-accent-primary/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
                <span className="text-xs text-[var(--text-muted)]">
                  QR Code placeholder
                </span>
                {/* TODO: 替换为你的微信二维码图片
                    <Image
                      src="/images/wechat-qr.jpg"
                      alt="微信二维码"
                      fill
                      className="object-cover"
                    />
                */}
              </div>
            </div>

            {/* ---- Brand info placeholder ---- */}
            <div className="mt-8 w-full space-y-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-5 text-center">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                杨存邦
              </p>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                AIGC Developer · 美团AIGC俱乐部主席
                <br />
                新东方校园大使 · 极客与探索者
              </p>
              {/* TODO: 替换为你的个人品牌标识 / Logo */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
