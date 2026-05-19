"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** Parallax offset factor. Positive = moves up slower, negative = faster. Default 0.15 */
  offset?: number;
}

export default function ParallaxSection({
  children,
  className = "",
  offset = 0.15,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset * 100, -offset * 100]);

  return (
    <section ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </section>
  );
}
