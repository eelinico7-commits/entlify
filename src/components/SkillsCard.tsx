"use client";

import { motion } from "framer-motion";
import { smoothTransition, smoothEasing } from "@/lib/animations";
import Card from "./Card";

interface SkillGroup {
  icon: string;
  title: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
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
    <Card>
      {/* Title */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-xl">🛠️</span>
        <h3 className="text-sm font-medium tracking-widest uppercase text-text-muted">
          核心技能 & 工具箱
        </h3>
      </div>

      {/* Skills grid */}
      <motion.div
        className="grid grid-cols-2 gap-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skillGroups.map((group) => (
          <motion.div
            key={group.title}
            className="rounded-2xl bg-bg-secondary/40 p-4 transition-all duration-300 ease-in-out hover:bg-bg-secondary/70"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
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
          </motion.div>
        ))}
      </motion.div>
    </Card>
  );
}
