"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TrendingUp, Calendar, AlertTriangle, Filter } from "lucide-react"

export default function ForecastingEngine() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const forecastRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".forecast-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate forecast container
      gsap.from(forecastRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate forecast line
      gsap.from(".forecast-line", {
        strokeDashoffset: 1000,
        strokeDasharray: 1000,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: forecastRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate forecast bands
      gsap.from(".forecast-band", {
        opacity: 0,
        duration: 1,
        delay: 1,
        scrollTrigger: {
          trigger: forecastRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate data points
      gsap.from(".data-point", {
        scale: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: forecastRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })
    }, sectionRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <section ref={sectionRef} id="forecasting" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="forecast-title text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          AI Forecasting Engine
        </h2>

        <div
          ref={forecastRef}
          className="relative bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-cyan-900/50 p-6 shadow-2xl shadow-cyan-900/20 max-w-6xl mx-auto overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Forecast Chart */}
            <div className="lg:w-2/3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Sales Forecast</h3>
                <div className="flex items-center">
                  <button className="flex items-center px-3 py-1.5 bg-gray-800 rounded-lg text-gray-300 text-sm hover:bg-gray-700 transition-colors mr-2">
                    <Filter className="w-4 h-4 mr-1" />
                    <span>Filter</span>
                  </button>
                  <button className="px-3 py-1.5 bg-gray-800 rounded-lg text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                    Last 30 Days
                  </button>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 h-80 relative">
                {/* Chart grid */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 p-4">
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className="border-b border-r border-gray-700/50"></div>
                  ))}
                </div>

                {/* Forecast visualization */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {/* Historical data line */}
                  <path
                    className="forecast-line"
                    d="M0,150 C20,140 40,160 60,130 C80,100 100,120 120,110 C140,100 160,90 180,100"
                    stroke="#22D3EE"
                    strokeWidth="3"
                    fill="none"
                  />

                  {/* Forecast line */}
                  <path
                    className="forecast-line"
                    d="M180,100 C200,110 220,90 240,80 C260,70 280,60 300,50 C320,40 340,60 360,50 C380,40 400,30 400,30"
                    stroke="#A855F7"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                    fill="none"
                  />

                  {/* Forecast uncertainty band */}
                  <path
                    className="forecast-band"
                    d="M180,120 C200,130 220,110 240,100 C260,90 280,80 300,70 C320,60 340,80 360,70 C380,60 400,50 400,50"
                    fill="rgba(168, 85, 247, 0.2)"
                    stroke="none"
                  />
                  <path
                    className="forecast-band"
                    d="M180,80 C200,90 220,70 240,60 C260,50 280,40 300,30 C320,20 340,40 360,30 C380,20 400,10 400,10"
                    fill="rgba(168, 85, 247, 0.2)"
                    stroke="none"
                  />

                  {/* Data points */}
                  <circle className="data-point" cx="0" cy="150" r="4" fill="#22D3EE" />
                  <circle className="data-point" cx="40" cy="160" r="4" fill="#22D3EE" />
                  <circle className="data-point" cx="80" cy="100" r="4" fill="#22D3EE" />
                  <circle className="data-point" cx="120" cy="110" r="4" fill="#22D3EE" />
                  <circle className="data-point" cx="160" cy="90" r="4" fill="#22D3EE" />
                  <circle className="data-point" cx="180" cy="100" r="4" fill="#22D3EE" />

                  {/* Vertical line separating historical and forecast */}
                  <line x1="180" y1="0" x2="180" y2="200" stroke="#A855F7" strokeWidth="1" strokeDasharray="5,5" />
                </svg>

                {/* Chart labels */}
                <div className="absolute bottom-2 left-4 text-xs text-gray-400">Historical Data</div>
                <div className="absolute bottom-2 right-4 text-xs text-gray-400">Forecast</div>

                {/* Legend */}
                <div className="absolute top-2 right-4 bg-gray-900/70 backdrop-blur-sm rounded-md p-2 flex flex-col space-y-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-300">Actual Sales</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-300">Forecast</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500/20 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-300">Confidence Interval</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400 mr-2" />
                    <h4 className="text-lg font-medium text-white">Trend Analysis</h4>
                  </div>
                  <p className="text-sm text-gray-300">
                    Upward trend detected with 87% confidence. Seasonal pattern identified.
                  </p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-purple-400 mr-2" />
                    <h4 className="text-lg font-medium text-white">Seasonal Factors</h4>
                  </div>
                  <p className="text-sm text-gray-300">Holiday season approaching. Expected 24% increase in demand.</p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
                    <h4 className="text-lg font-medium text-white">Risk Assessment</h4>
                  </div>
                  <p className="text-sm text-gray-300">
                    Low risk of stockout (8%). High confidence in forecast accuracy.
                  </p>
                </div>
              </div>
            </div>

            {/* Forecast Details */}
            <div className="lg:w-1/3 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Forecast Details</h3>

              <div className="space-y-4">
                <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                  <h4 className="text-md font-medium text-white mb-2">Prophet Model Insights</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    AI-powered forecasting using Facebook's Prophet algorithm with custom parameters.
                  </p>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Model Accuracy:</span>
                    <span className="text-green-400">94.2%</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-white mb-3">Upcoming Events</h4>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-lg bg-purple-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                        <Calendar className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-white">Black Friday</h5>
                        <p className="text-xs text-gray-400">Nov 24 - Expected 215% increase</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-lg bg-blue-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                        <Calendar className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-white">Cyber Monday</h5>
                        <p className="text-xs text-gray-400">Nov 27 - Expected 180% increase</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-lg bg-green-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                        <Calendar className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-white">Holiday Season</h5>
                        <p className="text-xs text-gray-400">Dec 1-25 - Expected 75% increase</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-white mb-3">Recommended Actions</h4>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-sm text-gray-300">Increase inventory by 35% for top products</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-sm text-gray-300">Schedule additional warehouse staff</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-sm text-gray-300">Prepare marketing campaigns for peak days</span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                  Generate Detailed Report
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

