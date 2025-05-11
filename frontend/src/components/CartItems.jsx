import { Link } from "react-router-dom";
import { LuTrash2, LuCirclePlus, LuCircleMinus } from "react-icons/lu";
import { useCartStore } from "../stores/useCartStore";

const CartItems = () => {
  const { cart, removeFromCart, updateCart } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-sm">
        <h2 className="text-2xl text-gray-400 font-bold">Your cart is empty</h2>
        <Link to="/" className="text-emerald-400 underline font-medium">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {cart.map((product) => (
        <div
          key={product._id}
          className="flex justify-center items-center gap-4 sm:gap-8 p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-sm"
        >
          <img
            src={product.photo}
            alt="Product"
            className="w-24 h-24 rounded-sm object-cover"
          />
          <div className="flex flex-col gap-3 flex-1">
            <h2 className="font-bold">{product.name}</h2>
            <p className="text-sm text-gray-400 break-all">
              {product.description}
            </p>
            <button
              className="text-red-500 w-max"
              onClick={() => removeFromCart(product._id)}
            >
              <LuTrash2 size={20} />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8">
            <div className="flex justify-center gap-2">
              <button
                className="flex items-center text-lg  text-red-500"
                onClick={() => {
                  if (product.quantity > 1) {
                    updateCart(product._id, product.quantity - 1);
                  } else {
                    removeFromCart(product._id);
                  }
                }}
              >
                <LuCircleMinus />
              </button>
              <p className="text-xl">{product.quantity}</p>
              <button
                className="flex items-center text-lg text-green-500"
                onClick={() => updateCart(product._id, product.quantity + 1)}
              >
                <LuCirclePlus />
              </button>
            </div>
            <p className="text-emerald-500 font-bold">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CartItems;
