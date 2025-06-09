import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2b0000] text-white px-6 md:px-16 pt-12 pb-6">
      {/* Top Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
        {/* Customer Care */}
        <div>
          <h3 className="text-sm font-semibold mb-4 tracking-wide uppercase text-gray-300">Customer Care</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">Call Now: +91 11 4678 8888</li>
            <li className="hover:text-white cursor-pointer">FAQ</li>
            <li className="hover:text-white cursor-pointer">Sitemap</li>
          </ul>
        </div>

        {/* Our Company */}
        <div>
          <h3 className="text-sm font-semibold mb-4 tracking-wide uppercase text-gray-300">Our Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">Find a Boutique</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Corporate Responsibility</li>
          </ul>
        </div>

        {/* Legal Area */}
        <div>
          <h3 className="text-sm font-semibold mb-4 tracking-wide uppercase text-gray-300">Legal Area</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">Terms of Use</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Conditions of Sale</li>
            <li className="hover:text-white cursor-pointer">Credits</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-start gap-4">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-300">Follow Us</h3>
          <FaInstagram size={22} className="text-gray-400 hover:text-white transition cursor-pointer" />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 text-xs text-gray-500">
        <p className="mb-2 sm:mb-0">SHOP IN: INDIA <span className="underline ml-2 cursor-pointer hover:text-white">Change Country</span></p>
        <p className="text-center">&copy; {new Date().getFullYear()} HHPRID JEWELS</p>
      </div>
    </footer>
  );
};

export default Footer;
