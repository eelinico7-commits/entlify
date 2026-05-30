"use client";

import { motion } from "framer-motion";
import { staggerContainer, smoothEasing } from "@/lib/animations";
import Card from "./Card";

const categories = [
  {
    icon: "🤖",
    title: "AI 工具实战",
    description: "Claude Code、DeepSeek、Gemini、智能体开发与日常工作流复盘。",
    gradient: "from-white to-bg-secondary/55",
  },
  {
    icon: "🌱",
    title: "学生成长路径",
    description: "从预防医学本科到 AI 项目实践者，记录每一步真实试错。",
    gradient: "from-white to-bg-secondary/55",
  },
  {
    icon: "🎯",
    title: "校园IP定位",
    description: "围绕校园信息差、大学生成长和个人 IP 的内容选题实验。",
    gradient: "from-white to-bg-secondary/55",
  },
  {
    icon: "⚡",
    title: "项目实践复盘",
    description: "社群拓展、商业转化、作品集搭建和小游戏开发的复盘。",
    gradient: "from-white to-bg-secondary/55",
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
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEasing },
  },
};

export default function InterestsCard() {
  return (
    <Card>
      {/* Title */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-xl">📂</span>
        <h3 className="text-sm font-medium tracking-[0.08em] uppercase text-text-muted/90">
          内容坐标
        </h3>
      </div>

      {/* Category items */}
      <motion.div
        className="flex flex-1 flex-col gap-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {categories.map((item) => (
          <motion.div
            key={item.title}
            className={`group/item relative overflow-hidden rounded-lg border border-black/[0.07] bg-gradient-to-br ${item.gradient} p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-accent-primary/20 hover:bg-bg-card hover:shadow-card-hover`}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            {/* Decorative glow */}
            <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-bg-secondary/70 blur-xl transition-all duration-500" />

            <div className="relative flex items-start gap-3">
              <span className="mt-0.5 text-xl">{item.icon}</span>
              <div>
                <h4 className="text-xl font-semibold leading-[1.35] text-text-primary">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm leading-[1.75] text-text-secondary">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="mt-6 border-t border-black/[0.08] pt-4 text-center text-xs text-text-muted/75">
        <span>从 AI 到成长，记录每一次破局</span>
      </div>
    </Card>
  );
}
