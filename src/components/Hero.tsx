"use client";

import { motion } from "framer-motion";
import { heroContainer, heroItem } from "@/lib/animations";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-[12%] mx-auto h-[520px] max-w-5xl bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.58),rgba(0,0,0,0.22)_42%,transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent-primary/[0.06] blur-[130px]" />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.span
          className="mb-6 font-mono text-[10px] tracking-[0.24em] text-accent-secondary/80 uppercase"
          variants={heroItem}
        >
          Portfolio · 2026
        </motion.span>

        {/* Main title — English */}
        <motion.h1
          className="text-4xl font-bold tracking-normal sm:text-5xl md:text-6xl lg:text-7xl"
          variants={heroItem}
        >
          <span className="text-gradient">Medical Student</span>
          <br />
          <span className="text-text-primary">Building with AI</span>
        </motion.h1>

        {/* Chinese tagline */}
        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
          variants={heroItem}
        >
          一个医学生，正在用 AI 把学习、内容、项目和成长重新连接起来。
        </motion.p>

        {/* Role tags */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
          variants={heroItem}
        >
          {[
            "医学生",
            "AI成长型创作者",
            "AIGC实践者",
            "内容增长探索者",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-white/[0.10] bg-white/[0.055] px-3.5 py-1.5 font-mono text-[10px] tracking-wide text-text-secondary/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors duration-300 hover:border-accent-primary/45 hover:text-accent-secondary sm:text-[11px]"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-10 flex items-center gap-4"
          variants={heroItem}
        >
          <a
            href="#metrics"
            className="btn-shine inline-flex items-center gap-2 rounded-lg border border-accent-primary/40 bg-accent-primary/[0.16] px-6 py-3 text-sm font-medium text-accent-secondary shadow-[0_12px_34px_rgba(0,0,0,0.28)] transition-all duration-300 hover:border-accent-secondary/60 hover:bg-accent-primary/[0.24] hover:shadow-[0_0_34px_var(--accent-glow)]"
          >
            探索更多
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
        </motion.div>

        {/* Social Presence */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-4"
          variants={heroItem}
        >
          <span className="text-[9px] tracking-[0.22em] text-text-muted/70 uppercase">
            Social Presence
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "Personal · 小红书", href: "https://www.xiaohongshu.com/user/profile/5f28f8e00000000001009073" },
              { label: "Personal · 抖音", href: "https://v.douyin.com/5wuLdsXZs24/" },
              { label: "AI Lab · 小红书", href: "https://xhslink.com/m/7G3CNeXCu3W" },
              { label: "AI Lab · 抖音", href: "https://v.douyin.com/Vs4peyUk8sw/" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/[0.10] bg-white/[0.045] px-4 py-2 text-[11px] text-text-secondary/85 transition-all duration-300 hover:border-accent-primary/45 hover:text-accent-secondary hover:shadow-[0_0_22px_var(--accent-glow)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[9px] tracking-[0.22em] text-text-muted/65 uppercase">
              Scroll
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text-muted/60"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
