"use client";

import { useState } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import TechStack from "@/components/sections/TechStack";
import Timeline from "@/components/sections/Timeline";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Services from "@/components/sections/Services";
import Achievements from "@/components/sections/Achievements";
import Gallery from "@/components/sections/Gallery";
import Blog from "@/components/sections/Blog";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} />

      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <TechStack />
            <Timeline />
            <Projects />
            <Certifications />
            <Services />
            <Achievements />
            <Gallery />
            <Blog />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
