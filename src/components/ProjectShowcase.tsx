"use client";

import { motion } from "framer-motion";

const featuredProject = {
  icon: "01",
  title: "AI No-code 校园社群",
  cover: "Community / AI No-code",
  tech: "我做了什么：高校拓展、社群运营、活动组织",
  description:
    "把 AI 工具体验、个人知识库和作品集作为连接入口，推动同学从围观 AI 到实际动手。",
  tags: ["社群运营", "高校拓展", "AI No-code"],
  gradient: "from-white to-bg-secondary/55",
};

const otherProjects = [
  {
    icon: "02",
    title: "校园内容矩阵",
    cover: "Content Matrix",
    tech: "我做了什么：选题、剪辑、发布和复盘",
    description:
      "围绕校园信息差和个人成长做内容实验，抖音校园 IP 单视频最高播放达 5.2 万，23 个视频累计播放 16.5 万；小红书校园 IP 单篇阅读达 7000，23 个视频累计阅读 3.0 万。",
    tags: ["抖音", "小红书", "内容复盘"],
    gradient: "from-white to-bg-secondary/55",
  },
  {
    icon: "03",
    title: "这个个人作品集",
    cover: "Portfolio Site",
    tech: "我做了什么：用 AI 协作完成设计、开发和迭代",
    description:
      "把个人介绍、项目记录和日记整合到一个可访问的网站里，也保留了一个 Canvas 小游戏作为交互练习。",
    tags: ["Claude Code", "Next.js", "Canvas"],
    gradient: "from-white to-bg-secondary/55",
  },
  {
    icon: "04",
    title: "企业赋能 AI 命题擂台挑战赛",
    cover: "Business Plan / AI",
    tech: "三等奖 / 1000 元奖金",
    description:
      "负责商业计划书结构梳理、AI 应用场景表达与路演材料优化。",
    tags: ["AI 应用", "商业分析", "路演表达"],
    gradient: "from-white to-bg-secondary/55",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] },
  },
};

