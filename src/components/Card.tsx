import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`group flex h-full flex-col rounded-lg border border-black/[0.07] bg-bg-card p-7 shadow-card transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-accent-primary/20 hover:shadow-card-hover sm:p-10 ${className}`}
    >
      {children}
    </div>
  );
}
