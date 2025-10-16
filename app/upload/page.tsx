"use client"
import { useState } from "react"

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    expiry_date: "",
  })
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const form = new FormData()
    form.append("name", formData.name)
    form.append("quantity", formData.quantity)
    form.append("expiry_date", formData.expiry_date)
    if (image) form.append("image", image)

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: form, // No need for Content-Type header; browser sets it automatically
      })

      if (res.ok) {
        alert("✅ Product added successfully!")
        setFormData({ name: "", quantity: "", expiry_date: "" })
        setImage(null)
      } else {
        alert("❌ Failed to upload data.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("⚠️ Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 p-6">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md border border-white/40">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Upload Product 🥦
        </h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-green-800 font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-green-800 font-medium mb-1">Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-green-800 font-medium mb-1">Quantity (kg)</label>
            <input
              type="number"
              name="quantity"
              required
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-green-800 font-medium mb-1">Expiry Date</label>
            <input
              type="date"
              name="expiry_date"
              required
              value={formData.expiry_date}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition shadow-md"
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}
