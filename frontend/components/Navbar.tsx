"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Animate navbar items on load
    gsap.from(".nav-item", {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.5,
    })

    // Animate logo
    gsap.from(".logo", {
      opacity: 0,
      x: -30,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
    })
  }, [])

  useEffect(() => {
    // Animate mobile menu
    if (isOpen) {
      gsap.to(".mobile-menu", {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      })
    } else {
      gsap.to(".mobile-menu", {
        x: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      })
    }
  }, [isOpen])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Monitoring", path: "/monitoring" },
    { name: "Forecasting", path: "/forecasting" },
    { name: "Notifications", path: "/notifications" },
    { name: "Maps", path: "/maps" },
    { name: "Purchase", path: "/purchase" },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-cyan-900/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="logo flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center mr-3">
              <span className="text-white font-bold">IS</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              StockWise
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`nav-item text-sm uppercase tracking-wider ${
                  pathname === item.path
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button className="nav-item px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-menu fixed top-0 right-0 h-full w-64 bg-gray-900/95 backdrop-blur-lg transform translate-x-full opacity-0 transition-all z-50 border-l border-cyan-900/30">
        <div className="p-6">
          <button className="absolute top-4 right-4 text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>

          <div className="mt-12 flex flex-col space-y-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`text-sm uppercase tracking-wider ${
                  pathname === item.path
                    ? "text-cyan-400"
                    : "text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

