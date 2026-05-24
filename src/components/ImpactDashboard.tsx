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
  { value: "1500+", numeric: 1500, suffix: "+", label: "1500", sublabel: "社群成员" },
  { value: "13", numeric: 13, suffix: "所", label: "13", sublabel: "覆盖高校" },
  { value: "5.3W+", numeric: 5.3, suffix: "W+", label: "5.3W+", sublabel: "内容播放" },
  { value: "12%", numeric: 12, suffix: "%", label: "12%", sublabel: "销售转化率" },
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

const glowColors = [
  "from-accent-green/30 via-accent-green/10 to-transparent",
  "from-accent-primary/30 via-accent-primary/10 to-transparent",
  "from-accent-blue/30 via-accent-blue/10 to-transparent",
  "from-accent-warm/30 via-accent-warm/10 to-transparent",
];

export default function ImpactDashboard() {
  return (
    <motion.section
      id="metrics"
      className="relative mx-auto mb-28 mt-10 max-w-5xl px-6 sm:px-10"
      variants={scrollReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Section label */}
      <div className="mb-8 flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.22em] text-accent-secondary/80 uppercase">
          / 01
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-accent-primary/40 to-transparent" />
      </div>

      {/* Achievement wall */}
      <div className="relative">
        {/* Background ambient glow */}
        <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-b from-accent-primary/[0.055] to-transparent blur-2xl" />

        <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="group relative overflow-hidden rounded-lg border border-white/[0.10] bg-gradient-to-b from-bg-card to-bg-card/75 p-5 shadow-card transition-all duration-500 hover:border-accent-primary/35 sm:p-6"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              {/* Hover glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${glowColors[i]} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              {/* Corner decoration */}
              <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-white/[0.03] blur-xl transition-all duration-500 group-hover:scale-150" />

              {/* Content */}
              <div className="relative">
                {/* Big number */}
                <p className="font-mono text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
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
                <p className="mt-1.5 text-xs text-text-secondary/85 sm:text-sm">
                  {m.sublabel}
                </p>
              </div>

              {/* Bottom decorative line */}
              <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 bg-gradient-to-r from-accent-primary/60 via-accent-primary/20 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
