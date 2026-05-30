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
      className="mb-16 md:mb-24"
      variants={scrollReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Section number */}
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-xs tracking-[0.12em] text-text-muted uppercase">
          / {number}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-black/[0.10] to-transparent" />
      </div>

      {/* Title */}
      <h2 className="text-[2.25rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text-primary sm:text-[2.75rem] md:text-5xl">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-6 max-w-2xl text-base leading-[1.85] text-text-secondary/85 sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
