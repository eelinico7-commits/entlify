"use client";

import { motion } from "framer-motion";
import { staggerContainer, smoothTransition, smoothEasing } from "@/lib/animations";
import Card from "./Card";

const interests = [
  {
    icon: "🖥️",
    title: "硬件 DIY",
    description: "装机、超频、硬件调试，享受亲手打造的性能跃升。",
    gradient: "from-accent-primary/[0.08] to-accent-secondary/[0.04]",
  },
  {
    icon: "🎮",
    title: "竞技游戏",
    description: "策略规划与即时反应，在竞技中磨练决策力。",
    gradient: "from-accent-warm/[0.08] to-accent-gold/[0.04]",
  },
  {
    icon: "🤖",
    title: "AI 编码边界",
    description: "探索 AI 辅助编程的极限，用工具解放创造力。",
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
        <span className="text-xl">⚡</span>
        <h3 className="text-sm font-medium tracking-widest uppercase text-text-muted">
          极客精神
        </h3>
      </div>

      {/* Interest items */}
      <motion.div
        className="flex flex-1 flex-col gap-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {interests.map((item) => (
          <motion.div
            key={item.title}
            className={`group/item relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} p-4 transition-all duration-300 ease-in-out hover:bg-bg-secondary/60`}
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
      <div className="mt-5 border-t border-white/[0.04] pt-4 text-center text-xs text-text-muted/40">
        <span className="text-gradient-warm">Keep exploring, keep breaking limits</span>
      </div>
    </Card>
  );
}
