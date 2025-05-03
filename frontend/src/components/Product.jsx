import { LuShoppingCart, LuLoader } from "react-icons/lu";
import { useCartStore } from "../stores/useCartStore";
import Button from "./Button";

const Product = ({ product }) => {
  const { addToCart, loading } = useCartStore();

  return (
    <div className="bg-gray-900 bg-opacity-30 backdrop-blur-sm border border-gray-700 rounded-lg shadow-md flex flex-col overflow-hidden">
      <img
        src={product.photo}
        alt={product.name}
        className="object-cover w-full h-48 transition-transform duration-300 ease-in-out hover:scale-110"
      />
      <div className="p-6 flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-300">{product.name}</h2>
        <p className="text-emerald-400 font-bold text-2xl">${product.price}</p>
        <Button
          type="button"
          loading={loading}
          text="Add to Cart"
          onClick={() => addToCart(product)}
          icon={LuShoppingCart}
        />
      </div>
    </div>
  );
};

export default Product;
