"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FileText, PieChart, Share2 } from "lucide-react"

export default function AutoReports() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reportsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".reports-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate reports container
      gsap.from(reportsRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate report sections
      gsap.from(".report-section", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: reportsRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate charts
      gsap.from(".report-chart", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: reportsRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      })
    }, sectionRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <section ref={sectionRef} id="reports" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="reports-title text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Automated Reports
        </h2>

        <div
          ref={reportsRef}
          className="relative bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-cyan-900/50 p-6 shadow-2xl shadow-cyan-900/20 max-w-6xl mx-auto overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Report Preview */}
            <div className="lg:w-2/3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Monthly Performance Report</h3>
                <div className="flex items-center">
                  <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 text-sm hover:bg-gray-700 transition-colors mr-2">
                    <FileText className="w-4 h-4" />
                    <span className="sr-only">Download PDF</span>
                  </button>
                  <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span className="sr-only">Share</span>
                  </button>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="report-section mb-8">
                  <h4 className="text-lg font-medium text-white mb-4">Executive Summary</h4>
                  <p className="text-gray-300 mb-3">
                    October 2023 showed a 12.5% increase in overall inventory turnover compared to the previous month.
                    Sales increased by 18.2% while maintaining optimal stock levels across all warehouses.
                  </p>
                  <p className="text-gray-300">
                    Key achievements include reducing dead stock by 24%, improving warehouse efficiency by 5%, and
                    successfully negotiating better terms with 3 major suppliers.
                  </p>
                </div>

                <div className="report-section mb-8">
                  <h4 className="text-lg font-medium text-white mb-4">Sales Performance</h4>

                  <div className="report-chart h-64 w-full relative mb-4">
                    {/* Simulated bar chart */}
                    <div className="absolute inset-0 flex items-end justify-around">
                      {[65, 48, 72, 53, 80, 65, 90].map((height, index) => (
                        <div key={index} className="w-1/12 mx-1 flex flex-col items-center">
                          <div
                            className="w-full bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-sm"
                            style={{ height: `${height}%` }}
                          ></div>
                          <div className="text-xs text-gray-400 mt-1">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400">Total Sales</div>
                      <div className="text-xl font-bold text-white">$128,547</div>
                      <div className="text-xs text-green-400">+18.2% from last month</div>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400">Orders</div>
                      <div className="text-xl font-bold text-white">1,245</div>
                      <div className="text-xs text-green-400">+12.8% from last month</div>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400">Avg. Order Value</div>
                      <div className="text-xl font-bold text-white">$103.25</div>
                      <div className="text-xs text-green-400">+5.4% from last month</div>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400">Return Rate</div>
                      <div className="text-xl font-bold text-white">2.3%</div>
                      <div className="text-xs text-green-400">-0.5% from last month</div>
                    </div>
                  </div>
                </div>

                <div className="report-section">
                  <h4 className="text-lg font-medium text-white mb-4">Inventory Health</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="report-chart h-48 w-full relative mb-4">
                        {/* Simulated pie chart */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-32 h-32">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke="#3B82F6"
                                strokeWidth="20"
                                strokeDasharray="188.5 251.3"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke="#8B5CF6"
                                strokeWidth="20"
                                strokeDasharray="62.8 251.3"
                                strokeDashoffset="-188.5"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
                              <PieChart className="w-6 h-6 text-cyan-400 mr-2" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-sm text-gray-300">Optimal Stock (75%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                          <span className="text-sm text-gray-300">Low Stock (25%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">Inventory Turnover</span>
                          <span className="text-sm text-white">4.2x</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                            style={{ width: "84%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">Dead Stock</span>
                          <span className="text-sm text-white">3.5%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                            style={{ width: "35%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">Stock Accuracy</span>
                          <span className="text-sm text-white">98.7%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                            style={{ width: "98.7%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">Warehouse Efficiency</span>
                          <span className="text-sm text-white">92.5%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                            style={{ width: "92.5%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Sidebar */}
            <div className="lg:w-1/3 space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <h4 className="text-lg font-medium text-white mb-4">Report Settings</h4>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Time Period</label>
                    <select className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
                      <option>Last 30 Days</option>
                      <option>Last Quarter</option>
                      <option>Last Year</option>
                      <option>Custom Range</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Warehouses</label>
                    <select className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
                      <option>All Warehouses</option>
                      <option>New York</option>
                      <option>Chicago</option>
                      <option>Los Angeles</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Report Type</label>
                    <select className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
                      <option>Performance Summary</option>
                      <option>Inventory Health</option>
                      <option>Sales Analysis</option>
                      <option>Supplier Performance</option>
                    </select>
                  </div>
                </div>

                <button className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                  Generate Report
                </button>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <h4 className="text-lg font-medium text-white mb-4">Scheduled Reports</h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                    <div>
                      <div className="text-white text-sm font-medium">Daily Sales Summary</div>
                      <div className="text-gray-400 text-xs">Every day at 8:00 AM</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-xs text-gray-300">Active</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                    <div>
                      <div className="text-white text-sm font-medium">Weekly Inventory Report</div>
                      <div className="text-gray-400 text-xs">Every Monday at 9:00 AM</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-xs text-gray-300">Active</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                    <div>
                      <div className="text-white text-sm font-medium">Monthly Performance</div>
                      <div className="text-gray-400 text-xs">1st of every month</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-xs text-gray-300">Active</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 py-2 rounded-lg bg-gray-700 text-gray-300 font-medium text-sm hover:bg-gray-600 transition-colors">
                  Manage Schedules
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

