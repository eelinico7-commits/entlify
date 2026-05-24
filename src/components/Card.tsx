import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`group flex h-full flex-col rounded-lg border border-white/[0.10] bg-gradient-to-b from-bg-card to-bg-card/85 p-8 shadow-card transition-all duration-500 ease-in-out hover:scale-[1.005] hover:border-accent-primary/30 hover:shadow-[0_0_70px_var(--accent-glow)] ${className}`}
    >
      {children}
    </div>
  );
}
