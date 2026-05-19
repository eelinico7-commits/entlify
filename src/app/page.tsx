"use client";

import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Hero from "@/components/Hero";
import ImpactDashboard from "@/components/ImpactDashboard";
import BentoGrid from "@/components/BentoGrid";
import Guestbook from "@/components/Guestbook";
import Footer from "@/components/Footer";

const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Scroll progress bar at top */}
      <ScrollProgressBar />

      {/* Navigation */}
      <NavBar />

      {/* Interactive Particle Background */}
      <ParticleBackground />

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Hero Section — full viewport height */}
        <section id="hero">
          <Hero />
        </section>

        {/* Metrics — 数据成就条 */}
        <ImpactDashboard />

        {/* Main content hub — BentoGrid handles its own sections */}
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <BentoGrid />
        </div>

        {/* Contact / Guestbook */}
        <div id="contact">
          <Guestbook />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
