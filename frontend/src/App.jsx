import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from "./pages/Home";
import Checkout from './pages/CheckOut.jsx'; // ✅ Case-sensitive
import AllProducts from "./pages/AllProducts.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import Footer from "./components/Footer.jsx";
const App = () => {
  return (
    <div className="w-full min-h-screen bg-[#fdf7f2] overflow-x-hidden">

        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
        <Footer />
    </div>
  );
};

export default App;
