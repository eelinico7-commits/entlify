"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { scrollReveal } from "@/lib/animations";
import JourneyCard from "./JourneyCard";
import RoleCards from "./RoleCards";
import SkillsCard from "./SkillsCard";
import CreatorHub from "./CreatorHub";
import InterestsCard from "./InterestsCard";
import ProjectShowcase from "./ProjectShowcase";
import CyberPhilosopherPromo from "./CyberPhilosopherPromo";
import SectionHeading from "./SectionHeading";

const GameCard = dynamic(() => import("./GameCard"), { ssr: false });

/* ── Grid item animation ── */
const gridItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] },
  },
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export default function BentoGrid() {
  return (
    <>
      {/* ========================================
          FEATURED PROJECT — 主推大卡片
          ======================================== */}
      <motion.div
        id="projects"
        className="mb-28 md:mb-40"
        variants={scrollReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <SectionHeading
          number="02"
          title="作品"
          subtitle="一些已经做出来、还在继续迭代的项目和内容实验。"
        />

        {/* 赛博先哲 — 主推大卡片 */}
        <CyberPhilosopherPromo />

        {/* 其他项目 — Bento 网格 */}
        <div className="card-glow mt-6 rounded-lg">
          <ProjectShowcase />
        </div>
      </motion.div>

      {/* ========================================
          JOURNEY TIMELINE — 经历轨迹
          ======================================== */}
      <motion.div
        id="journey"
        className="mb-28 md:mb-40"
        variants={scrollReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <SectionHeading
          number="03"
          title="关于我"
          subtitle="比起罗列经历，我更想记录自己如何把想法做成东西。"
        />

        <div className="card-glow rounded-lg">
          <JourneyCard />
        </div>
      </motion.div>

      {/* ========================================
          CAPABILITY SYSTEM — 能力系统 + 工具栈
          ======================================== */}
      <motion.section
        id="capability"
        className="mb-28 md:mb-40"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        <SectionHeading
          number="04"
          title="我正在形成的能力"
          subtitle="不做能力清单，只保留和作品有关的几件事。"
        />

        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          variants={sectionVariants}
        >
          {/* 能力系统 — 2 cols */}
          <motion.div
            variants={gridItem}
            className="card-glow rounded-lg lg:col-span-2"
          >
            <RoleCards />
          </motion.div>

          {/* 工具栈 — 1 col */}
          <motion.div variants={gridItem} className="card-glow rounded-lg">
            <SkillsCard />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ========================================
          BLOG — 破局日记 + 极客精神
          ======================================== */}
      <motion.section
        id="blog"
        className="mb-28 md:mb-40"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        <SectionHeading
          number="05"
          title="破局日记"
          subtitle="一些关于 AI、内容和项目实践的短记录。"
        />

        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          variants={sectionVariants}
        >
          {/* 日记主区域 — 3 篇文章 */}
          <motion.div
            variants={gridItem}
            className="card-glow rounded-lg lg:col-span-2"
          >
            <CreatorHub />
          </motion.div>

          {/* 极客精神 */}
          <motion.div
            variants={gridItem}
            className="card-glow rounded-lg"
          >
            <InterestsCard />
          </motion.div>

          {/* 飞机大战 */}
          <motion.div
            variants={gridItem}
            className="card-glow rounded-lg lg:col-span-1"
          >
            <GameCard />
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
}
