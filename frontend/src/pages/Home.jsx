import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import CategoriesGrid from "../components/CategoriesGrid";
import CollectionsCarousal from "../components/CollectionsCarousal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Element } from "react-scroll";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    axios.get("/products")
      .then((res) => {
        const all = Array.isArray(res.data) ? res.data : [];
        const onlyFeatured = all.filter((product) => product.featured === true);
        setFeatured(onlyFeatured);
        console.log("✅ Featured products:", onlyFeatured);
      })
      .catch((err) => console.error("❌ Failed to fetch featured products:", err));
  }, []);

  const next = () => {
    setCurrent((prev) => (prev + 1) % featured.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + featured.length) % featured.length);
  };

  const getStyle = (index) => {
    const total = featured.length;
    const distance = ((index - current + total) % total);

    if (distance === 0) {
      return "z-30 scale-110 translate-x-0 opacity-100";
    } else if (distance === 1 || distance === total - 1) {
      return "z-20 scale-100 translate-x-[120px] -rotate-[5deg] opacity-80";
    } else if (distance === 2 || distance === total - 2) {
      return "z-10 scale-90 translate-x-[240px] -rotate-[10deg] opacity-60";
    } else {
      return "z-0 opacity-0 scale-75 pointer-events-none";
    }
  };

  return (
    <div className="space-y-20 overflow-x-hidden bg-white">
      {/* HERO SECTION */}
      <Element name="hero">
        <Hero />
      </Element>

      {/* CATEGORIES */}
      <Element name="categories">
        <div className="px-6">
          <CategoriesGrid />
        </div>
      </Element>

      {/* COLLECTIONS */}
      <Element name="collections">
        <div className="px-6">
          <CollectionsCarousal />
        </div>
      </Element>

      {/* FEATURED PRODUCTS */}
      <Element name="featured">
        <section className="relative px-6 py-8">
          <h2 className="text-3xl font-semibold mb-10 text-center text-gray-800">
            Featured Products
          </h2>

          {/* If loading failed or no data */}
          {featured.length === 0 && (
            <p className="text-center text-gray-500">No featured products found.</p>
          )}

          {/* Arrows */}
          {featured.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-40 bg-white text-black shadow-xl p-3 rounded-full hover:scale-110 transition"
              >
                <ChevronLeft size={26} />
              </button>
              <button
                onClick={next}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-40 bg-white text-black shadow-xl p-3 rounded-full hover:scale-110 transition"
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}

          {/* Carousel */}
          {featured.length > 0 && (
            <div className="relative flex items-center justify-center h-[450px] overflow-visible">
              {featured.map((product, index) => (
                <motion.div
                  key={product._id}
                  className={`absolute transition-all duration-500 ease-in-out ${getStyle(index)}`}
                >
                  <div className="w-[260px]">
                    <ProductCard product={product} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </Element>

      {/* FOOTER PLACEHOLDER */}
      <Element name="footer">
        <div className="h-20" />
      </Element>
    </div>
  );
};

export default Home;



// import { useEffect, useRef, useState } from "react";
// import axios from "../api/axiosInstance";
// import ProductCard from "../components/ProductCard";
// import Hero from "../components/Hero";
// import CategoriesGrid from "../components/CategoriesGrid";
// import CollectionsCarousal from "../components/CollectionsCarousal";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { motion } from "framer-motion";

// const Home = () => {
//   const [featured, setFeatured] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const intervalRef = useRef(null);

//   // Fetch featured products
//   useEffect(() => {
//     axios
//       .get("/products")
//       .then((res) => {
//         const all = Array.isArray(res.data) ? res.data : [];
//         const onlyFeatured = all.filter((product) => product.featured === true);
//         setFeatured(onlyFeatured);
//       })
//       .catch((err) =>
//         console.error("Failed to fetch featured products:", err)
//       );
//   }, []);

//   // Auto-slide
//   useEffect(() => {
//     startAutoSlide();
//     return () => clearInterval(intervalRef.current); // cleanup
//   }, [featured]);

//   const startAutoSlide = () => {
//     clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % featured.length);
//     }, 5000);
//   };

//   const next = () => {
//     clearInterval(intervalRef.current);
//     setCurrent((prev) => (prev + 1) % featured.length);
//     startAutoSlide();
//   };

//   const prev = () => {
//     clearInterval(intervalRef.current);
//     setCurrent((prev) => (prev - 1 + featured.length) % featured.length);
//     startAutoSlide();
//   };

//   const getStyle = (index) => {
//     const total = featured.length;
//     const distance = (index - current + total) % total;

//     if (distance === 0) {
//       return "z-30 scale-110 translate-x-0 rotate-0 opacity-100";
//     } else if (distance === 1 || distance === total - 1) {
//       const direction = distance === 1 ? 1 : -1;
//       return `z-20 scale-100 translate-x-[${direction * 160}px] rotate-[${direction * 6}deg] opacity-80`;
//     } else if (distance === 2 || distance === total - 2) {
//       const direction = distance === 2 ? 1 : -1;
//       return `z-10 scale-90 translate-x-[${direction * 300}px] rotate-[${direction * 10}deg] opacity-60`;
//     } else {
//       return "z-0 opacity-0 scale-75 pointer-events-none";
//     }
//   };

//   return (
//     <div className="space-y-20 overflow-x-hidden bg-white">
//       <Hero />

//       <div className="px-6">
//         <CategoriesGrid />
//       </div>

//       <div className="px-6">
//         <CollectionsCarousal />
//       </div>

//       <section className="relative px-6 py-8">
//         <h2 className="text-3xl font-semibold mb-10 text-center text-gray-800">
//           Featured Products
//         </h2>

//         {/* Arrows */}
//         {featured.length > 1 && (
//           <>
//             <button
//               onClick={prev}
//               className="absolute left-6 top-1/2 -translate-y-1/2 z-40 bg-black text-white shadow-xl p-3 rounded-full hover:scale-110 transition"
//             >
//               <ChevronLeft size={24} />
//             </button>
//             <button
//               onClick={next}
//               className="absolute right-6 top-1/2 -translate-y-1/2 z-40 bg-black text-white shadow-xl p-3 rounded-full hover:scale-110 transition"
//             >
//               <ChevronRight size={24} />
//             </button>
//           </>
//         )}

//         {/* Carousel */}
//         <div className="relative flex items-center justify-center h-[460px] overflow-visible">
//           {featured.map((product, index) => (
//             <motion.div
//               key={product._id}
//               drag="x"
//               dragConstraints={{ left: 0, right: 0 }}
//               className={`absolute transition-all duration-700 ease-in-out ${getStyle(index)}`}
//             >
//               <div className="w-[260px]">
//                 <ProductCard product={product} />
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       <div className="h-20"></div>
//     </div>
//   );
// };

// export default Home;

