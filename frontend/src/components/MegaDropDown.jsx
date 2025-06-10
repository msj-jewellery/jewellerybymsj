import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const filterOptions = ['Category', 'Price', 'Occasion', 'Gender'];

const subCategories = {
  Category: ['Bangles', 'Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Mangalsutra', 'NosePins', 'Pendants', 'Necklace Set'],
  Price: ['Under ₹10,000', '₹10,000 - ₹50,000', 'Above ₹50,000'],
  Occasion: ['Casual', 'Wedding', 'Party'],
  Gender: ['Women', 'Men', 'Kids']
};

export default function MegaDropdown() {
  const [selectedFilter, setSelectedFilter] = useState('Category');
  const navigate = useNavigate();

  const handleSubCategoryClick = (item) => {
    // Only navigate for Category filter
    if (selectedFilter === 'Category') {
      navigate(`/all-products?filter=${encodeURIComponent(item)}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-[80px] w-full h-[400px] z-50 flex border-t border-gray-200 backdrop-blur-lg bg-white/80 shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left Filter Panel */}
      <div className="w-[30%] h-full border-r border-gray-300 p-6 bg-gray-100/50 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Filters</h3>
          <ul className="space-y-3">
            {filterOptions.map((filter) => (
              <li
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`cursor-pointer px-3 py-2 rounded-md transition-colors duration-200 ${
                  selectedFilter === filter
                    ? 'bg-yellow-200 font-semibold text-gray-800'
                    : 'text-gray-600 hover:bg-yellow-100 hover:text-black'
                }`}
              >
                {filter}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm text-gray-500 mt-6">
          Select a filter to explore curated collections.
        </div>
      </div>

      {/* Right Subcategory Panel */}
      <div className="w-[70%] p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-white/60 overflow-y-auto">
        {subCategories[selectedFilter].map((item, index) => (
          <div
            key={index}
            onClick={() => handleSubCategoryClick(item)}
            className="flex items-center justify-start p-3 rounded-lg bg-gray-50 hover:bg-yellow-50 cursor-pointer transition"
          >
            <span className="text-gray-800 font-medium">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
