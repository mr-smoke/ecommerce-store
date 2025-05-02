import { LuLoader } from "react-icons/lu";

const Button = ({ type, loading, text, onClick, icon }) => {
  return (
    <button
      type={type}
      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold p-2 rounded-lg w-full mt-4 transition duration-150 ease-in-out"
      disabled={loading}
      onClick={onClick}
    >
      {loading ? (
        <span className="flex justify-center items-center gap-2">
          <LuLoader className="animate-spin w-5 h-5" />
          Loading...
        </span>
      ) : (
        <span className="flex justify-center items-center gap-2">
          {icon && <icon className="w-5 h-5" />}
          {text}
        </span>
      )}
    </button>
  );
};

export default Button;
