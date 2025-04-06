"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ShoppingCart, MessageCircle, DollarSign, Tag, Star } from "lucide-react"

export default function MarketplaceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const marketplaceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".marketplace-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate marketplace container
      gsap.from(marketplaceRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate product cards with staggered effect
      gsap.from(".product-card", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: marketplaceRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate chat messages with typewriter effect
      const messages = document.querySelectorAll(".chat-message")
      messages.forEach((message, index) => {
        const text = message.textContent || ""
        message.textContent = ""

        gsap.to(
          {},
          {
            duration: 0.05 * text.length,
            delay: index * 1.5,
            onUpdate: function () {
              const progress = Math.floor(this.progress() * text.length)
              message.textContent = text.substring(0, progress)
            },
            scrollTrigger: {
              trigger: marketplaceRef.current,
              start: "top 60%",
              toggleActions: "play none none none",
            },
          },
        )
      })

      // Glitch effect for product cards
      document.querySelectorAll(".product-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            x: () => Math.random() * 4 - 2,
            y: () => Math.random() * 4 - 2,
            duration: 0.1,
            repeat: 5,
            yoyo: true,
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert() // Cleanup
  }, [])

  const products = [
    {
      name: "Wireless Headphones",
      price: "$89.99",
      stock: 24,
      rating: 4.8,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Smart Watch Pro",
      price: "$199.99",
      stock: 12,
      rating: 4.6,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Bluetooth Speaker",
      price: "$59.99",
      stock: 36,
      rating: 4.5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Laptop Stand",
      price: "$29.99",
      stock: 48,
      rating: 4.7,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section ref={sectionRef} id="marketplace" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="marketplace-title text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          AI-Powered Marketplace
        </h2>

        <div
          ref={marketplaceRef}
          className="relative bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-cyan-900/50 p-6 shadow-2xl shadow-cyan-900/20 max-w-6xl mx-auto overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Product listings */}
            <div className="lg:w-2/3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Available Products</h3>
                <div className="flex items-center">
                  <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 text-sm hover:bg-gray-700 transition-colors mr-2">
                    Filter
                  </button>
                  <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                    Sort
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="product-card bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-cyan-700 transition-colors group"
                  >
                    <div className="flex items-center">
                      <div className="w-20 h-20 rounded-lg bg-gray-700 flex items-center justify-center mr-4 overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-center mt-1">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-300">{product.rating}</span>
                        </div>
                        <div className="flex items-center mt-2">
                          <Tag className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-400">Stock: {product.stock}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                      <div className="text-lg font-bold text-white">{product.price}</div>
                      <div className="flex items-center">
                        <button className="p-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors mr-2">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-cyan-900/50 rounded-lg text-cyan-300 hover:bg-cyan-800/50 transition-colors">
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Glitch overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat negotiation */}
            <div className="lg:w-1/3 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">AI Negotiation</h3>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                  <span className="text-xs text-gray-400">Live</span>
                </div>
              </div>

              <div className="space-y-4 mb-4 h-[300px] overflow-y-auto">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-xs font-medium text-white">B</span>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-white chat-message">
                      I'm interested in ordering 50 units of the wireless headphones. What's your best price?
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-end">
                  <div className="bg-cyan-900/50 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-white chat-message">
                      Our standard bulk discount is 10% for orders over 30 units. I can offer $80.99 per unit.
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cyan-900/50 flex items-center justify-center ml-2 flex-shrink-0">
                    <span className="text-xs font-medium text-white">AI</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-xs font-medium text-white">B</span>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-white chat-message">
                      I was hoping for at least 15% off since we're a regular customer.
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-end">
                  <div className="bg-cyan-900/50 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-white chat-message">
                      I see you've ordered 3 times in the past month. I can approve a 15% discount, bringing it to
                      $76.49 per unit.
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cyan-900/50 flex items-center justify-center ml-2 flex-shrink-0">
                    <span className="text-xs font-medium text-white">AI</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-cyan-900/50 rounded-lg text-cyan-300 hover:bg-cyan-800/50 transition-colors">
                  <DollarSign className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* B2B store owners */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Featured B2B Suppliers</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-purple-700 transition-colors"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                      <span className="text-lg font-bold text-white">S{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Supplier {index + 1}</h4>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-300">{4.5 + index * 0.1}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Products:</span>
                      <span className="text-white">{120 + index * 50}+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg. Delivery:</span>
                      <span className="text-white">{3 - index * 0.5} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Min. Order:</span>
                      <span className="text-white">${100 * (index + 1)}</span>
                    </div>
                  </div>

                  <button className="w-full py-2 rounded-lg bg-purple-900/50 text-purple-300 hover:bg-purple-800/50 transition-colors text-sm font-medium">
                    View Catalog
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"></div>
        </div>
      </div>
    </section>
  )
}

