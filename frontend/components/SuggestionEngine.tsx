"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, Gift, TrendingUp, ShoppingBag } from "lucide-react"

export default function SuggestionEngine() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const suggestionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".suggestion-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate suggestion container
      gsap.from(suggestionRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate calendar
      gsap.from(".calendar", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: suggestionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate calendar events
      gsap.from(".calendar-event", {
        scale: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: suggestionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      })

      // Animate product cards
      gsap.from(".product-suggestion", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: suggestionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      })

      // Confetti animation for holidays
      const confettiContainer = document.querySelector(".confetti-container")
      if (confettiContainer) {
        for (let i = 0; i < 50; i++) {
          const confetti = document.createElement("div")
          confetti.className = "confetti"
          confetti.style.left = `${Math.random() * 100}%`
          confetti.style.width = `${Math.random() * 8 + 2}px`
          confetti.style.height = `${Math.random() * 4 + 2}px`
          confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`
          confetti.style.opacity = "0"
          confettiContainer.appendChild(confetti)

          gsap.to(confetti, {
            y: 100,
            opacity: 0.8,
            duration: 1,
            delay: Math.random() * 2,
            repeat: -1,
            repeatDelay: Math.random() * 3 + 1,
            ease: "power1.out",
          })
        }
      }
    }, sectionRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <section ref={sectionRef} id="suggestions" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="suggestion-title text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Suggestion Engine + Calendar
        </h2>

        <div
          ref={suggestionRef}
          className="relative bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-cyan-900/50 p-6 shadow-2xl shadow-cyan-900/20 max-w-6xl mx-auto overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Smart Calendar */}
            <div className="lg:w-1/2">
              <h3 className="text-xl font-bold text-white mb-6">Smart Calendar</h3>

              <div className="calendar bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-white">November 2023</h4>
                  <div className="flex items-center">
                    <button className="p-1 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors mr-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="p-1 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                    <div key={index} className="text-center text-gray-400 text-sm font-medium">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {[...Array(35)].map((_, index) => {
                    const day = index - 2 // Adjust for month start
                    const isCurrentMonth = day > 0 && day <= 30
                    const isToday = day === 15
                    const hasEvent = [5, 11, 24, 27].includes(day)
                    const isHoliday = day === 23

                    return (
                      <div
                        key={index}
                        className={`relative h-12 rounded-lg flex items-center justify-center ${
                          isCurrentMonth
                            ? isToday
                              ? "bg-cyan-900/30 text-cyan-300 font-bold"
                              : hasEvent
                                ? "bg-gray-700/50 text-white"
                                : isHoliday
                                  ? "bg-purple-900/30 text-purple-300"
                                  : "bg-gray-800 text-gray-300"
                            : "bg-transparent text-gray-600"
                        }`}
                      >
                        {isCurrentMonth && (
                          <>
                            <span>{day}</span>
                            {hasEvent && (
                              <div className="calendar-event absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                            )}
                            {isHoliday && (
                              <div className="confetti-container absolute inset-0 overflow-hidden pointer-events-none"></div>
                            )}
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 space-y-3">
                  <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-lg bg-purple-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                        <Gift className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-white">Thanksgiving Day</h5>
                        <p className="text-xs text-gray-400 mt-1">
                          November 23 - Expected 120% increase in kitchenware sales
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-lg bg-cyan-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                        <ShoppingBag className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-white">Black Friday</h5>
                        <p className="text-xs text-gray-400 mt-1">
                          November 24 - Prepare for 215% increase in all categories
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-lg bg-blue-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                        <Calendar className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-white">Cyber Monday</h5>
                        <p className="text-xs text-gray-400 mt-1">
                          November 27 - Focus on electronics and digital products
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Recommendations */}
            <div className="lg:w-1/2">
              <h3 className="text-xl font-bold text-white mb-6">AI Product Recommendations</h3>

              <div className="space-y-4">
                <div className="product-suggestion bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-cyan-700 transition-colors group">
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded-lg bg-gray-700 flex items-center justify-center mr-4 overflow-hidden">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt="Wireless Headphones"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">
                        Wireless Headphones
                      </h4>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-sm text-green-400">+42% demand for Black Friday</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">Recommended stock: 120 units (currently 24)</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      <span className="text-white font-medium">$89.99</span> / unit
                    </div>
                    <button className="px-3 py-1.5 bg-cyan-900/50 rounded-lg text-cyan-300 text-sm hover:bg-cyan-800/50 transition-colors">
                      Order More
                    </button>
                  </div>
                </div>

                <div className="product-suggestion bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-purple-700 transition-colors group">
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded-lg bg-gray-700 flex items-center justify-center mr-4 overflow-hidden">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt="Smart Watch"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white group-hover:text-purple-400 transition-colors">
                        Smart Watch Pro
                      </h4>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-sm text-green-400">+38% demand for Cyber Monday</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">Recommended stock: 85 units (currently 12)</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      <span className="text-white font-medium">$199.99</span> / unit
                    </div>
                    <button className="px-3 py-1.5 bg-purple-900/50 rounded-lg text-purple-300 text-sm hover:bg-purple-800/50 transition-colors">
                      Order More
                    </button>
                  </div>
                </div>

                <div className="product-suggestion bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-blue-700 transition-colors group">
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded-lg bg-gray-700 flex items-center justify-center mr-4 overflow-hidden">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt="Bluetooth Speaker"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
                        Bluetooth Speaker
                      </h4>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-sm text-green-400">+25% demand for Holiday Season</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">Recommended stock: 60 units (currently 36)</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      <span className="text-white font-medium">$59.99</span> / unit
                    </div>
                    <button className="px-3 py-1.5 bg-blue-900/50 rounded-lg text-blue-300 text-sm hover:bg-blue-800/50 transition-colors">
                      Order More
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <h4 className="text-lg font-medium text-white mb-3">Holiday Bundle Suggestions</h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-green-900/30 flex items-center justify-center mr-3">
                        <Gift className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-sm text-white">Tech Essentials Bundle</span>
                    </div>
                    <div className="text-sm text-green-400">+45% profit margin</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-green-900/30 flex items-center justify-center mr-3">
                        <Gift className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-sm text-white">Home Office Package</span>
                    </div>
                    <div className="text-sm text-green-400">+38% profit margin</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-green-900/30 flex items-center justify-center mr-3">
                        <Gift className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-sm text-white">Gaming Enthusiast Kit</span>
                    </div>
                    <div className="text-sm text-green-400">+52% profit margin</div>
                  </div>
                </div>

                <button className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
                  Create Custom Bundle
                </button>
              </div>
            </div>
          </div>

          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"></div>
        </div>
      </div>
    </section>
  )
}

