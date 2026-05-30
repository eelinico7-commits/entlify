"use client";

import { motion } from "framer-motion";
import { smoothEasing } from "@/lib/animations";

const capabilities = [
  {
    index: "01",
    title: "项目推进",
    emoji: "01",
    subtitle: "把想法拆成可以执行的小步骤",
    description:
      "做过 AI No-code 校园社群，也在练习把资源、活动和内容串起来。",
    tags: ["社群运营", "资源链接", "执行复盘"],
  },
  {
    index: "02",
    title: "内容表达",
    emoji: "02",
    subtitle: "把校园观察写成可传播的内容",
    description:
      "围绕校园信息差、大学生成长和 AI 实战做内容创作，在抖音与小红书持续测试选题、表达和转化链路。",
    tags: ["选题", "剪辑", "复盘"],
  },
  {
    index: "03",
    title: "真实沟通",
    emoji: "03",
    subtitle: "在具体场景里理解用户需求",
    description:
      "做过 DIY 电脑配置服务和校园推广，学会把复杂信息翻译成别人听得懂的选择。",
    tags: ["用户沟通", "场景表达", "转化意识"],
  },
  {
    index: "04",
    title: "AI 工具",
    emoji: "04",
    subtitle: "把工具变成自己的工作流",
    description:
      "用 Claude Code、DeepSeek、Gemini 和 Obsidian 辅助写作、开发、整理知识。",
    tags: ["Claude Code", "DeepSeek", "Obsidian"],
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
    transition: { duration: 0.6, ease: smoothEasing },
  },
};

export default function RoleCards() {
  return (
    <div className="flex h-full flex-col p-7 sm:p-12">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-xs tracking-[0.12em] text-text-muted">TOOLS</span>
        <h3 className="text-sm font-medium tracking-[0.08em] uppercase text-text-muted/90">
          常用能力
        </h3>
        <div className="ml-2 h-px flex-1 bg-black/[0.08]" />
      </div>

      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {capabilities.map((cap) => (
          <motion.div
            key={cap.index}
            className="group relative overflow-hidden rounded-lg border border-black/[0.07] bg-bg-card p-7 shadow-card transition-all duration-[280ms] ease-out hover:-translate-y-1.5 hover:border-accent-primary/25 hover:bg-[#fffaf2] hover:shadow-[0_20px_48px_rgba(64,52,39,0.11)]"
            variants={itemVariants}
          >
            {/* Decorative corner */}
            <div className="absolute -right-6 -top-6 h-12 w-12 rounded-full bg-bg-secondary/70 blur-xl transition-all duration-500" />

            <div className="relative">
              {/* Index + title */}
              <div className="mb-3 flex items-start justify-between">
                <span className="font-mono text-xs tracking-[0.12em] text-text-muted">
                  {cap.title}
                </span>
                <span className="font-mono text-xs text-text-muted transition-colors duration-[280ms] ease-out group-hover:text-accent-secondary">
                  {cap.emoji}
                </span>
              </div>

              {/* Subtitle */}
              <p className="mb-3 text-sm leading-[1.7] text-accent-secondary/90">
                {cap.subtitle}
              </p>

              {/* Description */}
              <p className="mb-7 text-base leading-[1.85] text-text-secondary/85">
                {cap.description}
              </p>

              {/* Tags */}
              <div className="mt-auto flex flex-wrap gap-1.5">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/[0.07] bg-white/70 px-3 py-1 font-mono text-xs tracking-[0.08em] text-text-secondary/80 transition-colors duration-[280ms] ease-out group-hover:border-accent-primary/35 group-hover:bg-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
