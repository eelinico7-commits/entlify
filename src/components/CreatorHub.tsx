"use client";

import { motion } from "framer-motion";

const articles = [
  {
    title: "一个医学生为什么开始学 AI？",
    excerpt:
      "从预防医学课里接触 AI 编程开始，我发现医学数据、机器学习和个人成长之间其实有一条被忽略的路径。",
    date: "2026 年 5 月",
    readTime: "6 min",
    category: "AI 工具实战",
  },
  {
    title: "我如何用 Claude Code 做出第一个个人网站",
    excerpt:
      "零基础搭建个人作品集，全程用 AI 辅助开发，从 Prompt 工程到传统手写代码。",
    date: "2026 年 4 月",
    readTime: "8 min",
    category: "AI 工具实战",
  },
  {
    title: "ChatGPT、Claude Code、Codex、Gemini 怎么分工？",
    excerpt:
      "我把 ChatGPT 当总设计师，Claude Code 当主力开发，Codex 当代码审查，Gemini 负责 UI 和图片分析。",
    date: "2026 年 5 月",
    readTime: "7 min",
    category: "AI 工具实战",
  },
  {
    title: "为什么我要做高三 / 准大一成长号？",
    excerpt:
      "高考不是结束，而是信息差真正拉开的开始。这个账号记录高三到大学这段路怎么少走弯路。",
    date: "2026 年 5 月",
    readTime: "6 min",
    category: "学生成长路径",
  },
  {
    title: "准大一暑假别只打游戏，先做这几件事",
    excerpt:
      "生活费、电脑、专业认知、AI 工具、个人主页和信息差，这些都会影响你大一的起点。",
    date: "2026 年 6 月",
    readTime: "5 min",
    category: "学生成长路径",
  },
  {
    title: "普通大学生如何用 AI 建立自己的作品集",
    excerpt:
      "没有设计背景、不会写太多代码，也可以借助 AI 工作流上线一个属于自己的个人品牌入口。",
    date: "2026 年 5 月",
    readTime: "7 min",
    category: "项目实践复盘",
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
        记录一个大学生用 AI、内容和项目实践升级自己的过程。
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
                {article.category}
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
