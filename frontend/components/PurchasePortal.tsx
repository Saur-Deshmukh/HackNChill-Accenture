"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ShoppingCart, QrCode, DollarSign, Tag, Star, Search, Filter, ArrowUpRight, Check } from "lucide-react"

export default function PurchasePortal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const portalRef = useRef<HTMLDivElement>(null)
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
  const [showQrModal, setShowQrModal] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [salesData, setSalesData] = useState({
    totalSales: 128547,
    totalOrders: 1245,
    avgOrderValue: 103.25,
    profit: 42850,
  })

  // Dummy product data
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
      price: 89.99,
      stock: 24,
      rating: 4.8,
      image: "/placeholder.svg?height=120&width=120",
      category: "Electronics",
      sales: 156,
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      description: "Advanced smartwatch with health monitoring and GPS tracking",
      price: 199.99,
      stock: 12,
      rating: 4.6,
      image: "/placeholder.svg?height=120&width=120",
      category: "Electronics",
      sales: 89,
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      description: "Portable waterproof speaker with 360° sound and 20-hour playtime",
      price: 59.99,
      stock: 36,
      rating: 4.5,
      image: "/placeholder.svg?height=120&width=120",
      category: "Electronics",
      sales: 212,
    },
    {
      id: 4,
      name: "Laptop Stand",
      description: "Ergonomic aluminum laptop stand with adjustable height and angle",
      price: 29.99,
      stock: 48,
      rating: 4.7,
      image: "/placeholder.svg?height=120&width=120",
      category: "Accessories",
      sales: 178,
    },
    {
      id: 5,
      name: "USB-C Cables (5-pack)",
      description: "Durable braided USB-C cables with fast charging capability",
      price: 19.99,
      stock: 72,
      rating: 4.4,
      image: "/placeholder.svg?height=120&width=120",
      category: "Accessories",
      sales: 324,
    },
    {
      id: 6,
      name: "Wireless Charging Pad",
      description: "Fast wireless charging pad compatible with all Qi-enabled devices",
      price: 34.99,
      stock: 29,
      rating: 4.3,
      image: "/placeholder.svg?height=120&width=120",
      category: "Electronics",
      sales: 145,
    },
  ]

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".portal-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate portal container
      gsap.from(portalRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Animate product cards
      gsap.from(".product-card", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: portalRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate stats
      gsap.from(".stat-card", {
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
    }, sectionRef)

    return () => ctx.revert() // Cleanup
  }, [])

  const handlePurchase = (productId: number) => {
    setSelectedProduct(productId)

    // Simulate a purchase
    const product = products.find((p) => p.id === productId)
    if (product) {
      // Update sales data
      setSalesData((prev) => ({
        totalSales: prev.totalSales + product.price * quantity,
        totalOrders: prev.totalOrders + 1,
        avgOrderValue: ((prev.totalSales + product.price * quantity) / (prev.totalOrders + 1)).toFixed(
          2,
        ) as unknown as number,
        profit: prev.profit + product.price * quantity * 0.3, // Assuming 30% profit margin
      }))

      // Show success message
      const successMessage = document.getElementById("purchase-success")
      if (successMessage) {
        successMessage.classList.remove("opacity-0")
        successMessage.classList.add("opacity-100")

        setTimeout(() => {
          successMessage.classList.remove("opacity-100")
          successMessage.classList.add("opacity-0")
        }, 3000)
      }
    }

    // Reset
    setQuantity(1)
  }

  const handleShowQr = (productId: number) => {
    setSelectedProduct(productId)
    setShowQrModal(true)
  }

  return (
    <section ref={sectionRef} id="purchase-portal" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-cyan-900/50 p-6 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-900/30 flex items-center justify-center mr-3">
                  <ShoppingCart className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Direct Purchase</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Streamlined interface for customers to browse and purchase products directly from your inventory.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-cyan-900/30 flex items-center justify-center mr-2">
                    <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                  </div>
                  <span>Real-time inventory updates</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-cyan-900/30 flex items-center justify-center mr-2">
                    <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                  </div>
                  <span>Secure payment processing</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-cyan-900/30 flex items-center justify-center mr-2">
                    <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                  </div>
                  <span>Customer account management</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-cyan-900/50 p-6 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-900/30 flex items-center justify-center mr-3">
                  <QrCode className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">QR Code Generation</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Generate unique QR codes for each product enabling quick scanning and purchasing.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-purple-900/30 flex items-center justify-center mr-2">
                    <ArrowUpRight className="w-3 h-3 text-purple-400" />
                  </div>
                  <span>Instant product information</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-purple-900/30 flex items-center justify-center mr-2">
                    <ArrowUpRight className="w-3 h-3 text-purple-400" />
                  </div>
                  <span>Contactless purchasing</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-purple-900/30 flex items-center justify-center mr-2">
                    <ArrowUpRight className="w-3 h-3 text-purple-400" />
                  </div>
                  <span>Mobile-friendly checkout</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/60 backdrop-blur-lg rounded-xl border border-cyan-900/50 p-6 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center mr-3">
                  <DollarSign className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Real-time Analytics</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Track sales quantities and profit updates in real-time with seamless inventory integration.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mr-2">
                    <ArrowUpRight className="w-3 h-3 text-blue-400" />
                  </div>
                  <span>Live sales dashboards</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mr-2">
                    <ArrowUpRight className="w-3 h-3 text-blue-400" />
                  </div>
                  <span>Profit margin calculations</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mr-2">
                    <ArrowUpRight className="w-3 h-3 text-blue-400" />
                  </div>
                  <span>Automated inventory adjustments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          ref={portalRef}
          className="relative bg-gray-900/60 backdrop-blur-lg rounded-2xl border border-cyan-900/50 p-6 shadow-2xl shadow-cyan-900/20 max-w-6xl mx-auto overflow-hidden"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h3 className="text-xl font-bold text-white">Product Catalog</h3>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 pl-10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <button className="flex items-center px-3 py-2 bg-gray-800 rounded-lg text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                <Filter className="w-4 h-4 mr-1" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
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
                    <div className="flex items-center mt-1">
                      <Tag className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-400">Stock: {product.stock}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mt-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                  <div className="text-lg font-bold text-white">${product.price}</div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleShowQr(product.id)}
                      className="p-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handlePurchase(product.id)}
                      className="p-2 bg-cyan-900/50 rounded-lg text-cyan-300 hover:bg-cyan-800/50 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Success message */}
          <div
            id="purchase-success"
            className="fixed top-4 right-4 bg-green-900/80 backdrop-blur-sm rounded-lg p-4 border border-green-700 transition-opacity duration-300 opacity-0 z-50"
          >
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-white">Purchase successful! Inventory updated.</span>
            </div>
          </div>

          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"></div>
        </div>

        {/* Sales Analytics */}
        <div className="stats-section mt-12 max-w-6xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6">Real-time Sales Analytics</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="stat-card bg-gray-900/60 backdrop-blur-lg rounded-xl border border-cyan-900/50 p-6 shadow-xl">
              <h4 className="text-gray-400 text-sm mb-2">Total Sales</h4>
              <div className="text-2xl font-bold text-white">${salesData.totalSales.toLocaleString()}</div>
              <div className="text-xs text-green-400 mt-1">+18.2% from last month</div>
            </div>

            <div className="stat-card bg-gray-900/60 backdrop-blur-lg rounded-xl border border-cyan-900/50 p-6 shadow-xl">
              <h4 className="text-gray-400 text-sm mb-2">Total Orders</h4>
              <div className="text-2xl font-bold text-white">{salesData.totalOrders.toLocaleString()}</div>
              <div className="text-xs text-green-400 mt-1">+12.8% from last month</div>
            </div>

            <div className="stat-card bg-gray-900/60 backdrop-blur-lg rounded-xl border border-cyan-900/50 p-6 shadow-xl">
              <h4 className="text-gray-400 text-sm mb-2">Average Order Value</h4>
              <div className="text-2xl font-bold text-white">${salesData.avgOrderValue.toLocaleString()}</div>
              <div className="text-xs text-green-400 mt-1">+5.4% from last month</div>
            </div>

            <div className="stat-card bg-gray-900/60 backdrop-blur-lg rounded-xl border border-cyan-900/50 p-6 shadow-xl">
              <h4 className="text-gray-400 text-sm mb-2">Total Profit</h4>
              <div className="text-2xl font-bold text-white">${salesData.profit.toLocaleString()}</div>
              <div className="text-xs text-green-400 mt-1">+21.3% from last month</div>
            </div>
          </div>

          <div className="mt-8 bg-gray-900/60 backdrop-blur-lg rounded-xl border border-cyan-900/50 p-6 shadow-xl">
            <h4 className="text-lg font-medium text-white mb-4">Top Selling Products</h4>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Product</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Price</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Sales</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {products
                    .sort((a, b) => b.sales - a.sales)
                    .slice(0, 5)
                    .map((product) => (
                      <tr key={product.id} className="border-b border-gray-800">
                        <td className="py-3 px-4 text-white">{product.name}</td>
                        <td className="py-3 px-4 text-gray-300">{product.category}</td>
                        <td className="py-3 px-4 text-gray-300">${product.price}</td>
                        <td className="py-3 px-4 text-gray-300">{product.sales}</td>
                        <td className="py-3 px-4 text-gray-300">${(product.price * product.sales).toLocaleString()}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900/90 rounded-xl border border-cyan-900/50 p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Product QR Code</h3>

            <div className="mb-4">
              <p className="text-gray-400 mb-2">Product:</p>
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <div className="text-white">{products.find((p) => p.id === selectedProduct)?.name}</div>
                <div className="text-gray-400 text-sm mt-1">
                  ${products.find((p) => p.id === selectedProduct)?.price}
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-48 h-48 bg-white rounded-xl p-4">
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

            <p className="text-center text-gray-400 text-sm mb-6">
              Scan this QR code to view product details and make a purchase.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                onClick={() => setShowQrModal(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                onClick={() => {
                  setShowQrModal(false)
                  handlePurchase(selectedProduct || 0)
                }}
              >
                Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

