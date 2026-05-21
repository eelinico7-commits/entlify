"use client";

import { useState, useEffect } from "react";

const navItems = [
  { label: "首页", href: "#hero" },
  { label: "数据", href: "#metrics" },
  { label: "项目", href: "#projects" },
  { label: "经历", href: "#journey" },
  { label: "能力", href: "#capability" },
  { label: "日记", href: "#blog" },
  { label: "联系", href: "#contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.05] bg-black/60 shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-10 sm:py-4">
        <a
          href="#hero"
          className="shrink-0 text-sm font-semibold tracking-wide text-text-primary transition-colors hover:text-accent-primary"
        >
          杨存邦
        </a>
        <ul className="flex min-w-0 items-center gap-4 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-mono text-[9px] tracking-[0.15em] text-text-muted transition-colors duration-300 hover:text-accent-primary uppercase sm:text-[10px]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
