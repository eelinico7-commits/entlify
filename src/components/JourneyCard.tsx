"use client";

import { motion } from "framer-motion";
import { smoothEasing } from "@/lib/animations";

const timelineItems = [
  {
    period: "About",
    title: "我是一个医学生，也在做自己的作品集",
    subtitle: "医学学习给我一个观察真实问题的入口",
    description:
      "我对 AI 工具、内容表达和项目落地都很感兴趣。比起把经历写成一串头衔，我更希望这里像一个持续更新的工作台：做过什么，踩过什么坑，下一步想怎么改。",
  },
  {
    period: "Now",
    title: "现在主要在做三件事",
    subtitle: "AI 工具实践、校园内容、社群项目",
    description:
      "用 Claude Code、DeepSeek、Gemini 等工具做可交付的小作品；围绕校园信息差做内容；也参与 AI No-code 相关的高校社群运营。",
  },
];

const methodologies = [
  {
    icon: "Content",
    title: "校园 IP 与个人 IP 双轨运营",
    description:
      "围绕校园信息差和个人成长做内容矩阵运营，抖音校园 IP 单视频最高播放达 5.2 万，23 个视频累计播放 16.5 万；小红书校园 IP 单篇阅读达 7000，23 个视频累计阅读 3.0 万，实现品牌曝光与私域转化的双线增长。",
  },
  {
    icon: "Build",
    title: "AI 工具驱动的作品产出",
    description:
      "熟练使用 DeepSeek、Claude、Gemini API 与 Prompt 优化，用 Claude Code 独立完成个人网站、飞机大战小游戏等可交互产品。",
  },
  {
    icon: "Note",
    title: "校园荣誉与组织经历",
    description:
      "CET-4、新生奖学金、英语口语赛团体一等奖这些会保留，但只作为背景，不让它们占据页面主角。",
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: smoothEasing },
  }),
};

export default function JourneyCard() {
  return (
    <div className="flex h-full flex-col p-7 sm:p-12">
      {/* Terminal-style header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-xs tracking-[0.12em] text-text-muted">
          {"//"}
        </span>
        <h3 className="font-mono text-xs tracking-[0.12em] uppercase text-text-muted/80">
          关于我
        </h3>
        <div className="ml-2 h-px flex-1 bg-black/[0.08]" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.82fr]">
        <div className="relative mb-2 pl-7">
          <div className="absolute left-[5px] top-2 h-[calc(100%-16px)] w-px bg-black/[0.10]" />
          <ul className="space-y-12">
            {timelineItems.map((item, index) => (
              <motion.li
                key={index}
                className="relative"
                custom={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="absolute -left-[26px] top-2 h-2 w-2 rounded-full bg-accent-primary/45" />
                <span className="mb-3 inline-block font-mono text-xs font-medium tracking-[0.12em] text-text-muted/85 uppercase">
                  {item.period}
                </span>
                <h4 className="mt-1 text-2xl font-semibold leading-[1.35] tracking-normal text-text-primary">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm leading-[1.7] text-accent-warm/80">{item.subtitle}</p>
                <p className="mt-5 text-base leading-[1.9] text-text-secondary/90">
                  {item.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-[linear-gradient(135deg,#f3eadf_0%,#fffdf8_48%,#e6dccf_100%)] p-6 shadow-card"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -3 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(44,42,39,0.045)_1px,transparent_1px),linear-gradient(rgba(44,42,39,0.045)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="relative">
            <p className="font-mono text-xs tracking-[0.12em] text-text-muted uppercase">
              Current Focus
            </p>
            <h4 className="mt-4 text-2xl font-semibold leading-[1.35] text-text-primary">
              做一个能长期更新的个人工作台
            </h4>
            <p className="mt-5 text-base leading-[1.85] text-text-secondary">
              它不是一次性包装出来的页面，而是我用来放作品、日记、工具实验和复盘的地方。
            </p>

            <div className="mt-8 grid gap-3">
              {["AI 工具实践", "校园内容表达", "小项目交付"].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-black/[0.07] bg-white/72 px-4 py-3 text-sm leading-[1.7] text-text-secondary"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Methodologies */}
      <div className="mt-10 border-t border-black/[0.08] pt-8">
        <span className="mb-4 inline-block font-mono text-xs tracking-[0.12em] text-text-muted/80 uppercase">
          轻量标签
        </span>
        <div className="flex flex-col gap-4">
          {methodologies.map((m, i) => (
            <motion.div
              key={m.title}
              className="rounded-lg border border-black/[0.07] bg-bg-card p-5 transition-all duration-300 hover:border-accent-primary/20 hover:bg-white"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.01, y: -2 }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-xs tracking-[0.12em] text-text-muted">{m.icon}</span>
                <h4 className="text-xl font-semibold leading-[1.35] text-text-primary">
                  {m.title}
                </h4>
              </div>
              <p className="mt-3 text-sm leading-[1.75] text-text-secondary/90">
                {m.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom flourish */}
      <div className="mt-8 border-t border-black/[0.08] pt-5 text-center text-xs text-text-muted/75">
        <span>不急着包装成完美答案，先把真实进展留下来。</span>
      </div>
    </div>
  );
}
