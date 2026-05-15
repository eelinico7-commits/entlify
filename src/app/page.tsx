"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import CyberPhilosopherPromo from "@/components/CyberPhilosopherPromo";
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
        <CyberPhilosopherPromo />

        <ImpactDashboard />

        {/* Bento Box Content Hub */}
        <section id="experience">
          <BentoGrid />
        </section>

        {/* Guestbook / Message Board */}
        <section id="guestbook" className="mt-32">
          <Guestbook />
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
