"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Hero from "@/components/Hero"
import DashboardPreview from "@/components/DashboardPreview"
import FeaturesSection from "@/components/FeaturesSection"
import CallToAction from "@/components/CallToAction"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ParticleBackground from "@/components/ParticleBackground"

export default function Home() {
  const mainRef = useRef(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Initialize any global animations
    const ctx = gsap.context(() => {
      // Add any global animations here
    }, mainRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <main ref={mainRef} className="relative min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <DashboardPreview />
        <FeaturesSection />
        <CallToAction />
        <Footer />
      </div>
    </main>
  )
}

