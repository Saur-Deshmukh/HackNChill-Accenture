"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate logo
      gsap.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" },
      )

      // Animate tagline with character animation (without SplitText)
      const taglineChars = taglineRef.current?.innerText.split("") || []
      if (taglineRef.current) {
        // Clear the text first
        taglineRef.current.innerHTML = ""

        // Create spans for each character
        taglineChars.forEach((char) => {
          const charSpan = document.createElement("span")
          charSpan.textContent = char
          charSpan.style.opacity = "0"
          charSpan.style.display = "inline-block"
          charSpan.style.transform = "translateY(50px) rotateX(-90deg)"
          taglineRef.current?.appendChild(charSpan)
        })

        // Animate each character span
        gsap.to(taglineRef.current.children, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.05,
          duration: 0.8,
          delay: 0.5,
        })
      }

      // Animate description
      gsap.from(descriptionRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.5,
      })

      // Animate CTA buttons
      gsap.from(".cta-button", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        delay: 1.8,
      })

      // Infinite pulse animation for scroll arrow
      gsap.to(".scroll-arrow", {
        y: 10,
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })
    }, heroRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div ref={logoRef} className="mb-8 relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 opacity-50 blur-xl"></div>
              <div className="relative z-10 text-4xl font-bold text-white">IS</div>
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-cyan-400/30 animate-pulse"></div>
          </div>

          <h1
            ref={taglineRef}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
          >
            Revolutionize Inventory with AI
          </h1>

          <p ref={descriptionRef} className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl">
            StockWise is an AI-powered inventory management system that automates forecasting, optimizes stock levels,
            and connects you to global marketplaces—all in one futuristic platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <Link
              href="/marketplace"
              className="cta-button px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Explore Marketplace</span>
              <span className="absolute inset-0 scale-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 group-hover:scale-100 transition-transform duration-500 ease-out"></span>
            </Link>

            <Link
              href="/monitoring"
              className="cta-button px-8 py-4 rounded-full bg-transparent border border-cyan-500 text-cyan-400 font-medium text-lg hover:bg-cyan-950/30 transition-colors duration-300"
            >
              View Monitoring
            </Link>
          </div>

          <div className="scroll-arrow absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <ChevronDown className="w-10 h-10 text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
    </section>
  )
}

