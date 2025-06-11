import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const CATEGORY_OPTIONS = [
  "Bangles",
  "Rings",
  "Necklaces",
  "Bracelets",
  "Earrings",
  "Mangalsutra",
  "NosePins",
  "Pendants",
  "Necklace Set",
];

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    weight: "",
    images: [],
    featured: false,
  });

  const [preview, setPreview] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const currentFiles = [...formData.images];
    const newFiles = [...currentFiles, ...selectedFiles].slice(0, 2); // Only max 2 images

    setFormData({ ...formData, images: newFiles });

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreview(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length !== 2) {
      setMessage("❌ Please upload exactly 2 images (main + hover).");
      return;
    }

    const uploadData = new FormData();
    formData.images.forEach((image) => uploadData.append("images", image));

    try {
      const uploadRes = await axiosInstance.post("/upload", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imagePaths = uploadRes.data.paths;

      const product = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        weight: formData.weight,
        images: imagePaths,
        featured: formData.featured,
      };

      await axiosInstance.post("/products", product);

      setMessage("✅ Product added successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        weight: "",
        images: [],
        featured: false,
      });
      setPreview([]);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add product.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 pt-24 bg-white shadow-xl rounded-xl">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            autoComplete="name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            placeholder="Price (₹)"
            required
            autoComplete="off"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full p-3 border rounded-lg resize-none min-h-[100px] focus:ring-2 focus:ring-yellow-400"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg bg-white text-black focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select Category</option>
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <input
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            type="text"
            placeholder="Weight (e.g. 10g)"
            required
            autoComplete="off"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="accent-yellow-500"
          />
          Show on Home Page
        </label>

        <div>
          <label className="block font-medium text-sm text-gray-700 mb-1">
            Upload 2 Images (Main & Hover)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-lg p-2"
          />
          {preview.length > 0 && (
            <div className="flex gap-4 mt-4">
              {preview.map((src, i) => (
                <div key={i} className="text-center">
                  <img
                    src={src}
                    alt={`Preview ${i + 1}`}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <p className="text-xs mt-1 text-gray-500">
                    {i === 0 ? "Main Image" : "Hover Image"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
        >
          Add Product
        </button>

        {message && (
          <p
            className={`text-center font-medium mt-4 ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
