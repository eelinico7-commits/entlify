"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import JourneyCard from "./JourneyCard";
import RoleCards from "./RoleCards";
import SkillsCard from "./SkillsCard";
import CreatorHub from "./CreatorHub";
import InterestsCard from "./InterestsCard";
import ProjectShowcase from "./ProjectShowcase";

const GameCard = dynamic(() => import("./GameCard"), { ssr: false });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export default function BentoGrid() {
  return (
    <motion.div
      className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      {/* 项目展示 — 2×2 大块 */}
      <motion.div
        variants={itemVariants}
        className="card-glow rounded-2xl md:col-span-2 md:row-span-2"
      >
        <ProjectShowcase />
      </motion.div>

      {/* 教育经历 — 跨两行，紧邻项目展示 */}
      <motion.div
        variants={itemVariants}
        className="card-glow rounded-2xl md:row-span-2"
      >
        <JourneyCard />
      </motion.div>

      {/* 核心优势 */}
      <motion.div
        variants={itemVariants}
        id="advantages"
        className="card-glow rounded-2xl"
      >
        <RoleCards />
      </motion.div>

      {/* 破局日记 */}
      <motion.div variants={itemVariants} className="card-glow rounded-2xl">
        <CreatorHub />
      </motion.div>

      {/* 核心技能 — 小块 */}
      <motion.div
        variants={itemVariants}
        id="skills"
        className="card-glow rounded-2xl"
      >
        <SkillsCard />
      </motion.div>

      {/* 极客精神 */}
      <motion.div variants={itemVariants} className="card-glow rounded-2xl">
        <InterestsCard />
      </motion.div>

      {/* 飞机大战 */}
      <motion.div variants={itemVariants} className="card-glow rounded-2xl">
        <GameCard />
      </motion.div>
    </motion.div>
  );
}
