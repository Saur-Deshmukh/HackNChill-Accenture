"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Mountain, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer content
      gsap.from(".footer-content > div", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      })

      // Animate social icons
      gsap.from(".social-icon", {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
        delay: 0.5,
      })
    }, footerRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <footer ref={footerRef} className="bg-gray-900/80 backdrop-blur-lg border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center mr-3">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                StockWise
              </span>
            </div>

            <p className="text-gray-400 mb-6">
              AI-powered inventory management system that automates forecasting, optimizes stock levels, and connects
              you to global marketplaces.
            </p>

            <div className="flex space-x-4">
              <a
                href="#"
                className="social-icon w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-cyan-900 hover:text-cyan-400 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="social-icon w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-cyan-900 hover:text-cyan-400 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="social-icon w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-cyan-900 hover:text-cyan-400 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="social-icon w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-cyan-900 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="social-icon w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-cyan-900 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/monitoring" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Monitoring
                </Link>
              </li>
              <li>
                <Link href="/forecasting" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Forecasting
                </Link>
              </li>
              <li>
                <Link href="/notifications" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Notifications
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/maps" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Maps Integration
                </Link>
              </li>
              <li>
                <Link href="/purchase" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Purchase Portal
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Support Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-cyan-400 mr-3 mt-0.5" />
                <span className="text-gray-400">123 Innovation Street, Tech City, TC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-cyan-400 mr-3" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-cyan-400 mr-3" />
                <span className="text-gray-400">info@stockwise.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} StockWise. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-cyan-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-cyan-400 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-cyan-400 text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

