import useCartStore from "../store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const CartModal = ({ open, setOpen }) => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartStore();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="bg-white rounded-xl p-6 max-w-lg w-full shadow-2xl relative"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-semibold">Your Cart</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-sm bg-white border-black text-gray-500 hover:text-black transition"
              >
                ✕
              </button>
            </div>

            {/* Cart Empty State */}
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">Your cart is empty.</p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <li key={item._id} className="py-4 flex items-start gap-4">
                      <img
                        src={
                          item.images?.[0]
                            ? `http://localhost:5000${item.images[0]}`
                            : "/images/placeholder.jpg"
                        }
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          ₹{item.price.toLocaleString()}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => decreaseQuantity(item._id)}
                            className="px-2 py-1 bg-white border-black rounded hover:bg-gray-300 text-black"
                          >
                            −
                          </button>
                          <span className="text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item._id)}
                            className="px-2 py-1 bg-white border-black rounded hover:bg-gray-300 text-black"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-sm font-semibold mt-2">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-sm text-black bg-white border-black hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Total */}
                <div className="border-t pt-4 mt-4 text-right">
                  <p className="text-lg font-bold">
                    Total: ₹{total.toLocaleString()}
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={clearCart}
                    className="text-sm text-black bg-white border-black hover:underline"
                  >
                    Clear Cart
                  </button>

                  <Link
                    to="/checkout"
                    onClick={() => setOpen(false)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition"
                  >
                    Proceed to Checkout →
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
