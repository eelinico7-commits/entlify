import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-bg-card p-8 shadow-card transition-all duration-500 ease-in-out hover:scale-[1.01] hover:border-white/[0.12] hover:shadow-[0_0_80px_rgba(168,134,68,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}
