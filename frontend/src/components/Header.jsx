import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import CartButton from './CartButton';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import MegaDropDown from './MegaDropDown'; // make sure this is the correct path


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoverMenu, setHoverMenu] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        axiosInstance.get(`/products/search?q=${searchTerm}`)
          .then(res => setSearchResults(res.data))
          .catch(err => console.error(err));
        setShowDropdown(true);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const navLinks = [
    { label: 'Home', to: 'hero' },
    { label: 'Jewelry', to: 'categories', megaMenu: true },
    { label: 'New Collection', to: 'collections' },
    { label: 'Gifting', to: 'gifting' },
    { label: 'About', to: 'footer' },
    { label: 'Contact', to: 'footer' },
  ];

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50 font-serif transition-all duration-300">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Menu */}
        <div className="flex items-center space-x-4">
          <motion.div
            className="md:hidden cursor-pointer"
            onClick={toggleMenu}
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.div>

          <motion.h1
            className="text-3xl font-serif font-semibold tracking-widest text-black"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 250 }}
          >
            MS Jewels
          </motion.h1>
        </div>

        {/* Search */}
        <div className="w-full md:max-w-xl relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for gold, diamond, rings..."
              className="w-full border border-yellow-500 rounded-full py-3 px-6 pl-12 bg-white text-black shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>

          {/* Search Dropdown */}
          <AnimatePresence>
            {showDropdown && searchResults.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 w-full mt-2 bg-white border border-gray-300 shadow-lg rounded-lg z-50 max-h-64 overflow-y-auto"
              >
                {searchResults.map((product) => (
                  <li key={product._id} className="hover:bg-gray-100">
                    <Link
                      to={`/products/${product._id}`}
                      className="flex items-center gap-3 p-3"
                    >
                      <img
                        src={`http://localhost:5000${product.images?.[0]}`}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md border"
                      />
                      <span className="text-gray-800 font-medium">{product.name}</span>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Cart */}
        <div className="hidden md:flex items-center gap-4 text-gray-700">
          <CartButton />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="max-w-6xl mx-auto px-4 mt-2 pb-4 relative">
        <ul className="hidden md:flex justify-between text-sm font-medium text-gray-800 relative z-10">
          {navLinks.map(({ label, to, megaMenu }, index) => (
            <li
  key={index}
  className="cursor-pointer relative group"
  onMouseEnter={() => megaMenu && setHoverMenu(label)}
  onMouseLeave={() => megaMenu && setHoverMenu(null)}
>
  <ScrollLink
    to={to}
    smooth={true}
    duration={500}
    offset={-100}
    className="relative group text-black no-underline px-4 py-2 hover:text-yellow-700"
  >
    {label}
  </ScrollLink>
  {megaMenu && hoverMenu === label && (
    <MegaDropDown />
  )}
</li>

          ))}
        </ul>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 text-lg font-medium text-gray-800"
          >
            {navLinks.map(({ label, to }, index) => (
              <motion.li
                key={index}
                className="cursor-pointer"
                whileHover={{ color: '#B88A44' }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <ScrollLink
                  to={to}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </ScrollLink>
              </motion.li>
            ))}
            <CartButton />
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
