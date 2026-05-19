"use client";

import { motion } from "framer-motion";

const articles = [
  {
    title: "一个医学生为什么开始学 AI？",
    excerpt:
      "从预防医学课堂到 AI 编程，这不是一时兴起——是发现了医学数据与机器学习之间那条被忽略的捷径。",
    date: "2026 年 5 月",
    readTime: "6 min",
  },
  {
    title: "我如何用 Claude Code 做出第一个个人网站",
    excerpt:
      "零基础搭建全栈个人作品集，全程 AI 驱动开发——Prompt 工程如何替代传统手写代码。",
    date: "2026 年 4 月",
    readTime: "8 min",
  },
  {
    title: "普通大学生如何用 AI 建立自己的作品集",
    excerpt:
      "没有设计背景、不会写代码？这套 AI 工作流让你一周内上线一个让人眼前一亮的个人品牌站。",
    date: "2026 年 4 月",
    readTime: "5 min",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] },
  },
};

export default function CreatorHub() {
  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      {/* Title */}
      <div className="mb-4 flex items-center gap-3">
        <span className="text-xl">📝</span>
        <h3 className="text-sm font-medium tracking-widest uppercase text-text-muted">
          破局日记
        </h3>
      </div>

      {/* Subtitle */}
      <p className="mb-6 text-sm leading-relaxed text-text-secondary">
        面向学生群体，专注 AI 工具与个人成长。
        <br />
        <span className="text-gradient text-xs">记录每一次破局时刻</span>
      </p>

      {/* Article cards */}
      <motion.div
        className="flex flex-1 flex-col gap-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {articles.map((article, i) => (
          <motion.div
            key={article.title}
            className="group/article relative overflow-hidden rounded-2xl bg-bg-secondary/40 p-5 transition-all duration-300 hover:bg-bg-secondary/70"
            variants={itemVariants}
            whileHover={{ x: 4 }}
          >
            {/* Decorative glow */}
            <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-accent-primary/5 blur-2xl transition-all duration-500 group-hover/article:bg-accent-primary/10" />

            {/* Label row */}
            <div className="relative mb-2 flex items-center gap-2">
              <span className="rounded-full bg-accent-primary/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-accent-primary/80">
                {i === 0 ? "最新" : "精选"}
              </span>
              <span className="text-[10px] text-text-muted/50">
                {article.date} · {article.readTime}
              </span>
            </div>

            {/* Title */}
            <h4 className="relative mb-2 text-sm font-semibold text-text-primary">
              {article.title}
            </h4>

            {/* Excerpt */}
            <p className="relative text-xs leading-relaxed text-text-secondary/70">
              {article.excerpt}
            </p>

            {/* Read more */}
            <div className="relative mt-2 flex items-center gap-1 text-xs font-medium text-text-muted/60 transition-all duration-300 group-hover/article:text-accent-primary">
              阅读更多
              <span className="inline-block transition-transform duration-300 group-hover/article:translate-x-1">
                →
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="mt-auto pt-5 text-center text-xs text-text-muted/40">
        持续更新中 · 敬请关注
      </div>
    </div>
  );
}
