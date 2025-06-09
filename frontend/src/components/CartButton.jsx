import { useState } from "react";
import useCartStore from "../store/cartStore";
import CartModal from "./CartModal";
import { ShoppingCart } from "lucide-react";

const CartButton = () => {
  const [open, setOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center px-4 py-2 bg-white rounded-full shadow hover:scale-105 transition"
      >
        <ShoppingCart className="h-5 w-5 text-gray-800" />
        <span className="ml-2 font-medium text-gray-800">Cart</span>
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1.5">
            {cart.length}
          </span>
        )}
      </button>

      <CartModal open={open} setOpen={setOpen} />
    </>
  );
};

export default CartButton;
