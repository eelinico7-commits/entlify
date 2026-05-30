"use client";

import { motion } from "framer-motion";
import { smoothEasing } from "@/lib/animations";

interface SkillGroup {
  icon: string;
  title: string;
  skills: string[];
}

const toolGroups: SkillGroup[] = [
  {
    icon: "🤖",
    title: "AIGC",
    skills: ["Prompt 优化", "API 接入", "智能体开发"],
  },
  {
    icon: "💻",
    title: "产品实践",
    skills: ["Claude Code", "网站搭建", "Canvas 小游戏"],
  },
  {
    icon: "🎬",
    title: "内容创作",
    skills: ["校园选题", "视频剪辑", "IP 运营"],
  },
  {
    icon: "🧠",
    title: "校园实践",
    skills: ["社群运营", "资源拓展", "线下推广"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: smoothEasing },
  },
};

export default function SkillsCard() {
  return (
    <div className="flex h-full flex-col p-7 sm:p-12">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-xs tracking-[0.12em] text-text-muted">STACK</span>
        <h3 className="text-sm font-medium tracking-[0.08em] uppercase text-text-muted/90">
          技能标签
        </h3>
      </div>

      {/* Tools grid */}
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {toolGroups.map((group) => (
          <motion.div
            key={group.title}
            className="group relative overflow-hidden rounded-lg border border-black/[0.07] bg-bg-card p-5 shadow-card transition-all duration-[280ms] ease-out hover:-translate-y-1.5 hover:border-accent-primary/25 hover:bg-[#fffaf2] hover:shadow-[0_20px_48px_rgba(64,52,39,0.11)]"
            variants={itemVariants}
          >
            {/* Decorative dot */}
            <div className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-bg-secondary/70 blur-lg transition-all duration-500" />

            <div className="relative">
              <div className="mb-2 flex items-center gap-1.5">
                <span className="text-lg transition-transform duration-[280ms] ease-out group-hover:-translate-y-0.5">{group.icon}</span>
                <span className="text-xl font-semibold leading-[1.35] text-text-primary">
                  {group.title}
                </span>
              </div>

              <ul className="space-y-1">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-1.5 text-sm leading-[1.8] text-text-secondary"
                  >
                    <span className="inline-block h-1 w-1 rounded-full bg-accent-primary/50" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
