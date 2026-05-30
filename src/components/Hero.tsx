"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { heroContainer, heroItem } from "@/lib/animations";

export default function Hero() {
  const focusCards = [
    { title: "AI 工具实践", note: "Claude Code / Prompt / 工作流" },
    { title: "校园内容", note: "抖音、小红书选题和复盘" },
    { title: "个人网站", note: "把想法整理成可访问作品" },
  ];

  return (
    <section className="relative flex min-h-[84vh] items-center overflow-hidden px-6 pt-24 pb-20 sm:pt-32 sm:pb-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-[18%] mx-auto h-[360px] max-w-5xl bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.85),rgba(255,253,248,0.42)_55%,transparent_76%)] blur-2xl" />

      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="text-left">
          <motion.span
            className="mb-7 inline-block font-mono text-xs tracking-[0.12em] text-text-muted uppercase"
            variants={heroItem}
          >
            Portfolio / 2026
          </motion.span>

          <motion.div
            className="flex max-w-3xl flex-col gap-7 sm:flex-row sm:items-center sm:gap-9 lg:gap-10"
            variants={heroItem}
          >
            <div className="w-fit rounded-[2rem] border border-black/[0.08] bg-white/80 p-2.5 shadow-[0_16px_38px_rgba(64,52,39,0.11)]">
              <Image
                src="/images/avatar.jpg"
                alt="杨存邦头像"
                width={136}
                height={136}
                priority
                className="h-20 w-20 rounded-[1.55rem] object-cover sm:h-28 sm:w-28 lg:h-32 lg:w-32"
              />
            </div>

            <div>
              <h1 className="text-[3rem] font-semibold leading-none tracking-[-0.02em] text-text-primary sm:text-[4.25rem] lg:text-[5rem]">
                杨存邦
              </h1>
              <p className="mt-4 text-lg leading-[1.7] text-text-secondary sm:text-xl">
                学生创作者 · AI 实践者
              </p>
              <p className="mt-3 max-w-md text-base leading-[1.8] text-text-secondary">
                用 AI 把想法做成作品。
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-2.5"
            variants={heroItem}
          >
            {["AI 工具实践", "校园内容", "个人项目"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/[0.07] bg-white/75 px-4 py-2 font-mono text-xs tracking-[0.08em] text-text-secondary/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-colors duration-300 hover:border-accent-primary/25 hover:text-accent-secondary"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            variants={heroItem}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-black/[0.10] bg-text-primary px-6 py-3 text-sm font-medium text-bg-card shadow-[0_14px_30px_rgba(44,42,39,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
            >
              看作品
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
            <a
              href="#journey"
              className="inline-flex items-center rounded-full border border-black/[0.10] bg-white/75 px-6 py-3 text-sm font-medium text-text-primary shadow-[0_10px_24px_rgba(64,52,39,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-primary/25 hover:bg-white"
            >
              了解我
            </a>
          </motion.div>

          <motion.div className="mt-12 flex flex-wrap gap-2.5" variants={heroItem}>
            {[
              { label: "小红书", href: "https://www.xiaohongshu.com/user/profile/5f28f8e00000000001009073" },
              { label: "抖音", href: "https://v.douyin.com/5wuLdsXZs24/" },
              { label: "AI Lab", href: "https://xhslink.com/m/7G3CNeXCu3W" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-black/[0.07] bg-white/65 px-4 py-2 text-xs tracking-[0.08em] text-text-secondary/85 transition-all duration-300 hover:border-accent-primary/25 hover:text-accent-secondary"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div className="relative" variants={heroItem}>
          <div className="absolute -inset-6 rounded-[2rem] bg-white/55 blur-2xl" />
          <div className="group/now relative overflow-hidden rounded-2xl border border-black/[0.08] bg-bg-card p-5 shadow-card transition-all duration-[280ms] ease-out hover:-translate-y-1.5 hover:border-accent-primary/25 hover:bg-[#fffaf2] hover:shadow-[0_22px_54px_rgba(64,52,39,0.12)]">
            <div className="relative mb-5 aspect-[4/3] min-h-[300px] overflow-hidden rounded-xl border border-black/[0.07] bg-[linear-gradient(135deg,#f7efe2_0%,#fffdf8_44%,#e9dfd0_100%)] lg:min-h-[330px]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(44,42,39,0.05)_1px,transparent_1px),linear-gradient(rgba(44,42,39,0.05)_1px,transparent_1px)] bg-[size:28px_28px] transition-transform duration-[280ms] ease-out group-hover/now:scale-[1.03]" />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/78 px-3 py-1.5 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#88a06f]" />
                <span className="font-mono text-xs tracking-[0.12em] text-text-muted uppercase">
                  正在做
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-black/[0.08] bg-white/80 p-5 shadow-[0_12px_30px_rgba(64,52,39,0.08)] backdrop-blur-sm transition-transform duration-[280ms] ease-out group-hover/now:-translate-y-1">
                <p className="font-mono text-xs tracking-[0.12em] text-text-muted uppercase">
                  Now Building
                </p>
                <h2 className="mt-3 text-2xl font-semibold leading-[1.25] text-text-primary">
                  AI 内容与个人项目工作台
                </h2>
                <p className="mt-3 text-sm leading-[1.75] text-text-secondary">
                  把工具实验、校园内容和网站迭代放在同一个地方复盘。
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {focusCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-black/[0.07] bg-white/70 p-4 transition-all duration-[280ms] ease-out hover:-translate-y-1 hover:border-accent-primary/25 hover:bg-[#fffaf2] hover:shadow-[0_12px_28px_rgba(64,52,39,0.08)]"
                >
                    <h3 className="text-lg font-semibold leading-[1.35] text-text-primary">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.7] text-text-muted">
                    {card.note}
                  </p>
                </div>
              ))}
            </div>
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
            <span className="text-xs tracking-[0.12em] text-text-muted/65 uppercase">
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
