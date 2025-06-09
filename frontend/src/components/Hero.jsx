import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Slides
const slides = [
  {
    id: 1,
    image: "/images/placeholder9.jpg",
    headline: "Elevate Your Elegance",
    subheadline:
      "Discover timeless craftsmanship, gold that speaks, and beauty that lasts forever.",
    buttonText: "Explore Collection",
    textAlign: "center",
  },
  {
    id: 2,
    image: "/images/placeholder10.jpg",
    headline: "A Touch of Royalty",
    subheadline: "Celebrate moments with sparkling masterpieces.",
    buttonText: "View Collection",
    textAlign: "left",
  },
  {
    id: 3,
    image: "/images/placeholder11.jpg",
    headline: "Timeless Radiance",
    subheadline: "Jewels crafted for generations.",
    buttonText: "Shop Now",
    textAlign: "right",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={slide.image}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 1.2 }}
          className={`relative z-20 flex flex-col justify-center h-full container mx-auto px-4 sm:px-6 ${alignmentClasses[slide.textAlign]}`}
        >
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white font-serif font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-xl"
          >
            {slide.headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-white text-base sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed"
          >
            {slide.subheadline}
          </motion.p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="mt-6 px-8 py-3 rounded-full bg-white/90 text-gray-900 text-sm sm:text-base tracking-wide font-medium shadow-lg hover:bg-white hover:text-black transition"
          >
            {slide.buttonText}
          </motion.button>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full border transition-all ${
              i === current
                ? "bg-white border-white scale-110"
                : "bg-transparent border-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
