import { LuLoader } from "react-icons/lu";
import React from "react";

const Button = ({ type, loading, text, onClick, icon, className }) => {
  return (
    <button
      type={type}
      className={
        `bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-150 ease-in-out ` +
        className
      }
      disabled={loading}
      onClick={onClick}
    >
      {loading ? (
        <div className="flex justify-center items-center gap-2">
          <LuLoader className="animate-spin w-5 h-5" />
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-2">
          {icon && React.createElement(icon, { className: "w-5 h-5" })}
          {text && <span>{text}</span>}
        </div>
      )}
    </button>
  );
};

export default Button;
