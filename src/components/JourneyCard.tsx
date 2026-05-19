"use client";

import { motion } from "framer-motion";
import { smoothEasing } from "@/lib/animations";

const timelineItems = [
  {
    period: "2025 – 2030",
    title: "预防医学 · 本科",
    subtitle: "医学生身份出发，系统学习预防医学、流行病学与卫生统计",
    description:
      "在校期间同时自主探索 AI 与编程，将医学数据分析思维与技术能力交叉融合，开启跨学科成长之路。",
  },
];

const methodologies = [
  {
    icon: "🔄",
    title: "自媒体与商业闭环",
    description:
      `在浪尖儿社群中深耕自媒体、AI与销售，打通"技术赋能-内容引流-私域转化"的闭环，实现双线增长。`,
  },
  {
    icon: "⚡",
    title: "AIGC全栈开发落地",
    description:
      "基于 Prompt 工程使用 Claude Code 替代传统手写开发，独立产出高审美简历网站与交互式飞机大战小游戏。",
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: smoothEasing },
  }),
};

export default function JourneyCard() {
  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      {/* Terminal-style header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-xs text-accent-primary/60">//</span>
        <h3 className="font-mono text-[11px] tracking-widest uppercase text-text-muted/50">
          经历 & 方法论
        </h3>
        <div className="ml-2 h-px flex-1 bg-white/[0.04]" />
      </div>

      {/* Timeline */}
      <div className="relative mb-8 pl-7">
        <div className="absolute left-[5px] top-2 h-[calc(100%-16px)] w-px bg-white/[0.06]" />
        <ul className="space-y-10">
          {timelineItems.map((item, index) => (
            <motion.li
              key={index}
              className="relative"
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="absolute -left-[26px] top-2 h-2 w-2 rounded-full bg-accent-primary/60" />
              <span className="mb-2 inline-block text-[11px] font-medium tracking-wider text-text-muted/60 uppercase">
                {item.period}
              </span>
              <h4 className="mt-1 text-xl font-semibold tracking-tight text-text-primary">
                {item.title}
              </h4>
              <p className="mt-0.5 text-sm text-accent-warm/80">{item.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary/70">
                {item.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Methodologies */}
      <div className="border-t border-white/[0.04] pt-6">
        <span className="mb-4 inline-block font-mono text-[10px] tracking-widest text-text-muted/40 uppercase">
          方法论
        </span>
        <div className="flex flex-col gap-4">
          {methodologies.map((m, i) => (
            <motion.div
              key={m.title}
              className="rounded-2xl bg-bg-secondary/40 p-5 transition-all duration-300 hover:border hover:border-white/[0.06] hover:bg-bg-secondary/70"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.01, y: -2 }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-base">{m.icon}</span>
                <h4 className="text-sm font-semibold text-text-primary">
                  {m.title}
                </h4>
              </div>
              <p className="text-xs leading-relaxed text-text-secondary/70">
                {m.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom flourish */}
      <div className="mt-6 border-t border-white/[0.04] pt-5 text-center text-xs text-text-muted/40">
        <span>从校园到领航 · 一直在路上</span>
      </div>
    </div>
  );
}
