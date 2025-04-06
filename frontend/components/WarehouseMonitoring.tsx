"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Zap, Droplet } from "lucide-react"

export default function WarehouseMonitoring() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const monitoringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".monitoring-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate monitoring container
      gsap.from(monitoringRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate gauges
      gsap.from(".gauge-value", {
        width: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: monitoringRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate CO2 particles
      gsap.from(".co2-particle", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power1.out",
        scrollTrigger: {
          trigger: monitoringRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      })

      // Continuous animation for CO2 particles
      document.querySelectorAll(".co2-particle").forEach((particle) => {
        gsap.to(particle, {
          y: -20,
          opacity: 0,
          duration: 2,
          repeat: -1,
          delay: Math.random() * 2,
          ease: "power1.inOut",
        })
      })
    }, sectionRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <section ref={sectionRef} id="monitoring" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="monitoring-title text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Warehouse Monitoring
        </h2>

        <div
          ref={monitoringRef}
          className="relative bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-cyan-900/50 p-6 shadow-2xl shadow-cyan-900/20 max-w-6xl mx-auto overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Productivity Gauges */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Productivity Metrics</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">New York Warehouse</span>
                    <span className="text-cyan-400">94%</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="gauge-value h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                      style={{ width: "94%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">London Warehouse</span>
                    <span className="text-cyan-400">87%</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="gauge-value h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                      style={{ width: "87%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Tokyo Warehouse</span>
                    <span className="text-cyan-400">91%</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="gauge-value h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                      style={{ width: "91%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Sydney Warehouse</span>
                    <span className="text-cyan-400">82%</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="gauge-value h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <h4 className="text-lg font-medium text-white mb-4">Efficiency Comparison</h4>

                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">94%</div>
                    <div className="text-sm text-gray-400">This Month</div>
                  </div>

                  <div className="h-12 w-px bg-gray-700"></div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">89%</div>
                    <div className="text-sm text-gray-400">Last Month</div>
                  </div>

                  <div className="h-12 w-px bg-gray-700"></div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">+5%</div>
                    <div className="text-sm text-gray-400">Change</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Energy Usage */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Energy & Sustainability</h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center mb-2">
                    <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                    <h4 className="text-lg font-medium text-white">Electricity</h4>
                  </div>
                  <div className="text-2xl font-bold text-white">24.7 kWh</div>
                  <div className="text-sm text-green-400 mt-1">-12% from last month</div>
                </div>

                <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center mb-2">
                    <Droplet className="w-5 h-5 text-blue-400 mr-2" />
                    <h4 className="text-lg font-medium text-white">Water</h4>
                  </div>
                  <div className="text-2xl font-bold text-white">1,240 L</div>
                  <div className="text-sm text-green-400 mt-1">-8% from last month</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-white mb-4">CO2 Emissions</h4>

                <div className="relative h-32 bg-gray-700/50 rounded-lg border border-gray-600 overflow-hidden">
                  {/* CO2 particles */}
                  {[...Array(20)].map((_, index) => (
                    <div
                      key={index}
                      className="co2-particle absolute w-3 h-3 rounded-full bg-gray-500/50"
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        bottom: `${Math.random() * 20}%`,
                      }}
                    ></div>
                  ))}

                  {/* Graph line */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path
                      d="M0,80 C50,70 100,90 150,60 C200,30 250,50 300,40 C350,30 400,50 400,50"
                      stroke="#22D3EE"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>

                  <div className="absolute bottom-2 left-2 bg-gray-800/80 rounded-md px-2 py-1">
                    <div className="text-xs text-gray-300">Total: 1.2 tons</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-white mb-4">Sustainability Score</h4>

                <div className="flex items-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#1F2937" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#22D3EE"
                        strokeWidth="10"
                        strokeDasharray="283"
                        strokeDashoffset="70"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-2xl font-bold text-white">75%</div>
                    </div>
                  </div>

                  <div className="ml-6">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-sm text-gray-300">Renewable Energy: 62%</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                      <span className="text-sm text-gray-300">Water Recycling: 78%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                      <span className="text-sm text-gray-300">Waste Reduction: 85%</span>
                    </div>
                  </div>
                </div>
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

