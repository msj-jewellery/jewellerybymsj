import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import useCartStore from "../store/cartStore";

function UpiQRCode({ upiId, amount, onPaymentSuccess }) {
  const upiUrl = `upi://pay?pa=${upiId}&pn=Jewelry Store&am=${amount}&cu=INR`;

  // Simulate automatic payment scan success after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onPaymentSuccess();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onPaymentSuccess]);

  return (
    <div className="text-center mt-8">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Scan & Pay via UPI</h3>
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiUrl)}&size=220x220`}
        alt="UPI QR Code"
        className="mx-auto border border-gray-300 rounded-lg shadow-sm"
      />
      <p className="mt-2 text-gray-700 font-mono">{upiId}</p>
      <p className="text-sm text-green-600 mt-2 animate-pulse">Waiting for payment confirmation...</p>
    </div>
  );
}

export default function Checkout() {
  const cartItems = useCartStore((state) => state.cart);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [orderData, setOrderData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" or "upi"
  const [submitted, setSubmitted] = useState(false);
  const [upiInitiated, setUpiInitiated] = useState(false);

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === "cod") {
      const confirmCod = window.confirm(
        "You selected Cash on Delivery.\nAre you sure you want to place the order?"
      );
      if (confirmCod) {
        setSubmitted(true);
      }
    } else if (paymentMethod === "upi") {
      setUpiInitiated(true);
    }
  };

  const handleUpiSuccess = () => {
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto mt-16 p-10 bg-white shadow-2xl rounded-3xl border border-gray-200"
    >
      {!submitted ? (
        <div className="grid md:grid-cols-2 gap-14">
          {/* LEFT: FORM */}
          <div>
            <h2 className="text-4xl font-extrabold mb-6 text-gray-900 tracking-tight">
              Secure Checkout
            </h2>
            <p className="text-gray-700 text-lg mb-10 max-w-lg leading-relaxed">
              Please enter your details and choose a payment method to complete your order.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Full Name"
                  value={orderData.name}
                  onChange={handleChange}
                  className="input-field-large"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address"
                  value={orderData.email}
                  onChange={handleChange}
                  className="input-field-large"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={orderData.phone}
                  onChange={handleChange}
                  className="input-field-large"
                />
                <input
                  name="pincode"
                  type="text"
                  required
                  placeholder="Pincode"
                  value={orderData.pincode}
                  onChange={handleChange}
                  className="input-field-large"
                />
              </div>

              <textarea
                name="address"
                rows="5"
                required
                placeholder="Full Address"
                value={orderData.address}
                onChange={handleChange}
                className="input-field-large resize-none"
              />

              {/* PAYMENT OPTIONS */}
              <section className="mt-10 border border-gray-300 rounded-xl p-6 bg-gray-50">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Choose Your Payment Method
                </h3>

                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <span className="text-gray-800 font-medium">Cash on Delivery</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                    />
                    <span className="text-gray-800 font-medium">UPI Payment</span>
                  </label>
                </div>

                {paymentMethod === "upi" && upiInitiated && (
                  <UpiQRCode
                    upiId="yourclient@upi"
                    amount={totalPrice.toFixed(2)}
                    onPaymentSuccess={handleUpiSuccess}
                  />
                )}
              </section>

              {!upiInitiated && (
                <motion.button
                  type="submit"
                  className="w-full mt-10 bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-xl py-4 rounded-2xl shadow-lg transition-transform transform hover:scale-105"
                  whileTap={{ scale: 0.97 }}
                >
                  Proceed to {paymentMethod === "upi" ? "UPI Payment" : "Confirm Order"}
                </motion.button>
              )}
            </form>
          </div>

          {/* RIGHT: CART SUMMARY */}
          <aside className="bg-[#fffaf5] p-8 rounded-3xl shadow-lg max-h-[650px] sticky top-24">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">🛒 Your Cart</h3>
            <div className="space-y-5 max-h-[440px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-yellow-100">
              {cartItems.length ? (
                cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b border-yellow-300 pb-3"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Your cart is empty</p>
              )}
            </div>

            <div className="mt-8 border-t border-yellow-300 pt-6 space-y-4 text-gray-700 text-lg font-semibold">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-700">
                <span>Delivery Charges</span>
                <span>Free</span>
              </div>
              <hr className="border-yellow-300" />
              <div className="flex justify-between text-gray-900 text-2xl font-extrabold">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center py-20"
        >
          <CheckCircle className="w-14 h-14 text-green-600 mb-5" />
          <h3 className="text-3xl font-extrabold text-green-800 mb-2">Order Confirmed!</h3>
          <p className="text-gray-700 max-w-md leading-relaxed">
            Thank you for your purchase! A confirmation email will be sent shortly.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
