"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import JourneyCard from "./JourneyCard";
import RoleCards from "./RoleCards";
import SkillsCard from "./SkillsCard";
import CreatorHub from "./CreatorHub";
import InterestsCard from "./InterestsCard";

const GameCard = dynamic(() => import("./GameCard"), { ssr: false });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 18 },
  },
};

export default function BentoGrid() {
  return (
    <motion.div
      className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* 教育经历 — 跨两行 */}
      <motion.div variants={itemVariants} className="md:row-span-2">
        <JourneyCard />
      </motion.div>

      {/* 领导力角色 */}
      <motion.div variants={itemVariants}>
        <RoleCards />
      </motion.div>

      {/* 核心技能 */}
      <motion.div variants={itemVariants}>
        <SkillsCard />
      </motion.div>

      {/* 破局日记 */}
      <motion.div variants={itemVariants}>
        <CreatorHub />
      </motion.div>

      {/* 极客精神 */}
      <motion.div variants={itemVariants}>
        <InterestsCard />
      </motion.div>

      {/* 飞机大战 — 占位 */}
      <motion.div variants={itemVariants}>
        <GameCard />
      </motion.div>
    </motion.div>
  );
}
