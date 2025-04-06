"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BarChart, LineChart, PieChart, Activity, AlertTriangle, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)

  // Dummy data for the dashboard
  const dummyData = {
    totalProducts: 2547,
    lowStockItems: 24,
    monthlySales: 128500,
    inventoryValue: 1200000,
    productGrowth: 12.5,
    lowStockGrowth: 3,
    salesGrowth: 18.2,
    inventoryGrowth: 5.3,
    alerts: [
      {
        type: "critical",
        message: "Product #A1245 (Wireless Headphones) is expiring in 15 days. Only 5 units left in stock.",
        action: "Discount or expedite sales",
      },
      {
        type: "warning",
        message: "Supplier #S456 has increased prices for 12 products by an average of 8.5%.",
        action: "Review pricing strategy",
      },
      {
        type: "info",
        message: "New shipment of Smart Watches arriving tomorrow. 50 units expected.",
        action: "Prepare warehouse space",
      },
    ],
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".section-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate dashboard container
      gsap.from(dashboardRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate dashboard elements with staggered effect
      gsap.from(".dashboard-card", {
        opacity: 0,
        y: 30,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: dashboardRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate charts
      gsap.from(".dashboard-chart", {
        opacity: 0,
        scale: 0.8,
        stagger: 0.2,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: dashboardRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Alert animation
      const alertAnimation = gsap.timeline({
        repeat: -1,
        repeatDelay: 5,
      })

      alertAnimation
        .from(".alert-item", {
          opacity: 0,
          x: 50,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(".alert-item", {
          opacity: 0,
          x: -50,
          duration: 0.5,
          ease: "power2.in",
          delay: 4,
        })
    }, sectionRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <section ref={sectionRef} id="dashboard" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          AI-Powered Dashboard
        </h2>

        <div
          ref={dashboardRef}
          className="relative bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-cyan-900/50 p-6 shadow-2xl shadow-cyan-900/20 max-w-6xl mx-auto overflow-hidden"
        >
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-gray-700">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Inventory Overview</h3>
              <p className="text-gray-400 text-sm">Real-time analytics and insights</p>
            </div>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                Last 7 Days
              </button>
              <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                Export
              </button>
              <button className="px-4 py-2 bg-cyan-900/50 rounded-lg text-cyan-300 text-sm hover:bg-cyan-800/50 transition-colors">
                Refresh
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="dashboard-card bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-cyan-700 transition-colors group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Products</p>
                  <h4 className="text-2xl font-bold text-white">{dummyData.totalProducts.toLocaleString()}</h4>
                  <p className="text-green-400 text-sm mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" /> +{dummyData.productGrowth}% from last month
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-cyan-900/30 flex items-center justify-center group-hover:bg-cyan-800/50 transition-colors">
                  <BarChart className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
            </div>

            <div className="dashboard-card bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-purple-700 transition-colors group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Low Stock Items</p>
                  <h4 className="text-2xl font-bold text-white">{dummyData.lowStockItems}</h4>
                  <p className="text-red-400 text-sm mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1 transform rotate-180" /> +{dummyData.lowStockGrowth} from
                    yesterday
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-purple-900/30 flex items-center justify-center group-hover:bg-purple-800/50 transition-colors">
                  <AlertTriangle className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="dashboard-card bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-blue-700 transition-colors group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Monthly Sales</p>
                  <h4 className="text-2xl font-bold text-white">${(dummyData.monthlySales / 1000).toFixed(1)}k</h4>
                  <p className="text-green-400 text-sm mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" /> +{dummyData.salesGrowth}% from last month
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-800/50 transition-colors">
                  <LineChart className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="dashboard-card bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-green-700 transition-colors group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Inventory Value</p>
                  <h4 className="text-2xl font-bold text-white">${(dummyData.inventoryValue / 1000000).toFixed(1)}M</h4>
                  <p className="text-green-400 text-sm mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" /> +{dummyData.inventoryGrowth}% from last month
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-green-900/30 flex items-center justify-center group-hover:bg-green-800/50 transition-colors">
                  <PieChart className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="dashboard-chart lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
              <h4 className="text-lg font-medium text-white mb-4">Sales & Inventory Trends</h4>
              <div className="h-64 w-full relative">
                {/* Simulated chart */}
                <div className="absolute inset-0 flex items-end">
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 mx-0.5 bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-sm"
                      style={{
                        height: `${20 + Math.random() * 60}%`,
                        opacity: 0.7 + Math.random() * 0.3,
                      }}
                    ></div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-end">
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 mx-0.5 border-t-2 border-purple-500"
                      style={{
                        height: `${30 + Math.sin(i / 3) * 20 + Math.random() * 10}%`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dashboard-chart bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
              <h4 className="text-lg font-medium text-white mb-4">Category Distribution</h4>
              <div className="h-64 w-full flex items-center justify-center">
                {/* Simulated pie chart */}
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full border-8 border-t-cyan-500 border-r-purple-500 border-b-blue-500 border-l-green-500 animate-spin-slow"></div>
                  <div className="absolute inset-4 rounded-full bg-gray-800"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
                    <Activity className="w-6 h-6 text-cyan-400 mr-2" />
                    <span>Analytics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <h4 className="text-lg font-medium text-white mb-4">Recent Alerts</h4>
            <div className="space-y-3">
              {dummyData.alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`alert-item flex items-center p-3 ${
                    alert.type === "critical"
                      ? "bg-red-900/20 border border-red-900/50"
                      : alert.type === "warning"
                        ? "bg-yellow-900/20 border border-yellow-900/50"
                        : "bg-blue-900/20 border border-blue-900/50"
                  } rounded-lg`}
                >
                  <AlertTriangle
                    className={`w-5 h-5 mr-3 ${
                      alert.type === "critical"
                        ? "text-red-400"
                        : alert.type === "warning"
                          ? "text-yellow-400"
                          : "text-blue-400"
                    }`}
                  />
                  <div>
                    <p className="text-white text-sm font-medium">{alert.message}</p>
                    <p className="text-gray-400 text-xs mt-1">Recommended action: {alert.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/monitoring"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
            >
              View Full Dashboard
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"></div>
        </div>
      </div>
    </section>
  )
}

