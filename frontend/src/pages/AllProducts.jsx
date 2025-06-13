// File: src/pages/AllProducts.jsx
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
];

const FilterBar = ({ sort, setSort, showBar }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const currentLabel =
    sortingOptions.find((opt) => opt.value === sort)?.label || "Sort";

  return (
    <div
      className={`sticky top-[72px] sm:top-[80px] z-30 transition-all duration-300 ease-in-out border-y border-gray-200 bg-white ${
        showBar
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 py-4 flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-4">
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
            + Show More
          </button>
        </div>

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
                    onClick={() => {
                      setSort(option.value);
                      setShowDropdown(false);
                    }}
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

  const activeFilter = searchParams.get("filter");
  const sortParam = searchParams.get("sort");

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
    let updated = [...allProducts];

    if (activeFilter) {
      updated = updated.filter(
        (p) =>
          p.category?.toLowerCase().trim() ===
          activeFilter.toLowerCase().trim()
      );
    }

    if (sort === "priceLow") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sort === "priceHigh") {
      updated.sort((a, b) => b.price - a.price);
    }

    setProducts(updated);
  }, [sort, allProducts, activeFilter]);

  useEffect(() => {
    if (sortParam) setSort(sortParam);
  }, [sortParam]);

  useEffect(() => {
    const scrollHandler = () => {
      const currentY = window.scrollY;
      setShowFilterBar(currentY < lastScrollY || currentY < 100);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [lastScrollY]);

  return (
    <div className="flex-grow bg-[#f9f6f1] pt-[160px]">
      <section className="min-h-[75vh] w-full px-4 sm:px-6 lg:px-10 pb-20">
        <nav className="text-sm text-gray-600 mb-2">
          <ol className="list-reset flex items-center space-x-1">
            <li>
              <a
                href="/"
                className="text-gray-500 hover:text-red-700 hover:underline"
              >
                Home
              </a>
            </li>
            <li className="text-gray-400">›</li>
            <li className="text-red-700 font-medium">All Jewellery</li>
          </ol>
        </nav>

        <div className="mb-6">
          <h1 className="text-[26px] md:text-[30px] font-serif font-bold text-gray-900 leading-tight">
            All Jewellery{" "}
            <span className="text-gray-500 font-sans text-lg">
              ({products.length} results)
            </span>
          </h1>
          {activeFilter && (
            <p className="mt-1 text-gray-500 text-sm">
              Showing results for category:{" "}
              <span className="font-medium text-gray-900">
                {activeFilter}
              </span>
            </p>
          )}
        </div>

        <FilterBar sort={sort} setSort={setSort} showBar={showFilterBar} />

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6"
        >
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 text-lg">
                No products found for the selected filter.
              </p>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
