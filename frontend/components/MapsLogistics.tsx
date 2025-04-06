"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { MapPin, Truck, Package, BarChart2 } from "lucide-react"

export default function MapsLogistics() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".maps-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate map container
      gsap.from(mapRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate map pins
      gsap.from(".map-pin", {
        opacity: 0,
        scale: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate paths between locations
      gsap.from(".map-path", {
        strokeDashoffset: 1000,
        strokeDasharray: 1000,
        duration: 3,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate trucks along paths
      document.querySelectorAll(".map-truck").forEach((truck, index) => {
        const path = document.querySelector(`.map-path-${index + 1}`)

        if (path) {
          gsap.to(truck, {
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
            duration: 10,
            repeat: -1,
            ease: "none",
            delay: index * 2,
          })
        }
      })

      // Radar pulse animation
      gsap.to(".radar-pulse", {
        scale: 2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power1.out",
      })
    }, sectionRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <section ref={sectionRef} id="logistics" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="maps-title text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Global Logistics Network
        </h2>

        <div
          ref={mapRef}
          className="relative bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-cyan-900/50 p-6 shadow-2xl shadow-cyan-900/20 max-w-6xl mx-auto h-[500px] overflow-hidden"
        >
          {/* World map (simplified SVG) */}
          <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Map background */}
            <path
              d="M100,200 Q250,150 400,200 T700,250 T900,200"
              stroke="rgba(49, 130, 206, 0.2)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M150,250 Q300,300 450,250 T750,200 T950,250"
              stroke="rgba(49, 130, 206, 0.2)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M100,300 Q250,350 400,300 T700,350 T900,300"
              stroke="rgba(49, 130, 206, 0.2)"
              strokeWidth="1"
              fill="none"
            />

            {/* Connection paths */}
            <path
              className="map-path map-path-1"
              d="M200,250 C300,200 400,300 500,250"
              stroke="rgba(49, 130, 206, 0.6)"
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="none"
            />
            <path
              className="map-path map-path-2"
              d="M500,250 C600,200 700,300 800,250"
              stroke="rgba(49, 130, 206, 0.6)"
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="none"
            />
            <path
              className="map-path map-path-3"
              d="M200,250 C400,150 600,350 800,250"
              stroke="rgba(49, 130, 206, 0.6)"
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="none"
            />

            {/* Location pins */}
            <g className="map-pin" transform="translate(200, 250)">
              <circle cx="0" cy="0" r="10" fill="rgba(49, 130, 206, 0.3)" />
              <circle cx="0" cy="0" r="5" fill="#3182CE" />
            </g>
            <g className="map-pin" transform="translate(500, 250)">
              <circle cx="0" cy="0" r="10" fill="rgba(49, 130, 206, 0.3)" />
              <circle cx="0" cy="0" r="5" fill="#3182CE" />
            </g>
            <g className="map-pin" transform="translate(800, 250)">
              <circle cx="0" cy="0" r="10" fill="rgba(49, 130, 206, 0.3)" />
              <circle cx="0" cy="0" r="5" fill="#3182CE" />
            </g>

            {/* Moving trucks */}
            <g className="map-truck">
              <rect width="10" height="6" fill="#3182CE" rx="1" />
            </g>
            <g className="map-truck">
              <rect width="10" height="6" fill="#3182CE" rx="1" />
            </g>
            <g className="map-truck">
              <rect width="10" height="6" fill="#3182CE" rx="1" />
            </g>

            {/* Radar pulse */}
            <circle className="radar-pulse" cx="500" cy="250" r="20" fill="rgba(49, 130, 206, 0.3)" />
          </svg>

          {/* Warehouse info cards */}
          <div className="absolute top-10 left-10 bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700 w-64">
            <div className="flex items-center mb-3">
              <MapPin className="w-5 h-5 text-cyan-400 mr-2" />
              <h3 className="text-lg font-medium text-white">New York Warehouse</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Stock Level:</span>
                <span className="text-white">87%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Items:</span>
                <span className="text-white">1,245</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Efficiency:</span>
                <span className="text-green-400">94%</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 right-10 bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700 w-64">
            <div className="flex items-center mb-3">
              <Truck className="w-5 h-5 text-purple-400 mr-2" />
              <h3 className="text-lg font-medium text-white">Active Shipments</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">In Transit:</span>
                <span className="text-white">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">On Time:</span>
                <span className="text-green-400">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg. Delivery:</span>
                <span className="text-white">2.3 days</span>
              </div>
            </div>
          </div>

          {/* Stats overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-md rounded-full w-32 h-32 flex flex-col items-center justify-center border border-cyan-900/50">
            <Package className="w-8 h-8 text-cyan-400 mb-2" />
            <div className="text-2xl font-bold text-white">24,731</div>
            <div className="text-xs text-gray-400">Items Tracked</div>
          </div>

          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"></div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
          <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800 p-4 flex items-center">
            <div className="w-12 h-12 rounded-lg bg-blue-900/30 flex items-center justify-center mr-4">
              <Truck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Average Delivery Time</p>
              <p className="text-xl font-bold text-white">2.3 Days</p>
            </div>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800 p-4 flex items-center">
            <div className="w-12 h-12 rounded-lg bg-purple-900/30 flex items-center justify-center mr-4">
              <Package className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Warehouses Worldwide</p>
              <p className="text-xl font-bold text-white">12 Locations</p>
            </div>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-800 p-4 flex items-center">
            <div className="w-12 h-12 rounded-lg bg-cyan-900/30 flex items-center justify-center mr-4">
              <BarChart2 className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Logistics Efficiency</p>
              <p className="text-xl font-bold text-white">94% Optimized</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

