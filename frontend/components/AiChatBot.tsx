"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"
import { MessageSquare, X, Send, Bot, User } from "lucide-react"

export default function AiChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const chatButtonRef = useRef<HTMLButtonElement>(null)
  const chatPanelRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm your StockWise AI assistant. How can I help you today?" },
    { sender: "user", text: "Show me low stock items" },
    { sender: "bot", text: "I found 24 items with low stock. Here are the top 5 that need attention:" },
    {
      sender: "bot",
      text: "1. Wireless Headphones (5 units)\n2. Smart Watches (8 units)\n3. Bluetooth Speakers (7 units)\n4. USB-C Cables (9 units)\n5. Power Banks (6 units)",
    },
  ])

  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    gsap.registerPlugin(Draggable)

    // Make chat button draggable
    if (chatButtonRef.current) {
      Draggable.create(chatButtonRef.current, {
        type: "x,y",
        bounds: document.body,
        edgeResistance: 0.65,
        inertia: true,
      })
    }

    // Animate chat button
    gsap.to(chatButtonRef.current, {
      y: 20,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })

    // Scroll to bottom of messages
    scrollToBottom()
  }, [])

  useEffect(() => {
    // Animate chat panel open/close
    if (chatPanelRef.current) {
      if (isOpen) {
        gsap.to(chatPanelRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        })
      } else {
        gsap.to(chatPanelRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.2,
          ease: "power2.in",
        })
      }
    }

    // Scroll to bottom when messages change or chat opens
    scrollToBottom()
  }, [isOpen, messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: newMessage }])
    setNewMessage("")

    // Simulate bot response after a delay
    setTimeout(() => {
      let response = ""

      if (newMessage.toLowerCase().includes("telegram")) {
        response =
          "Here are some Telegram commands you can use:\n\n/inventory - Check current inventory\n/lowstock - View low stock items\n/sales - View today's sales\n/forecast - Get sales forecast"
      } else if (newMessage.toLowerCase().includes("order") || newMessage.toLowerCase().includes("purchase")) {
        response =
          "I can help you place an order. Please provide the following details:\n- Product name or ID\n- Quantity\n- Preferred supplier (optional)"
      } else {
        response =
          "I'll analyze that request and get back to you shortly. Is there anything specific you'd like to know about your inventory?"
      }

      setMessages((prev) => [...prev, { sender: "bot", text: response }])
    }, 1000)
  }

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {/* Chat Button */}
      <button
        ref={chatButtonRef}
        className={`w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Panel */}
      <div
        ref={chatPanelRef}
        className={`absolute bottom-0 right-0 w-80 md:w-96 h-[500px] bg-gray-900/90 backdrop-blur-lg rounded-2xl border border-cyan-900/50 shadow-2xl shadow-cyan-900/20 flex flex-col overflow-hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none opacity-0 scale-90"}`}
      >
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-800/50">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-3">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">StockWise AI</h3>
              <p className="text-gray-400 text-xs">Always online</p>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              {message.sender === "bot" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-2 flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-200"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
              </div>

              {message.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center ml-2 flex-shrink-0">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-800 bg-gray-800/50">
          <div className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-gray-700 rounded-l-lg px-4 py-2 text-white text-sm focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-r-lg px-4 py-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">
            Try asking about Telegram commands or placing an order
          </div>
        </div>
      </div>
    </div>
  )
}

