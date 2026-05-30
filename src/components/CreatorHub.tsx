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
    <div className="flex h-full flex-col p-7 sm:p-12">
      {/* Title */}
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-xs tracking-[0.12em] text-text-muted">NOTES</span>
        <h3 className="text-sm font-medium tracking-[0.08em] uppercase text-text-muted/90">
          破局日记
        </h3>
      </div>

      {/* Subtitle */}
      <p className="mb-10 text-base leading-[1.85] text-text-secondary">
        记录一个大学生用 AI、内容与项目实践不断升级自己的过程。
      </p>

      {/* Article cards */}
      <motion.div
        className="flex flex-1 flex-col gap-7"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {articles.map((article) => (
          <Link key={article.slug} href={`/notes/${article.slug}`}>
            <motion.div
              className="group/article relative overflow-hidden rounded-lg border border-black/[0.07] bg-bg-card p-7 backdrop-blur-sm shadow-card transition-all duration-[280ms] ease-out hover:-translate-y-1.5 hover:border-accent-primary/25 hover:bg-[#fffaf2] hover:shadow-[0_20px_48px_rgba(64,52,39,0.11)]"
              variants={itemVariants}
            >
              {/* Decorative glow */}
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-bg-secondary/70 blur-2xl transition-all duration-500" />

              {/* Label row */}
              <div className="relative mb-2 flex items-center gap-2">
                <span className="rounded-full border border-black/[0.07] bg-bg-secondary/65 px-3 py-1 font-mono text-xs font-medium tracking-[0.08em] text-text-muted">
                  {article.category}
                </span>
                <span className="text-xs leading-[1.7] text-text-muted/80">
                  {article.date} · {article.readTime}
                </span>
              </div>

              {/* Title */}
              <h4 className="relative mb-3 text-xl font-semibold leading-[1.35] text-text-primary transition-colors duration-[280ms] ease-out group-hover/article:text-[#1f1f1f]">
                {article.title}
              </h4>

              {/* Summary */}
              <p className="relative text-sm leading-[1.75] text-text-secondary/90">
                {article.summary}
              </p>

              {/* Read more */}
              <div className="relative mt-5 flex items-center gap-1 text-sm font-medium text-text-muted/70 transition-all duration-[280ms] ease-out group-hover/article:translate-x-1 group-hover/article:text-text-primary">
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
        <div className="flex flex-1 items-center justify-center text-sm text-text-muted/75">
          暂无内容，敬请期待
        </div>
      )}
      <div className="mt-auto pt-5 text-center text-xs text-text-muted/75">
        持续更新中 · 敬请关注
      </div>
    </div>
  );
}
