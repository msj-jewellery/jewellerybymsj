// import { useCart } from "../context/CartContext";

// const dummyProducts = [
//   {
//     id: 1,
//     name: "Elegant Gold Necklace",
//     price: 150000,
//     image: "/images/placeholder2.jpg",
//   },
//   {
//     id: 2,
//     name: "Royal Diamond Ring",
//     price: 89000,
//     image: "/images/placeholder8.jpg",
//   },
//   {
//     id: 3,
//     name: "Classic Gold Earrings",
//     price: 65000,
//     image: "/images/placeholder3.jpg",
//   },
// ];

// const TestProducts = () => {
//   const { addToCart } = useCart();

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-8">
//       {dummyProducts.map((product) => (
//         <div
//           key={product.id}
//           className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center p-4"
//         >
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-60 object-cover mb-4 rounded"
//           />
//           <h2 className="text-lg font-semibold">{product.name}</h2>
//           <p className="text-gray-600 mb-2">₹{product.price.toLocaleString()}</p>
//           <button
//             onClick={() => addToCart(product)}
//             className="mt-auto px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
//           >
//             Add to Cart
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TestProducts;
