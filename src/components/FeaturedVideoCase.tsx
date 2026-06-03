"use client";

import { motion } from "framer-motion";
import { smoothTransition } from "@/lib/animations";

const video = {
  title: "AI 视频生成实验",
  description: "一次关于 AI 生成视频、镜头语言和内容表达的实践尝试。",
  tags: ["AI Video", "Creative Coding", "Portfolio"],
  src: "/videos/demo-video.mp4",
  poster: "/images/ai-video-poster.jpg",
};

export default function FeaturedVideoCase() {
  return (
    <motion.article
      className="card-glow group relative mt-6 overflow-hidden rounded-lg border border-black/[0.07] bg-bg-card p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary/20 hover:bg-[#fffaf2] hover:shadow-card-hover sm:p-5 lg:grid lg:grid-cols-[1.16fr_0.84fr] lg:gap-7"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={smoothTransition}
    >
      <div className="relative overflow-hidden rounded-md border border-black/[0.07] bg-[linear-gradient(135deg,#f3eadf_0%,#fffdf8_52%,#e7ddd0_100%)]">
        <video
          className="aspect-video h-full w-full bg-bg-secondary object-cover"
          controls
          preload="none"
          poster={video.poster}
          playsInline
        >
          <source src={video.src} type="video/mp4" />
        </video>
      </div>

      <div className="flex flex-col px-2 py-6 sm:px-3 lg:px-0 lg:py-4">
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono text-xs tracking-[0.12em] text-text-muted">
            FEATURED VIDEO
          </span>
          <div className="h-px flex-1 bg-black/[0.08]" />
        </div>

        <h3 className="text-2xl font-semibold leading-[1.32] text-text-primary">
          {video.title}
        </h3>
        <p className="mt-4 text-sm leading-[1.85] text-text-secondary/90">
          {video.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/[0.07] bg-white/70 px-3 py-1 font-mono text-xs tracking-[0.08em] text-text-secondary/80 transition-colors duration-300 group-hover:border-accent-primary/30 group-hover:bg-white"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={video.src}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-black/[0.10] bg-white/75 px-5 py-2.5 text-sm font-medium text-text-primary shadow-[0_10px_24px_rgba(64,52,39,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-primary/25 hover:bg-white"
        >
          播放视频
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </a>
      </div>
    </motion.article>
  );
}
