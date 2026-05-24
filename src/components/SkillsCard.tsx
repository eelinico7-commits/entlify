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
    skills: ["API 工程", "Prompt Engineering", "Agent 开发"],
  },
  {
    icon: "💻",
    title: "全栈",
    skills: ["HTML / CSS", "Trae", "Agent 架构"],
  },
  {
    icon: "🎬",
    title: "媒体创作",
    skills: ["视频剪辑", "内容策划"],
  },
  {
    icon: "🧠",
    title: "知识管理",
    skills: ["Obsidian", "Zettelkasten 卡片笔记"],
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
    <div className="flex h-full flex-col p-6 sm:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-xl">🛠️</span>
        <h3 className="text-sm font-medium tracking-widest uppercase text-text-muted/90">
          工具栈
        </h3>
      </div>

      {/* Tools grid */}
      <motion.div
        className="grid grid-cols-2 gap-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {toolGroups.map((group) => (
          <motion.div
            key={group.title}
            className="group relative overflow-hidden rounded-lg border border-white/[0.08] bg-bg-secondary/55 p-4 transition-all duration-300 hover:border-accent-primary/30 hover:bg-bg-secondary/85"
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -2 }}
          >
            {/* Decorative dot */}
            <div className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-accent-primary/[0.03] blur-lg transition-all duration-500 group-hover:bg-accent-primary/[0.06]" />

            <div className="relative">
              <div className="mb-2 flex items-center gap-1.5">
                <span className="text-lg">{group.icon}</span>
                <span className="text-sm font-semibold text-text-primary">
                  {group.title}
                </span>
              </div>

              <ul className="space-y-1">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-1.5 text-xs text-text-secondary"
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
