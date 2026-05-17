"use client";

import { motion } from "framer-motion";
import Card from "./Card";

const sampleArticle = {
  title: "从医学生到 AI 开发者：我的跨界之路",
  excerpt:
    "一个预防医学学生如何走上 AIGC 开发之路？本文分享我的学习路径、工具栈与成长心得。",
  date: "2026 年 5 月",
  readTime: "5 min",
};

export default function CreatorHub() {
  return (
    <Card>
      {/* Title */}
      <div className="mb-4 flex items-center gap-3">
        <span className="text-xl">📝</span>
        <h3 className="text-sm font-medium tracking-widest uppercase text-text-muted">
          破局日记
        </h3>
      </div>

      {/* Subtitle */}
      <p className="mb-5 text-sm leading-relaxed text-text-secondary">
        面向学生群体，专注 AI 工具与个人成长。
        <br />
        <span className="text-gradient text-xs">记录每一次破局时刻</span>
      </p>

      {/* Article card */}
      <motion.div
        className="group/article relative overflow-hidden rounded-2xl bg-bg-secondary/40 p-5 transition-all duration-300 ease-in-out hover:bg-bg-secondary/70"
        whileHover={{ scale: 1.02 }}
      >
        {/* Decorative glow */}
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-primary/5 blur-2xl transition-all duration-500 group-hover/article:bg-accent-primary/10" />

        {/* Article label */}
        <div className="relative mb-3 flex items-center gap-2">
          <span className="rounded-full bg-accent-primary/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-accent-primary/80">
            精选文章
          </span>
          <span className="text-[10px] text-text-muted/60">
            {sampleArticle.date} · {sampleArticle.readTime}
          </span>
        </div>

        {/* Title */}
        <h4 className="relative mb-2 text-sm font-semibold text-text-primary">
          {sampleArticle.title}
        </h4>

        {/* Excerpt */}
        <p className="relative text-xs leading-relaxed text-text-secondary/70">
          {sampleArticle.excerpt}
        </p>

        {/* Read more */}
        <div className="relative mt-3 flex items-center gap-1 text-xs font-medium text-text-muted transition-all duration-300 group-hover/article:text-accent-primary">
          阅读更多
          <span className="inline-block transition-transform duration-300 group-hover/article:translate-x-1">
            →
          </span>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-auto pt-5 text-center text-xs text-text-muted/40">
        持续更新中 · 敬请关注
      </div>
    </Card>
  );
}
