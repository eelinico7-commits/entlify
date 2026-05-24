"use client";

import { motion } from "framer-motion";
import { staggerContainer, smoothEasing } from "@/lib/animations";
import Card from "./Card";

const categories = [
  {
    icon: "🤖",
    title: "AI 工具实战",
    description: "AI 工具使用技巧、AI 工作流搭建、AI 项目实践经验分享。",
    gradient: "from-accent-primary/[0.08] to-accent-secondary/[0.04]",
  },
  {
    icon: "🌱",
    title: "学生成长路径",
    description: "高考后、准大一、大学生活、信息差和成长选择，记录每一步破局。",
    gradient: "from-accent-warm/[0.08] to-accent-gold/[0.04]",
  },
  {
    icon: "🎯",
    title: "个人IP定位",
    description: "AI 自媒体号与高三/准大一号的双线定位，个人品牌建设思考。",
    gradient: "from-accent-blue/[0.08] to-accent-primary/[0.04]",
  },
  {
    icon: "⚡",
    title: "项目实践复盘",
    description: "从零到一的项目经验复盘，技术选型、卡点解决与交付思考。",
    gradient: "from-accent-gold/[0.08] to-accent-primary/[0.04]",
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
        <h3 className="text-sm font-medium tracking-widest uppercase text-text-muted/90">
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
            className={`group/item relative overflow-hidden rounded-lg border border-white/[0.08] bg-gradient-to-br ${item.gradient} p-4 transition-all duration-300 ease-in-out hover:border-accent-primary/30 hover:bg-bg-secondary/70`}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            {/* Decorative glow */}
            <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-accent-primary/[0.04] blur-xl transition-all duration-500 group-hover/item:bg-accent-primary/[0.08]" />

            <div className="relative flex items-start gap-3">
              <span className="mt-0.5 text-xl">{item.icon}</span>
              <div>
                <h4 className="text-sm font-semibold text-text-primary">
                  {item.title}
                </h4>
                <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="mt-5 border-t border-white/[0.10] pt-4 text-center text-xs text-text-muted/75">
        <span className="text-gradient-warm">从 AI 到成长，记录每一次破局</span>
      </div>
    </Card>
  );
}
