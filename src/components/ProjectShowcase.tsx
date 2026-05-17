"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import Card from "./Card";

const projects = [
  {
    icon: "🕸️",
    title: "个人作品集网站",
    tech: "Next.js 16 · Three.js · Framer Motion",
    description:
      "全 Claude Code Prompt 工程驱动开发，深色暖金 Bento 布局，3D 粒子背景，微交互动画系统。",
    tags: ["Next.js", "Three.js", "Framer Motion", "TailwindCSS v4"],
    gradient: "from-accent-primary/[0.06] to-accent-secondary/[0.02]",
  },
  {
    icon: "🎮",
    title: "飞机大战 · Canvas 游戏",
    tech: "原生 Canvas · 碰撞检测 · 粒子系统",
    description:
      "全屏交互式射击游戏，鼠标/手势追踪操控，实时碰撞检测、粒子特效与计分系统。",
    tags: ["Canvas API", "碰撞检测", "粒子系统", "RequestAnimationFrame"],
    gradient: "from-accent-warm/[0.06] to-accent-primary/[0.02]",
  },
  {
    icon: "🤖",
    title: "AI Agent 应用开发",
    tech: "Claude API · DeepSeek · Gemini",
    description:
      "基于 Claude Code 与多模型 API 构建 Agent 应用，覆盖内容生成、数据分析与自动化工作流。",
    tags: ["Claude API", "Agent 架构", "Prompt 工程", "自动化"],
    gradient: "from-accent-gold/[0.06] to-accent-warm/[0.02]",
  },
];

const containerVariants = {
  ...staggerContainer,
  visible: {
    ...staggerContainer.visible,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 18 },
  },
};

export default function ProjectShowcase() {
  return (
    <Card className="p-6 sm:p-8">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <span className="text-xl">💼</span>
        <h3 className="text-sm font-medium tracking-widest uppercase text-text-muted">
          项目展示
        </h3>
        <div className="ml-2 h-px flex-1 bg-white/[0.04]" />
      </div>

      {/* Projects */}
      <motion.div
        className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Featured project — spans full width on first position */}
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className={`group/card relative overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient} p-5 transition-all duration-300 ease-in-out hover:bg-bg-secondary/60 ${i === 0 ? "sm:col-span-2" : ""}`}
            variants={itemVariants}
            whileHover={{ y: -2, scale: 1.01 }}
          >
            {/* Decorative glow */}
            <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-accent-primary/[0.04] blur-2xl transition-all duration-500 group-hover/card:bg-accent-primary/[0.08]" />

            <div className="relative">
              {/* Icon + title row */}
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">{project.icon}</span>
                <h4 className="text-sm font-semibold text-text-primary">
                  {project.title}
                </h4>
              </div>

              {/* Tech subtitle */}
              <p className="mb-2 font-mono text-[10px] tracking-wider text-accent-primary/60">
                {project.tech}
              </p>

              {/* Description */}
              <p className="mb-3 text-xs leading-relaxed text-text-secondary/80">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] text-text-muted transition-colors duration-200 group-hover/card:border-accent-primary/20 group-hover/card:text-accent-primary/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="mt-4 border-t border-white/[0.04] pt-4 text-center text-xs text-text-muted/40">
        <span>更多项目持续开发中 · 敬请期待</span>
      </div>
    </Card>
  );
}
