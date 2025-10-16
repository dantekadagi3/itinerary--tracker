"use client"
import { useEffect, useState } from "react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  image_url: string
  quantity: number
  expiry_date: string
}

export default function ItemsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products")
        if (!res.ok) throw new Error("Failed to fetch products")
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error("❌ Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <p className="text-green-800 text-lg font-medium animate-pulse">
          Loading vegetables...
        </p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <p className="text-green-700 text-xl font-semibold">
          No vegetables added yet 🥕
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 p-6">
      <h1 className="text-4xl font-bold text-green-900 text-center mb-10 drop-shadow-sm">
        Available Vegetables 🥦
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/40 hover:scale-105 transition-transform duration-300"
          >
           <img
  src={product.image_url.startsWith("/") ? product.image_url : `/uploads/${product.image_url}`}
  alt={product.name}
  className="w-full h-48 object-cover"
/>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-green-800">
                {product.name}
              </h2>
              <p className="text-green-700 mt-1">
                Quantity: {product.quantity} kg
              </p>
              <p className="text-green-600 text-sm mt-1">
                Expiry: {new Date(product.expiry_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
