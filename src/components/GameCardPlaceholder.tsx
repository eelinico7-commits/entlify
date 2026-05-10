"use client";

import { motion } from "framer-motion";

export default function GameCardPlaceholder() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border-color bg-bg-card p-6 shadow-card transition-colors hover:border-border-hover hover:bg-bg-card-hover">
      {/* 标题 */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl">🎮</span>
        <h3 className="text-lg font-semibold text-text-primary">飞机大战</h3>
      </div>

      {/* 游戏启动区域 */}
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          className="group flex cursor-pointer flex-col items-center gap-2"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        >
          {/* 按钮 */}
          <motion.div
            className="flex h-32 w-32 items-center justify-center rounded-full border border-accent-primary/30 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/10 shadow-glow"
            animate={{
              boxShadow: [
                "0 0 20px rgba(108,92,231,0.15)",
                "0 0 40px rgba(108,92,231,0.3)",
                "0 0 20px rgba(108,92,231,0.15)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-lg font-bold text-accent-secondary">
              点击启航
            </span>
          </motion.div>

          {/* 提示文字 */}
          <div className="mt-3 text-center">
            <span className="inline-block rounded-full bg-bg-secondary/60 px-3 py-1 text-[10px] text-text-muted">
              手势控制 · Canvas 游戏
            </span>
          </div>
        </motion.div>
      </div>

      {/* 底部提示 */}
      <div className="mt-4 text-center text-xs text-text-muted">
        即将上线，敬请期待
      </div>
    </div>
  );
}
