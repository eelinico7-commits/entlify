"use client";

import { useState, useEffect } from "react";

const navItems = [
  { label: "首页", href: "#hero" },
  { label: "经历", href: "#experience" },
  { label: "优势", href: "#advantages" },
  { label: "技能", href: "#skills" },
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
          ? "border-b border-white/[0.05] bg-black/50 shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a
          href="#hero"
          className="text-sm font-semibold tracking-wide text-text-primary transition-colors hover:text-accent-primary"
        >
          杨存邦
        </a>
        <ul className="flex items-center gap-6 sm:gap-10">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-mono text-[10px] tracking-[0.15em] text-text-muted transition-colors duration-300 hover:text-accent-primary uppercase"
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
