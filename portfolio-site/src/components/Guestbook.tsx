"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://weyhuopnfwdryokojkva.supabase.co",
  "sb_publishable_lm3y_VvHpRKVSFPLNojKPA_OSJuhgOO"
);

export default function Guestbook() {
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim() || !message.trim()) return;

    const { error } = await supabase.from("messages").insert({
      name: contact.trim(),
      content: message.trim(),
    });

    if (error) {
      console.error("Supabase insert error:", error);
      alert("提交失败: " + error.message);
      return;
    }

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
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
              找到我
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              扫码添加微信，备注「合作」更快通过
            </p>

            {/* ---- QR Code ---- */}
            <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:shadow-[0_12px_56px_rgba(0,0,0,0.6)]">
              <Image
                src="/wechat-qr.png"
                alt="杨存邦微信二维码"
                width={220}
                height={220}
                className="block h-auto w-full max-w-[200px] sm:max-w-[220px]"
              />
            </div>

            {/* ---- Caption ---- */}
            <p className="mt-5 max-w-[240px] text-center text-sm leading-relaxed text-[var(--text-muted)]">
              扫码添加破局日记主理人，围观实战搞钱日常
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
