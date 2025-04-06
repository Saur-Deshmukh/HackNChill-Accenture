"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MapPin, Truck, Package, Clock, ArrowRight, Search, Layers, RotateCw, Route } from "lucide-react"

export default function MapsIntegration() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(null)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [transferQuantity, setTransferQuantity] = useState(1)

  // Dummy data for warehouses
  const warehouses = [
    {
      id: 1,
      name: "New York Warehouse",
      location: { x: 200, y: 250 },
      stockLevel: 87,
      items: 1245,
      efficiency: 94,
      distance: "0 miles",
      deliveryTime: "Same day",
    },
    {
      id: 2,
      name: "Chicago Warehouse",
      location: { x: 500, y: 250 },
      stockLevel: 72,
      items: 987,
      efficiency: 88,
      distance: "802 miles",
      deliveryTime: "2 days",
    },
    {
      id: 3,
      name: "Los Angeles Warehouse",
      location: { x: 800, y: 250 },
      stockLevel: 91,
      items: 1532,
      efficiency: 96,
      distance: "2,789 miles",
      deliveryTime: "4 days",
    },
  ]

  // Dummy data for products
  const products = [
    { id: "P1001", name: "Wireless Headphones", stock: 24, price: 89.99 },
    { id: "P1002", name: "Smart Watch Pro", stock: 12, price: 199.99 },
    { id: "P1003", name: "Bluetooth Speaker", stock: 36, price: 59.99 },
    { id: "P1004", name: "Laptop Stand", stock: 48, price: 29.99 },
    { id: "P1005", name: "USB-C Cables (5-pack)", stock: 72, price: 19.99 },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

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

  const handleWarehouseSelect = (id: number) => {
    setSelectedWarehouse(id)
  }

  const handleProductSelect = (id: string) => {
    setSelectedProduct(id)
    setShowTransferModal(true)
  }

  const handleTransfer = () => {
    // In a real app, this would make an API call to transfer the product
    setShowTransferModal(false)
    setSelectedProduct(null)
    setTransferQuantity(1)

    // Show success message
    const successMessage = document.getElementById("success-message")
    if (successMessage) {
      successMessage.classList.remove("opacity-0")
      successMessage.classList.add("opacity-100")

      setTimeout(() => {
        successMessage.classList.remove("opacity-100")
        successMessage.classList.add("opacity-0")
      }, 3000)
    }
  }

  return (
    <section ref={sectionRef} id="maps-integration" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-cyan-900/50 p-6 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-900/30 flex items-center justify-center mr-3">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Locate Products</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Find and transfer products from the nearest warehouse to optimize delivery times and reduce shipping
                costs.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-cyan-900/30 flex items-center justify-center mr-2">
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                  </div>
                  <span>Real-time warehouse inventory</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-cyan-900/30 flex items-center justify-center mr-2">
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                  </div>
                  <span>Proximity-based product transfer</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-cyan-900/30 flex items-center justify-center mr-2">
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                  </div>
                  <span>Automated transfer requests</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-cyan-900/50 p-6 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-900/30 flex items-center justify-center mr-3">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Delivery Optimization</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Calculate accurate delivery times and optimize logistics routes for maximum efficiency.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-purple-900/30 flex items-center justify-center mr-2">
                    <ArrowRight className="w-3 h-3 text-purple-400" />
                  </div>
                  <span>Real-time traffic integration</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-purple-900/30 flex items-center justify-center mr-2">
                    <ArrowRight className="w-3 h-3 text-purple-400" />
                  </div>
                  <span>Multi-stop route optimization</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-purple-900/30 flex items-center justify-center mr-2">
                    <ArrowRight className="w-3 h-3 text-purple-400" />
                  </div>
                  <span>Delivery time predictions</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-cyan-900/50 p-6 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center mr-3">
                  <Layers className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Supply Chain Insights</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Streamline operations with geographical insights and data-driven supply chain optimization.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mr-2">
                    <ArrowRight className="w-3 h-3 text-blue-400" />
                  </div>
                  <span>Geographical demand analysis</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mr-2">
                    <ArrowRight className="w-3 h-3 text-blue-400" />
                  </div>
                  <span>Supplier proximity mapping</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mr-2">
                    <ArrowRight className="w-3 h-3 text-blue-400" />
                  </div>
                  <span>Regional performance metrics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          ref={mapRef}
          className="relative bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-cyan-900/50 p-6 shadow-2xl shadow-cyan-900/20 max-w-6xl mx-auto h-[600px] overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Warehouse Network</h3>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-3 py-1.5 bg-gray-800 rounded-lg text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                <Search className="w-4 h-4 mr-1" />
                <span>Find Nearest</span>
              </button>
              <button className="flex items-center px-3 py-1.5 bg-gray-800 rounded-lg text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                <Layers className="w-4 h-4 mr-1" />
                <span>Layers</span>
              </button>
              <button className="flex items-center px-3 py-1.5 bg-gray-800 rounded-lg text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                <RotateCw className="w-4 h-4 mr-1" />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* World map (simplified SVG) */}
          <svg className="w-full h-[400px]" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            {warehouses.map((warehouse) => (
              <g
                key={warehouse.id}
                className={`map-pin cursor-pointer ${selectedWarehouse === warehouse.id ? "scale-125" : ""}`}
                transform={`translate(${warehouse.location.x}, ${warehouse.location.y})`}
                onClick={() => handleWarehouseSelect(warehouse.id)}
              >
                <circle
                  cx="0"
                  cy="0"
                  r="15"
                  fill={selectedWarehouse === warehouse.id ? "rgba(56, 189, 248, 0.4)" : "rgba(49, 130, 206, 0.3)"}
                />
                <circle cx="0" cy="0" r="8" fill={selectedWarehouse === warehouse.id ? "#38BDF8" : "#3182CE"} />
                <text
                  x="0"
                  y="30"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight={selectedWarehouse === warehouse.id ? "bold" : "normal"}
                >
                  {warehouse.name.split(" ")[0]}
                </text>
              </g>
            ))}

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
          {selectedWarehouse && (
            <div className="absolute top-24 left-10 bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700 w-80">
              <div className="flex items-center mb-3">
                <MapPin className="w-5 h-5 text-cyan-400 mr-2" />
                <h3 className="text-lg font-medium text-white">
                  {warehouses.find((w) => w.id === selectedWarehouse)?.name}
                </h3>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Stock Level:</span>
                  <span className="text-white">{warehouses.find((w) => w.id === selectedWarehouse)?.stockLevel}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Items:</span>
                  <span className="text-white">{warehouses.find((w) => w.id === selectedWarehouse)?.items}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Efficiency:</span>
                  <span className="text-green-400">
                    {warehouses.find((w) => w.id === selectedWarehouse)?.efficiency}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Distance:</span>
                  <span className="text-white">{warehouses.find((w) => w.id === selectedWarehouse)?.distance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Delivery Time:</span>
                  <span className="text-white">{warehouses.find((w) => w.id === selectedWarehouse)?.deliveryTime}</span>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h4 className="text-white font-medium mb-2">Available Products</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between bg-gray-700/50 p-2 rounded-lg cursor-pointer hover:bg-gray-600/50"
                      onClick={() => handleProductSelect(product.id)}
                    >
                      <div>
                        <div className="text-white text-sm">{product.name}</div>
                        <div className="text-gray-400 text-xs">Stock: {product.stock}</div>
                      </div>
                      <div className="text-cyan-400 text-sm">${product.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

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

          {/* Success message */}
          <div
            id="success-message"
            className="absolute top-4 right-4 bg-green-900/80 backdrop-blur-sm rounded-lg p-4 border border-green-700 transition-opacity duration-300 opacity-0"
          >
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white">Product transfer initiated successfully!</span>
            </div>
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
              <Route className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Route Optimization</p>
              <p className="text-xl font-bold text-white">94% Efficient</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900/90 rounded-xl border border-cyan-900/50 p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Transfer Product</h3>

            <div className="mb-4">
              <p className="text-gray-400 mb-2">Product:</p>
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <div className="text-white">{products.find((p) => p.id === selectedProduct)?.name}</div>
                <div className="text-gray-400 text-sm mt-1">ID: {selectedProduct}</div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-400 mb-2">From:</p>
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <div className="text-white">{warehouses.find((w) => w.id === selectedWarehouse)?.name}</div>
                <div className="text-gray-400 text-sm mt-1">
                  Distance: {warehouses.find((w) => w.id === selectedWarehouse)?.distance}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-400 mb-2">Quantity:</p>
              <div className="flex items-center">
                <button
                  className="w-8 h-8 bg-gray-800 rounded-l-lg flex items-center justify-center text-white hover:bg-gray-700"
                  onClick={() => setTransferQuantity(Math.max(1, transferQuantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  value={transferQuantity}
                  onChange={(e) => setTransferQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-16 h-8 bg-gray-800 text-center text-white border-x border-gray-700 focus:outline-none"
                />
                <button
                  className="w-8 h-8 bg-gray-800 rounded-r-lg flex items-center justify-center text-white hover:bg-gray-700"
                  onClick={() => setTransferQuantity(transferQuantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                onClick={() => setShowTransferModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                onClick={handleTransfer}
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

