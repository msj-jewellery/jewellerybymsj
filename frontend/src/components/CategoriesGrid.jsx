import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  { label: "Earrings", image: "/images/placeholder1.jpg", sortKey: "earrings" },
  { label: "Rings", image: "/images/placeholder2.jpg", sortKey: "rings" },
  { label: "Pendants", image: "/images/placeholder3.jpg", sortKey: "pendants" },
  { label: "Mangalsutra", image: "/images/placeholder4.jpg", sortKey: "mangalsutra" },
  { label: "Bracelets", image: "/images/placeholder5.jpg", sortKey: "bracelets" },
  { label: "Bangles", image: "/images/placeholder6.jpg", sortKey: "bangles" },
  { label: "Chains", image: "/images/placeholder7.jpg", sortKey: "chains" },
  {
    label: "View All",
    image: "/images/placeholder8.jpg",
    extra: "10+ Categories to choose from",
    special: true,
    sortKey: "recommended",
  },
];

const CategoriesGrid = () => {
  const navigate = useNavigate();

  const handleClick = (sortKey) => {
    navigate(`/products?sort=${sortKey}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-[#f9f6f1] text-gray-900">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
          Find Your Perfect Match
        </h2>
        <p className="text-gray-500 mt-2 text-sm">Shop by Categories</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            onClick={() => handleClick(cat.sortKey)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className={`group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer ${
              cat.special ? "border-2 border-gradient-gold" : "border border-gray-200"
            }`}
          >
            <div className="relative w-full h-40 sm:h-48 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300" />
            </div>
            <div className="p-3 text-center">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-yellow-600 transition">
                {cat.label}
              </p>
              {cat.extra && (
                <p className="text-xs mt-1 text-gray-500">{cat.extra}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;
