"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { QrCode, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CallToAction() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const qrCodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section content
      gsap.from(".cta-content > *", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
      })

      // Animate QR code
      gsap.to(qrCodeRef.current, {
        rotationY: 360,
        duration: 5,
        repeat: -1,
        ease: "none",
      })
    }, sectionRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <section ref={sectionRef} id="cta" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-cyan-900/50 p-8 md:p-12 shadow-2xl shadow-cyan-900/20 max-w-6xl mx-auto overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-2/3 cta-content">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Revolutionize Your Inventory Management?
              </h2>

              <p className="text-lg text-gray-300 mb-8 max-w-2xl">
                Join thousands of businesses that have transformed their inventory operations with StockWise's
                AI-powered platform. Get started today and see the difference.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/marketplace"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-lg relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </span>
                  <span className="absolute inset-0 scale-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 group-hover:scale-100 transition-transform duration-500 ease-out"></span>
                </Link>

                <button className="px-8 py-4 rounded-full bg-transparent border border-cyan-500 text-cyan-400 font-medium text-lg hover:bg-cyan-950/30 transition-colors duration-300">
                  Schedule Demo
                </button>
              </div>

              <div className="flex items-center text-gray-400 text-sm">
                <svg
                  className="w-5 h-5 mr-2 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No credit card required</span>

                <svg
                  className="w-5 h-5 ml-6 mr-2 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>14-day free trial</span>

                <svg
                  className="w-5 h-5 ml-6 mr-2 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>

            <div className="lg:w-1/3 flex justify-center">
              <div ref={qrCodeRef} className="w-48 h-48 bg-white rounded-xl p-4 shadow-lg perspective-1000">
                <div className="w-full h-full relative">
                  <QrCode className="w-full h-full text-black" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">IS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"></div>

          {/* Background elements */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        </div>
      </div>
    </section>
  )
}

