"use client";

import { motion } from "framer-motion";

const featuredProject = {
  icon: "🕸️",
  title: "个人作品集网站",
  tech: "Next.js 16 · Three.js · Framer Motion",
  description:
    "全 Claude Code Prompt 工程驱动开发，深色暖金 Bento 布局，3D 粒子背景，微交互动画系统。",
  tags: ["Next.js", "Three.js", "Framer Motion", "TailwindCSS v4"],
  gradient: "from-accent-primary/[0.08] to-accent-secondary/[0.03]",
};

const otherProjects = [
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] },
  },
};

export default function ProjectShowcase() {
  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-xl">💼</span>
        <h3 className="text-sm font-medium tracking-widest uppercase text-text-muted/90">
          更多项目
        </h3>
        <div className="ml-2 h-px flex-1 bg-white/[0.10]" />
      </div>

      {/* Featured project — large hero card */}
      <motion.div
        className="group/featured relative mb-4 overflow-hidden rounded-lg border border-white/[0.08] bg-gradient-to-br from-accent-primary/[0.10] via-bg-secondary/80 to-bg-secondary/45 p-6 transition-all duration-500 hover:border-accent-primary/30 hover:from-accent-primary/[0.13] sm:p-8"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover={{ y: -3 }}
      >
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-primary/[0.06] blur-3xl transition-all duration-700 group-hover/featured:bg-accent-primary/[0.12]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-accent-secondary/[0.04] blur-3xl transition-all duration-700 group-hover/featured:bg-accent-secondary/[0.08]" />

        {/* Top row */}
        <div className="relative mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{featuredProject.icon}</span>
            <div>
              <h4 className="text-lg font-semibold text-text-primary">
                {featuredProject.title}
              </h4>
              <p className="mt-0.5 font-mono text-[11px] tracking-wider text-accent-secondary/80">
                {featuredProject.tech}
              </p>
            </div>
          </div>
          <span className="rounded-md border border-accent-primary/30 bg-accent-primary/[0.14] px-3 py-1 font-mono text-[9px] tracking-wider text-accent-secondary/90 uppercase">
            Featured
          </span>
        </div>

        {/* Description */}
        <p className="relative mb-4 max-w-2xl text-sm leading-relaxed text-text-secondary/80">
          {featuredProject.description}
        </p>

        {/* Tags */}
        <div className="relative flex flex-wrap gap-1.5">
          {featuredProject.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/[0.10] bg-white/[0.045] px-2.5 py-1 font-mono text-[10px] text-text-secondary/85 transition-all duration-200 group-hover/featured:border-accent-primary/35 group-hover/featured:text-accent-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Other projects — bento grid */}
      <motion.div
        className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {otherProjects.map((project) => (
          <motion.div
            key={project.title}
            className="group/card relative overflow-hidden rounded-lg border border-white/[0.08] bg-gradient-to-br from-bg-secondary/70 to-bg-secondary/40 p-5 transition-all duration-500 hover:border-accent-primary/30 hover:from-bg-secondary/90 hover:to-bg-secondary/60"
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.01 }}
          >
            {/* Decorative glow */}
            <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-accent-primary/[0.03] blur-2xl transition-all duration-500 group-hover/card:bg-accent-primary/[0.08]" />

            <div className="relative">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">{project.icon}</span>
                <h4 className="text-sm font-semibold text-text-primary">
                  {project.title}
                </h4>
              </div>

              <p className="mb-2 font-mono text-[10px] tracking-wider text-accent-secondary/75">
                {project.tech}
              </p>

              <p className="mb-3 text-xs leading-relaxed text-text-secondary/90">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/[0.10] bg-white/[0.045] px-2 py-0.5 font-mono text-[9px] text-text-secondary/85 transition-colors duration-200 group-hover/card:border-accent-primary/35 group-hover/card:text-accent-secondary"
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
      <div className="mt-5 border-t border-white/[0.10] pt-4 text-center text-xs text-text-muted/75">
        <span>更多项目持续开发中 · 敬请期待</span>
      </div>
    </div>
  );
}
