"use client";

import { motion } from "framer-motion";

const advantages = [
  {
    index: "01",
    title: "商业社群统筹",
    emoji: "🚀",
    subtitle: "美团AIGC俱乐部 · 主席",
    description:
      "聚焦 AIGC 技术应用，带队探索 Agent 搭建与落地场景，统筹社群运营与活动策划，推动 AI 技术在校园的普及。",
    tags: ["AIGC 应用", "Agent 搭建", "社群运营", "活动策划"],
  },
  {
    index: "02",
    title: "校园销售转化",
    emoji: "📚",
    subtitle: "新东方 · 校园大使",
    description:
      "负责校园市场推广与品牌活动执行，销售转化率持续保持在 25%–40%，积累了扎实的商务拓展与用户运营经验。",
    tags: ["销售转化 25%-40%", "校园推广", "品牌运营", "商务拓展"],
  },
  {
    index: "03",
    title: "自媒体与商业闭环",
    emoji: "🔄",
    subtitle: "破局日记 · 主理人",
    description:
      `在全国5000+大学生的”浪尖儿社群”中深造自媒体、AI与销售。打通了”技术赋能-内容引流-私域转化”的核心闭环，实现双线增长。`,
    tags: ["自媒体运营", "内容引流", "私域转化", "双线增长"],
  },
  {
    index: "04",
    title: "AIGC全栈开发落地",
    emoji: "⚡",
    subtitle: "独立开发者",
    description:
      "完全基于Prompt工程使用Claude Code替代传统手写开发，独立产出高审美简历网站与交互式飞机大战小游戏。",
    tags: ["Claude Code", "DeepSeek API", "Gemini", "Obsidian", "智能体开发"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export default function RoleCards() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/[0.06] bg-bg-card p-8 shadow-card transition-all duration-500 ease-in-out hover:scale-[1.01] hover:border-white/[0.12] hover:shadow-[0_0_80px_rgba(168,134,68,0.08)]">
      {/* Terminal-style header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-xs text-accent-primary/60">//</span>
        <h3 className="font-mono text-[11px] tracking-widest uppercase text-text-muted/50">
          核心优势 & 工具箱
        </h3>
        <div className="ml-2 h-px flex-1 bg-white/[0.04]" />
      </div>

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {advantages.map((adv) => (
          <motion.div
            key={adv.index}
            className="group rounded-2xl bg-bg-secondary/40 p-5 transition-all duration-300 ease-in-out hover:border hover:border-white/[0.08] hover:bg-bg-secondary/70"
            variants={itemVariants}
            whileHover={{ y: -3, scale: 1.01 }}
          >
            {/* Engineering index */}
            <div className="mb-3 flex items-start justify-between">
              <span className="font-mono text-[10px] tracking-widest text-accent-primary/40">
                {adv.index} // {adv.title}
              </span>
              <span className="text-lg">{adv.emoji}</span>
            </div>

            {/* Subtitle */}
            <p className="mb-2 text-xs font-medium text-accent-primary/70">
              {adv.subtitle}
            </p>

            {/* Description */}
            <p className="mb-4 text-sm leading-relaxed text-text-secondary/80">
              {adv.description}
            </p>

            {/* Tech stack badges */}
            <div className="mt-auto flex flex-wrap gap-1.5">
              {adv.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-text-muted transition-colors duration-200 group-hover:border-accent-primary/20 group-hover:text-accent-primary/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
