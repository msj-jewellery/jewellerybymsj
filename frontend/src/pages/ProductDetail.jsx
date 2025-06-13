import { useParams } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchProductAndOthers = async () => {
      try {
        const [productRes, allRes] = await Promise.all([
          axios.get(`/products/${id}`),
          axios.get(`/products`),
        ]);

        setProduct(productRes.data);
        setAllProducts(
          allRes.data.filter((p) => p._id !== id) // exclude current product
        );
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductAndOthers();
  }, [id]);

  const nextImage = () =>
    setCurrentImage((prev) =>
      product && product.images ? (prev + 1) % product.images.length : 0
    );

  const prevImage = () =>
    setCurrentImage((prev) =>
      product && product.images
        ? (prev - 1 + product.images.length) % product.images.length
        : 0
    );

  const getRecommended = () => {
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  if (loading || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-pulse">
        <div className="h-[350px] bg-gray-200 rounded-xl mb-10"></div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="w-20 h-20 bg-gray-200 rounded"></div>
              <div className="w-20 h-20 bg-gray-200 rounded"></div>
              <div className="w-20 h-20 bg-gray-200 rounded"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* 🖼 Carousel */}
      <div className="relative w-full h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-xl mb-10 bg-white">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={`${BASE_URL}${product.images?.[currentImage]}`}
            alt={`Product Image ${currentImage + 1}`}
            className="w-full h-full object-contain"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {product.images?.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* 📄 Product Details */}
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 flex items-center gap-2">
            {product.name}
            <BadgeCheck className="text-green-500" size={24} />
          </h1>
          <p className="text-2xl text-yellow-600 mt-4 font-semibold">
            ₹{product.price.toLocaleString()}
          </p>
          <p className="text-gray-700 mt-5 text-base md:text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <p><span className="font-semibold">Category:</span> {product.category}</p>
            <p><span className="font-semibold">Jewelry Type:</span> Elegant handcrafted piece</p>
            <p><span className="font-semibold">Material:</span> Premium Gold Plating</p>
            <p><span className="font-semibold">Shipping:</span> Free delivery in 3-5 days</p>
            <p><span className="font-semibold">Returns:</span> Easy 7-day return policy</p>
          </div>
        </div>

        {/* Images + CTA */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-wrap gap-3 mt-2">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={`${BASE_URL}${img}`}
                alt={`Thumb ${i}`}
                onClick={() => setCurrentImage(i)}
                className={`w-20 h-20 object-contain rounded-lg cursor-pointer border transition-transform duration-200 ${
                  i === currentImage
                    ? "border-yellow-500 scale-105 shadow-md"
                    : "border-gray-200"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-10 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg py-4 rounded-lg shadow-lg transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* 🔁 You May Also Like */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">You May Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {getRecommended().map((item) => (
            <div key={item._id} className="bg-white shadow rounded-lg p-4">
              <img
                src={`${BASE_URL}${item.images?.[0]}`}
                alt={item.name}
                className="w-full h-40 object-contain mb-3"
              />
              <h3 className="text-gray-800 font-semibold text-sm truncate">{item.name}</h3>
              <p className="text-yellow-600 font-medium text-sm mt-1">₹{item.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
