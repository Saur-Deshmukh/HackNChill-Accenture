"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Brain, BotIcon as Robot, Bell, Zap } from "lucide-react"

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".features-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate cards container
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate feature cards with 3D rotation effect
      gsap.from(".feature-card", {
        opacity: 0,
        y: 50,
        rotationY: 25,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Add hover animations for cards
      document.querySelectorAll(".feature-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            rotationY: 10,
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
          })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotationY: 0,
            scale: 1,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            duration: 0.3,
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert() // Cleanup
  }, [])

  const features = [
    {
      title: "AI Demand Forecasting",
      description:
        "Predict inventory needs with machine learning algorithms that analyze historical data, market trends, and seasonal patterns.",
      icon: <Brain className="w-8 h-8 text-cyan-400" />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Multi-Agent Negotiation",
      description:
        "AI agents automatically negotiate with suppliers to get the best prices and terms for your inventory needs.",
      icon: <Robot className="w-8 h-8 text-purple-400" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Smart Notifications",
      description: "Receive timely alerts about low stock, expiring items, price changes, and market opportunities.",
      icon: <Bell className="w-8 h-8 text-green-400" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Telegram Bot Commands",
      description:
        "Manage your inventory on the go with our powerful Telegram bot that responds to natural language commands.",
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      color: "from-yellow-500 to-orange-600",
    },
  ]

  return (
    <section ref={sectionRef} id="features" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="features-title text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Multi-Agent AI System
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800 p-6 shadow-xl transform perspective-1000 transition-all duration-300"
            >
              <div
                className={`w-16 h-16 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
              >
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>

              <p className="text-gray-400 mb-4">{feature.description}</p>

              <div className="mt-auto">
                <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center">
                  Learn more
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Animated background elements */}
              <div className="absolute bottom-0 right-0 w-20 h-20 opacity-10">{feature.icon}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-600/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full filter blur-3xl"></div>
    </section>
  )
}

