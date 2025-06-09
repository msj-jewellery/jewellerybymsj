import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import axios from "../api/axiosInstance";
import { IoChevronDown } from "react-icons/io5";

const sortingOptions = [
  { label: "Best Matches", value: "recommended" },
  { label: "Price: Low to High", value: "priceLow" },
  { label: "Price: High to Low", value: "priceHigh" },
  { label: "Category: Jewelry", value: "jewelry" },
  { label: "Category: Watches", value: "watches" },
];

const FilterBar = ({ sort, setSort, showBar }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOptionClick = (value) => {
    setSort(value);
    setShowDropdown(false);
  };

  const currentLabel =
    sortingOptions.find((opt) => opt.value === sort)?.label || "Sort";

  return (
    <div
      className={`sticky top-[72px] sm:top-[80px] z-30 transition-all duration-300 ease-in-out border-y border-gray-200 bg-white ${
        showBar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 py-4 flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-4">
        
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 items-center">
          {["₹25,000 - ₹50,000", "Gifts For Him", "Women"].map((label, i) => (
            <button
              key={i}
              className="px-4 py-1.5 bg-white border border-gray-300 text-sm rounded-full flex items-center gap-2 hover:border-black transition"
            >
              <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs font-bold">
                +
              </span>
              <span className="text-gray-800">{label}</span>
            </button>
          ))}
          <button className="text-sm text-red-700 hover:underline">
            +Show More
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="relative inline-block text-left">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="inline-flex justify-between items-center px-5 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-800 rounded-full hover:border-black transition"
          >
            Sort By: <span className="ml-2 font-semibold">{currentLabel}</span>
            <IoChevronDown className="ml-1 text-gray-500" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black/5 z-40">
              <div className="py-1 text-sm text-gray-700">
                {sortingOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleOptionClick(option.value)}
                    className={`px-4 py-2 cursor-pointer ${
                      sort === option.value
                        ? "bg-gray-100 font-semibold text-red-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function AllProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("recommended");
  const [searchParams] = useSearchParams();
  const [showFilterBar, setShowFilterBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        const data = Array.isArray(res.data) ? res.data : [];
        setAllProducts(data);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setAllProducts([]);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let sorted = [...allProducts];
    if (sort === "priceLow") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sort === "priceHigh") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sort === "jewelry") {
      sorted = allProducts.filter((p) => p.category?.toLowerCase() === "jewelry");
    } else if (sort === "watches") {
      sorted = allProducts.filter((p) => p.category?.toLowerCase() === "watches");
    }
    setProducts(sorted);
  }, [sort, allProducts]);

  useEffect(() => {
    const sortParam = searchParams.get("sort");
    if (sortParam) setSort(sortParam);
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowFilterBar(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <main className="min-h-screen bg-[#f9f6f1]">
      <section className="w-full px-4 sm:px-6 lg:px-10 pt-10 pb-20">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-2">
          <ol className="list-reset flex items-center space-x-1">
            <li>
              <a href="/" className="text-gray-500 hover:text-red-700 hover:underline">
                Home
              </a>
            </li>
            <li className="text-gray-400">›</li>
            <li className="text-red-700 font-medium">All Jewellery</li>
          </ol>
        </nav>

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-[26px] md:text-[30px] font-serif font-bold text-gray-900 leading-tight">
            All Jewellery{" "}
            <span className="text-gray-500 font-sans text-lg">({products.length} results)</span>
          </h1>
        </div>

        {/* Filter & Sort */}
        <FilterBar sort={sort} setSort={setSort} showBar={showFilterBar} />

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6"
        >
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No products found.
            </p>
          )}
        </motion.div>
      </section>
    </main>
  );
}
