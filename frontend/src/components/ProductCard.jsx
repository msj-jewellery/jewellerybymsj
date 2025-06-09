import useCartStore from "../store/cartStore";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const BASE_URL = "http://localhost:5000";
  const mainImage = product?.images?.[0]
    ? `${BASE_URL}${product.images[0]}`
    : "/fallback.jpg";

  const hoverImage = product?.images?.[1]
    ? `${BASE_URL}${product.images[1]}`
    : mainImage;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 group p-5 flex flex-col justify-between w-full h-full hover:scale-[1.02]">
      {/* Product Link & Image */}
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
          {/* Slide Images Wrapper */}
          <div className="absolute inset-0 flex w-[200%] transition-transform duration-500 ease-in-out group-hover:translate-x-[-50%]">
            {/* Main Image */}
            <img
              src={mainImage}
              alt={product.name}
              className="w-1/2 h-full object-cover"
            />
            {/* Hover Image */}
            <img
              src={hoverImage}
              alt={`${product.name} alt`}
              className="w-1/2 h-full object-cover"
            />
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-1 justify-between mt-5 text-center">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>

        <p className="text-yellow-600 font-medium mt-1 text-base">
          ₹{product.price?.toLocaleString() || "N/A"}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="mt-5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
