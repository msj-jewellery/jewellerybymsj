import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const collections = [
  {
    title: "18KT Jewellery for Everyday Elegance",
    image: "/images/placeholder1.jpg",
    span: "md:row-span-2 md:col-span-2",
    sortKey: "jewelry",
  },
  {
    title: "Stunning Every Ear",
    image: "/images/placeholder2.jpg",
    sortKey: "earrings",
  },
  {
    title: "Daily Wear Chains",
    image: "/images/placeholder3.jpg",
    sortKey: "chains",
  },
  {
    title: "Bold Gold Designs",
    image: "/images/placeholder4.jpg",
    sortKey: "bold",
  },
  {
    title: "New Arrivals",
    image: "/images/placeholder5.jpg",
    sortKey: "recommended",
  },
];

const CollectionsCarousel = () => {
  const navigate = useNavigate();

  const handleClick = (sortKey) => {
    navigate(`/products?sort=${sortKey}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-[#f9f6f1] text-gray-900 overflow-x-hidden">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
          MSJ Collections
        </h2>
        <p className="mt-2 text-gray-500">Explore our newly launched collection</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
        {collections.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => handleClick(item.sortKey)}
            className={`relative overflow-hidden rounded-xl shadow-lg group cursor-pointer ${item.span || ""}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300" />
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <h3 className="text-lg sm:text-xl font-semibold drop-shadow-lg">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CollectionsCarousel;
