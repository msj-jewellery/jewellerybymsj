import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import CartButton from './CartButton';
import { Link as ScrollLink } from 'react-scroll';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { label: 'Home', to: 'hero' },
    { label: 'Jewelry', to: 'categories' },
    { label: 'New Collection', to: 'collections' },
    { label: 'Gifting', to: 'gifting' },
    { label: 'About', to: 'footer' },
    { label: 'Contact', to: 'footer' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm border-b border-gray-200 z-50 font-serif">
      {/* Top Bar */}
      <div className="h-[40px] hidden md:block bg-gray-50 border-b" />

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Logo + Mobile Menu */}
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

        {/* Center Navigation */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-800">
          {navLinks.map(({ label, to }, index) => (
            <motion.li
              key={index}
              className="cursor-pointer relative group"
              whileHover={{ color: '#B88A44', scale: 1.05 }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <ScrollLink
  to={to}
  smooth={true}
  duration={500}
  offset={-80}
  className="relative group text-black no-underline"
>
  {label}
  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-600 transition-all duration-300 group-hover:w-full"></span>
</ScrollLink>

            </motion.li>
          ))}
        </ul>

        {/* Right Side - Only Cart */}
        <div className="hidden md:flex items-center gap-4 text-gray-700">
          <CartButton />
        </div>
      </div>

      {/* Mobile Navigation */}
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
