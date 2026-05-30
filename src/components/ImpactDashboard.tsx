"use client";

import { motion } from "framer-motion";
import { scrollReveal } from "@/lib/animations";
import CountUp from "./CountUp";

interface MetricItem {
  value: string;
  numeric: number;
  suffix: string;
  label: string;
  sublabel: string;
}

const metrics: MetricItem[] = [
  { value: "17", numeric: 17, suffix: "条", label: "17", sublabel: "抖音校园IP内容" },
  { value: "8.9W+", numeric: 8.9, suffix: "W+", label: "8.9W+", sublabel: "抖音累计播放" },
  { value: "18", numeric: 18, suffix: "篇", label: "18", sublabel: "小红书校园IP内容" },
  { value: "1.9W+", numeric: 1.9, suffix: "W+", label: "1.9W+", sublabel: "小红书累计阅读" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] },
  }),
};

export default function ImpactDashboard() {
  return (
    <motion.section
      id="metrics"
      className="relative mx-auto mb-32 mt-0 max-w-6xl px-6 sm:px-10"
      variants={scrollReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Section label */}
      <div className="mb-10 flex items-center gap-3">
        <span className="font-mono text-xs tracking-[0.12em] text-text-muted uppercase">
          / RECORDS
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-black/[0.10] to-transparent" />
      </div>

      {/* Achievement wall */}
      <div className="relative rounded-2xl border-y border-black/[0.08] bg-white/35 py-8">
        <div className="relative grid grid-cols-2 gap-y-8 sm:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="group relative px-5 sm:px-7"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
            >
              <div className="relative border-l border-black/[0.08] pl-4 sm:pl-5">
                {/* Big number */}
                <p className="font-mono text-4xl font-semibold tracking-[-0.03em] text-text-primary sm:text-5xl">
                  {m.suffix === "%" || m.suffix === "W+" ? (
                    <>
                      <CountUp end={m.numeric} decimals={m.suffix === "W+" ? 1 : 0} />
                      {m.suffix}
                    </>
                  ) : m.suffix === "+" ? (
                    <>
                      <CountUp end={m.numeric} />
                      <span className="text-accent-secondary/90">+</span>
                    </>
                  ) : (
                    <>
                      <CountUp end={m.numeric} />
                      <span className="ml-0.5 text-xl font-light text-accent-secondary/85 sm:text-2xl">
                        {m.suffix}
                      </span>
                    </>
                  )}
                </p>

                {/* Label */}
                <p className="mt-3 text-sm leading-[1.7] text-text-secondary/85">
                  {m.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
