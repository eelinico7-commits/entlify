"use client";

import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import ImpactDashboard from "@/components/ImpactDashboard";
import BentoGrid from "@/components/BentoGrid";

const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Navigation */}
      <NavBar />

      {/* Interactive Particle Background */}
      <ParticleBackground />

      {/* Content Layer */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 sm:px-10">
        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>

        {/* Data Impact Dashboard */}
        <ImpactDashboard />

        {/* Bento Box Content Hub */}
        <section id="experience">
          <BentoGrid />
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-32 border-t border-white/[0.03] py-12 text-center">
        <p className="text-xs tracking-widest uppercase text-text-muted/30">
          Built with Next.js · Three.js · Framer Motion
        </p>
        <p className="mt-3 text-xs text-text-muted/20">
          &copy; {new Date().getFullYear()} Yang Cunbang. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
