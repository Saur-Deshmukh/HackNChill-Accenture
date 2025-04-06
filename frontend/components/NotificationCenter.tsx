"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MessageSquare, Mail, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function NotificationCenter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".notifications-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate notifications container
      gsap.from(notificationsRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate notification icons
      gsap.from(".notification-icon", {
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: notificationsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate notification items
      gsap.from(".notification-item", {
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: notificationsRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Alert animation
      const alertAnimation = gsap.timeline({
        repeat: 2,
        repeatDelay: 2,
      })

      alertAnimation.to(".alert-notification", {
        borderColor: "#EF4444",
        boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)",
        duration: 0.5,
        yoyo: true,
        repeat: 3,
      })
    }, sectionRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <section ref={sectionRef} id="notifications" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="notifications-title text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Smart Notification Center
        </h2>

        <div
          ref={notificationsRef}
          className="relative bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-cyan-900/50 p-6 shadow-2xl shadow-cyan-900/20 max-w-6xl mx-auto overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Notification Channels */}
            <div className="lg:w-1/3">
              <h3 className="text-xl font-bold text-white mb-6">Notification Channels</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-green-700 transition-colors group">
                  <div className="flex items-center">
                    <div className="notification-icon w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center mr-4 group-hover:bg-green-800/50 transition-colors">
                      <MessageSquare className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">WhatsApp</h4>
                      <p className="text-sm text-gray-400">Instant alerts for critical events</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" /> Connected
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-400">Messages Today:</span>
                      <span className="text-white">12</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-blue-700 transition-colors group">
                  <div className="flex items-center">
                    <div className="notification-icon w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mr-4 group-hover:bg-blue-800/50 transition-colors">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Email</h4>
                      <p className="text-sm text-gray-400">Detailed reports and summaries</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" /> Connected
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-400">Emails Today:</span>
                      <span className="text-white">5</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-cyan-700 transition-colors group">
                  <div className="flex items-center">
                    <div className="notification-icon w-12 h-12 rounded-full bg-cyan-900/30 flex items-center justify-center mr-4 group-hover:bg-cyan-800/50 transition-colors">
                      <svg
                        className="w-6 h-6 text-cyan-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          fill="currentColor"
                          fillOpacity="0.2"
                        />
                        <path
                          d="M9.05 17.25L9.97 14.05L7.5 12H10.5L11.5 8.5L12.5 12H15.5L13.03 14.05L13.95 17.25L11.5 15.2L9.05 17.25Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Telegram</h4>
                      <p className="text-sm text-gray-400">Interactive commands and alerts</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" /> Connected
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-400">Commands Today:</span>
                      <span className="text-white">24</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <h4 className="text-lg font-medium text-white mb-3">Notification Settings</h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Low Stock Alerts</span>
                    <div className="relative">
                      <input type="checkbox" id="lowStock" className="sr-only" defaultChecked />
                      <label
                        htmlFor="lowStock"
                        className="block w-12 h-6 rounded-full bg-gray-700 cursor-pointer relative"
                      >
                        <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 transform translate-x-0 peer-checked:translate-x-6"></span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Price Change Alerts</span>
                    <div className="relative">
                      <input type="checkbox" id="priceChange" className="sr-only" defaultChecked />
                      <label
                        htmlFor="priceChange"
                        className="block w-12 h-6 rounded-full bg-gray-700 cursor-pointer relative"
                      >
                        <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 transform translate-x-0 peer-checked:translate-x-6"></span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Expiry Notifications</span>
                    <div className="relative">
                      <input type="checkbox" id="expiry" className="sr-only" defaultChecked />
                      <label
                        htmlFor="expiry"
                        className="block w-12 h-6 rounded-full bg-gray-700 cursor-pointer relative"
                      >
                        <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 transform translate-x-0 peer-checked:translate-x-6"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="lg:w-2/3 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Recent Notifications</h3>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400 mr-2">Filter:</span>
                  <button className="px-3 py-1 bg-gray-700 rounded-lg text-gray-300 text-sm hover:bg-gray-600 transition-colors mr-2">
                    All
                  </button>
                  <button className="px-3 py-1 bg-gray-900 rounded-lg text-gray-400 text-sm hover:bg-gray-700 transition-colors">
                    Alerts
                  </button>
                </div>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                <div className="notification-item alert-notification bg-red-900/20 rounded-lg p-4 border border-red-900/50">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-md font-medium text-white mr-2">Critical Alert</h4>
                        <span className="text-xs text-red-400 font-medium">Urgent</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">
                        Product #A1245 (Wireless Headphones) is expiring in 15 days. Only 5 units left in stock.
                      </p>
                      <div className="flex items-center mt-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>10 minutes ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button className="px-3 py-1 bg-red-900/50 rounded-lg text-red-300 text-xs hover:bg-red-800/50 transition-colors">
                      Take Action
                    </button>
                  </div>
                </div>

                <div className="notification-item bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-md font-medium text-white mr-2">Daily Report</h4>
                        <span className="text-xs text-blue-400 font-medium">Email</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">
                        Your daily inventory report has been generated and sent to your email.
                      </p>
                      <div className="flex items-center mt-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>1 hour ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button className="px-3 py-1 bg-gray-600/50 rounded-lg text-gray-300 text-xs hover:bg-gray-500/50 transition-colors">
                      View Report
                    </button>
                  </div>
                </div>

                <div className="notification-item bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-md font-medium text-white mr-2">WhatsApp Alert</h4>
                        <span className="text-xs text-green-400 font-medium">Message</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">
                        New order received from Customer #C789. Order value: $1,245.00
                      </p>
                      <div className="flex items-center mt-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>3 hours ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button className="px-3 py-1 bg-gray-600/50 rounded-lg text-gray-300 text-xs hover:bg-gray-500/50 transition-colors">
                      View Order
                    </button>
                  </div>
                </div>

                <div className="notification-item bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-cyan-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-cyan-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          fill="currentColor"
                          fillOpacity="0.2"
                        />
                        <path
                          d="M9.05 17.25L9.97 14.05L7.5 12H10.5L11.5 8.5L12.5 12H15.5L13.03 14.05L13.95 17.25L11.5 15.2L9.05 17.25Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-md font-medium text-white mr-2">Telegram Command</h4>
                        <span className="text-xs text-cyan-400 font-medium">Bot</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">
                        Command /lowstock executed. 24 items with low stock identified.
                      </p>
                      <div className="flex items-center mt-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>5 hours ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button className="px-3 py-1 bg-gray-600/50 rounded-lg text-gray-300 text-xs hover:bg-gray-500/50 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>

                <div className="notification-item bg-yellow-900/20 rounded-lg p-4 border border-yellow-900/50">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-yellow-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-md font-medium text-white mr-2">Price Alert</h4>
                        <span className="text-xs text-yellow-400 font-medium">Warning</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">
                        Supplier #S456 has increased prices for 12 products by an average of 8.5%.
                      </p>
                      <div className="flex items-center mt-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>Yesterday</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button className="px-3 py-1 bg-yellow-900/50 rounded-lg text-yellow-300 text-xs hover:bg-yellow-800/50 transition-colors">
                      Review Changes
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                <span className="text-sm text-gray-400">Showing 5 of 24 notifications</span>
                <button className="px-3 py-1 bg-gray-700 rounded-lg text-gray-300 text-sm hover:bg-gray-600 transition-colors">
                  View All
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

