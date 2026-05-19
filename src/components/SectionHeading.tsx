"use client";

import { motion } from "framer-motion";
import { scrollReveal } from "@/lib/animations";

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  number,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <motion.div
      className="mb-12 md:mb-16"
      variants={scrollReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Section number */}
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.25em] text-accent-primary/50 uppercase">
          / {number}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-accent-primary/20 to-transparent" />
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary/70 sm:text-base">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
