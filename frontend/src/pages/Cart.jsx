import { Link } from "react-router-dom";
import {
  LuTrash2,
  LuCirclePlus,
  LuCircleMinus,
  LuArrowRight,
} from "react-icons/lu";
import { useCartStore } from "../stores/useCartStore";
import { useEffect } from "react";

const Cart = () => {
  const { loading, cart } = useCartStore();
  const cartItems = [
    {
      id: 1,
      name: "Product Name",
      description: "Product Description",
      image: "/images/products/1.jpg",
      price: 100,
      quantity: 1,
    },
    {
      id: 2,
      name: "Product Name",
      description: "Product Description",
      image: "/images/products/2.jpg",
      price: 100,
      quantity: 1,
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-2 flex flex-col gap-8 pt-40">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:w-3/4 flex flex-col gap-4">
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="flex justify-center items-center p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-sm"
            >
              <img src={product.image} alt="Product" className="w-24 h-24" />
              <div className="flex flex-col gap-3 flex-1 pl-8">
                <h2 className="font-bold">{product.name}</h2>
                <p className="text-sm text-gray-400">{product.description}</p>
                <button className="text-red-500 w-max">
                  <LuTrash2 size={20} />
                </button>
              </div>
              <div className="px-20">
                <div className="flex justify-center gap-2">
                  <button className="flex items-center text-lg  text-red-500">
                    <LuCircleMinus />
                  </button>
                  <p className="text-xl">{product.quantity}</p>
                  <button className="flex items-center text-lg text-green-500">
                    <LuCirclePlus />
                  </button>
                </div>
              </div>
              <p className="text-emerald-500 font-bold">${product.price}</p>
            </div>
          ))}
        </div>
        <div className="sm:w-1/4 flex flex-col gap-4">
          <div className="flex flex-col gap-4 p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-sm">
            <h2 className="text-2xl text-emerald-400 font-bold">
              Order Summary
            </h2>
            <div className="flex justify-between">
              <p className="text-gray-400">Subtotal:</p>
              <p className="font-semibold">$200</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Shipping:</p>
              <p className="font-semibold">$10</p>
            </div>
            <div className="flex justify-between border-t border-gray-700 py-2">
              <p className="font-bold">Total:</p>
              <p className="font-bold text-emerald-400">$210</p>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 py-2 rounded-lg transition duration-150 ease-in-out font-medium">
              Checkout
            </button>
            <Link to="/" className="text-xs text-gray-400 text-center">
              Or{" "}
              <span className="text-emerald-400 underline font-medium inline-flex items-center justify-center gap-1">
                Continue Shopping
                <LuArrowRight />
              </span>
            </Link>
          </div>
          <div className="flex flex-col gap-4 p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-sm">
            <div>
              <h2 className="text-2xl text-emerald-400 font-bold">
                Promo Code
              </h2>
              <p className="text-gray-400 text-xs pt-1">
                Enter your promo code below to receive a discount
              </p>
            </div>
            <input
              type="text"
              placeholder="Enter promo code"
              className="bg-gray-700 text-gray-400 p-2 rounded-lg placeholder:text-sm"
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 py-2 rounded-lg transition duration-150 ease-in-out font-medium">
              Apply
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