export default function ProjectShowcase() {
  return (
    <div className="flex h-full flex-col p-7 sm:p-12">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-xs tracking-[0.12em] text-text-muted">WORKS</span>
        <h3 className="text-sm font-medium tracking-[0.08em] uppercase text-text-muted/90">
          作品卡片
        </h3>
        <div className="ml-2 h-px flex-1 bg-black/[0.08]" />
      </div>

      <motion.div
        className="group/featured relative mb-8 grid overflow-hidden rounded-2xl border border-black/[0.07] bg-bg-card shadow-card transition-all duration-[280ms] ease-out hover:-translate-y-1.5 hover:border-accent-primary/25 hover:bg-[#fffaf2] hover:shadow-[0_22px_54px_rgba(64,52,39,0.12)] md:grid-cols-[0.92fr_1fr]"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="relative min-h-[260px] overflow-hidden bg-[linear-gradient(135deg,#efe3d4_0%,#fffdf8_48%,#dfd4c7_100%)]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(44,42,39,0.055)_1px,transparent_1px),linear-gradient(rgba(44,42,39,0.055)_1px,transparent_1px)] bg-[size:30px_30px] transition-transform duration-[280ms] ease-out group-hover/featured:scale-[1.03]" />
          <div className="absolute left-[18%] top-[24%] h-3 w-3 rounded-full bg-[#8e6b50]/55" />
          <div className="absolute left-[42%] top-[38%] h-2.5 w-2.5 rounded-full bg-[#697f9f]/50" />
          <div className="absolute left-[66%] top-[26%] h-3 w-3 rounded-full bg-[#88a06f]/50" />
          <div className="absolute left-[24%] top-[28%] h-px w-[42%] rotate-[13deg] bg-black/[0.12]" />
          <div className="absolute left-[43%] top-[39%] h-px w-[28%] -rotate-[15deg] bg-black/[0.10]" />
          <div className="absolute left-6 top-6 rounded-full border border-black/[0.08] bg-white/70 px-3 py-1 font-mono text-xs tracking-[0.12em] text-text-muted">
            {featuredProject.icon}
          </div>
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-black/[0.08] bg-white/78 p-5 shadow-[0_12px_30px_rgba(64,52,39,0.08)] backdrop-blur-sm transition-transform duration-[280ms] ease-out group-hover/featured:-translate-y-1">
            <p className="font-mono text-xs tracking-[0.12em] text-text-muted uppercase">
              {featuredProject.cover}
            </p>
            <div className="mt-4 h-2 w-24 rounded-full bg-text-primary/70" />
            <div className="mt-3 h-2 w-36 rounded-full bg-black/[0.10]" />
            <div className="mt-2 h-2 w-28 rounded-full bg-black/[0.08]" />
          </div>
        </div>

        <div className="relative p-7 sm:p-9">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
                <h4 className="text-2xl font-semibold leading-[1.35] text-text-primary">
                {featuredProject.title}
              </h4>
              <p className="mt-3 text-sm leading-[1.7] text-text-muted">
                {featuredProject.tech}
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-black/[0.07] bg-bg-secondary/65 px-3 py-1 font-mono text-xs tracking-[0.1em] text-text-muted uppercase">
              Project
            </span>
          </div>

          <p className="relative mb-7 max-w-2xl text-base leading-[1.85] text-text-secondary/85">
            {featuredProject.description}
          </p>

          <div className="relative flex flex-wrap gap-1.5">
            {featuredProject.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/[0.07] bg-white/70 px-3 py-1 font-mono text-xs tracking-[0.08em] text-text-secondary/80 transition-all duration-[280ms] ease-out group-hover/featured:border-accent-primary/35 group-hover/featured:bg-[#fffaf2]"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-text-primary/70 transition-all duration-[280ms] ease-out group-hover/featured:translate-x-1 group-hover/featured:text-text-primary">
            查看项目记录 →
          </span>
        </div>
      </motion.div>

      {/* Other projects — bento grid */}
      <motion.div
        className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-2"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {otherProjects.map((project) => (
          <motion.div
            key={project.title}
            className="group/card relative overflow-hidden rounded-2xl border border-black/[0.07] bg-bg-card shadow-card transition-all duration-[280ms] ease-out hover:-translate-y-1.5 hover:border-accent-primary/25 hover:bg-[#fffaf2] hover:shadow-[0_22px_54px_rgba(64,52,39,0.12)]"
            variants={itemVariants}
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-[linear-gradient(135deg,#f3eadf_0%,#fffdf8_50%,#e7ddd0_100%)]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(44,42,39,0.05)_1px,transparent_1px),linear-gradient(rgba(44,42,39,0.05)_1px,transparent_1px)] bg-[size:26px_26px] transition-transform duration-[280ms] ease-out group-hover/card:scale-[1.03]" />
              {project.icon === "02" ? (
                <>
                  <div className="absolute left-6 top-6 h-16 w-28 rounded-xl border border-black/[0.08] bg-white/65 shadow-[0_8px_20px_rgba(64,52,39,0.06)]" />
                  <div className="absolute left-12 top-12 h-16 w-28 rounded-xl border border-black/[0.08] bg-white/75 shadow-[0_8px_20px_rgba(64,52,39,0.06)]" />
                </>
              ) : (
                <>
                  <div className="absolute left-6 top-6 right-6 h-16 rounded-xl border border-black/[0.08] bg-white/70" />
                  <div className="absolute left-10 top-11 h-2 w-20 rounded-full bg-black/[0.12]" />
                  <div className="absolute left-10 top-16 h-2 w-32 rounded-full bg-black/[0.08]" />
                </>
              )}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-black/[0.07] bg-white/75 p-4 shadow-[0_10px_24px_rgba(64,52,39,0.07)] transition-transform duration-[280ms] ease-out group-hover/card:-translate-y-1">
                <p className="font-mono text-xs tracking-[0.12em] text-text-muted uppercase">
                  {project.cover}
                </p>
              </div>
            </div>

            <div className="relative p-7 sm:p-8">
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-xs tracking-[0.08em] text-text-muted">{project.icon}</span>
                <h4 className="text-xl font-semibold leading-[1.35] text-text-primary">
                  {project.title}
                </h4>
              </div>

              <p className="mb-5 text-sm leading-[1.7] text-text-muted">
                {project.tech}
              </p>

              <p className="mb-6 text-base leading-[1.85] text-text-secondary/85">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/[0.07] bg-white/70 px-3 py-1 font-mono text-xs tracking-[0.08em] text-text-secondary/80 transition-colors duration-[280ms] ease-out group-hover/card:border-accent-primary/35 group-hover/card:bg-[#fffaf2]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="mt-5 inline-flex text-xs font-medium text-text-primary/65 transition-all duration-[280ms] ease-out group-hover/card:translate-x-1 group-hover/card:text-text-primary">
                查看详情 →
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="mt-7 border-t border-black/[0.08] pt-5 text-center text-xs text-text-muted/75">
        <span>作品会慢慢增加，不急着把页面填满。</span>
      </div>
    </div>
  );
}
