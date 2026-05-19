"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { scrollReveal, scrollStagger } from "@/lib/animations";
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

/* ── Section animation ── */
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
          FEATURED PROJECT
          ======================================== */}
      <motion.div
        id="projects"
        className="mb-24"
        variants={scrollReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <SectionHeading
          number="02"
          title="主推项目"
          subtitle="当前重点打造的项目，融合 AI 与医学人文视角"
        />

        {/* Hero-style project card — 赛博先哲 */}
        <CyberPhilosopherPromo />

        {/* Featured project detail — personal website */}
        <div className="card-glow mt-6 rounded-2xl">
          <ProjectShowcase />
        </div>
      </motion.div>

      {/* ========================================
          JOURNEY TIMELINE
          ======================================== */}
      <motion.div
        id="journey"
        className="mb-24"
        variants={scrollReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <SectionHeading
          number="03"
          title="经历 & 轨迹"
          subtitle="从医学生到 AI 探索者的成长路径"
        />

        <div className="card-glow rounded-2xl">
          <JourneyCard />
        </div>
      </motion.div>

      {/* ========================================
          CAPABILITY SYSTEM
          ======================================== */}
      <motion.section
        id="capability"
        className="mb-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        <SectionHeading
          number="04"
          title="能力系统"
          subtitle="跨学科能力矩阵 —— 从商业运营到技术落地"
        />

        <motion.div
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
          variants={sectionVariants}
        >
          {/* Core advantages — spans 2 cols */}
          <motion.div
            variants={gridItem}
            className="card-glow rounded-2xl lg:col-span-2"
          >
            <RoleCards />
          </motion.div>

          {/* Skills — 1 col */}
          <motion.div variants={gridItem} className="card-glow rounded-2xl">
            <SkillsCard />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ========================================
          BLOG / NOTES
          ======================================== */}
      <motion.section
        id="blog"
        className="mb-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        <SectionHeading
          number="05"
          title="破局日记"
          subtitle="记录每一次跨界思考和破局时刻"
        />

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={sectionVariants}
        >
          {/* 破局日记 main */}
          <motion.div
            variants={gridItem}
            className="card-glow rounded-2xl md:col-span-2"
          >
            <CreatorHub />
          </motion.div>

          {/* 极客精神 */}
          <motion.div variants={gridItem} className="card-glow rounded-2xl">
            <InterestsCard />
          </motion.div>

          {/* 飞机大战游戏 */}
          <motion.div
            variants={gridItem}
            className="card-glow rounded-2xl md:col-span-2 lg:col-span-1"
          >
            <GameCard />
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
}
