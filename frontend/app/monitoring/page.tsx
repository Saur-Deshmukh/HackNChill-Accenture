"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ParticleBackground from "@/components/ParticleBackground"
import WarehouseMonitoring from "@/components/WarehouseMonitoring"
import MapsLogistics from "@/components/MapsLogistics"
import AiChatBot from "@/components/AiChatBot"

export default function MonitoringPage() {
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
        <div className="pt-20">
          <h1 className="text-4xl md:text-5xl font-bold text-center mt-10 mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Warehouse Monitoring
          </h1>
          <WarehouseMonitoring />
          <MapsLogistics />
        </div>
        <AiChatBot />
        <Footer />
      </div>
    </main>
  )
}

