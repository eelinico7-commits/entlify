"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { smoothEasing } from "@/lib/animations";
import notesData from "@/data/notes.json";

export type NoteMeta = (typeof notesData)[number];

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
    transition: { duration: 0.5, ease: smoothEasing },
  },
};

export default function CreatorHub() {
  const articles = notesData as NoteMeta[];

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
        记录一个大学生用 AI、内容与项目实践不断升级自己的过程。
      </p>

      {/* Article cards */}
      <motion.div
        className="flex flex-1 flex-col gap-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {articles.map((article) => (
          <Link key={article.slug} href={`/notes/${article.slug}`}>
            <motion.div
              className="group/article relative overflow-hidden rounded-2xl bg-bg-secondary/60 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-bg-secondary/80"
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

              {/* Summary */}
              <p className="relative text-xs leading-relaxed text-text-secondary/70">
                {article.summary}
              </p>

              {/* Read more */}
              <div className="relative mt-2 flex items-center gap-1 text-xs font-medium text-text-muted/60 transition-all duration-300 group-hover/article:text-accent-primary">
                阅读更多
                <span className="inline-block transition-transform duration-300 group-hover/article:translate-x-1">
                  →
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Footer */}
      {articles.length === 0 && (
        <div className="flex flex-1 items-center justify-center text-sm text-text-muted/40">
          暂无内容，敬请期待
        </div>
      )}
      <div className="mt-auto pt-5 text-center text-xs text-text-muted/40">
        持续更新中 · 敬请关注
      </div>
    </div>
  );
}
