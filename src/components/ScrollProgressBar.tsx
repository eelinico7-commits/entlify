"use client";

import { useScrollProgress } from "@/lib/useScrollProgress";

export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
      <div
        className="h-full bg-gradient-to-r from-accent-green via-accent-primary to-accent-blue transition-all duration-150 ease-out"
        style={{
          width: `${progress * 100}%`,
          opacity: progress > 0.01 ? 1 : 0,
        }}
      />
    </div>
  );
}
