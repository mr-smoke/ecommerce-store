import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LuArrowRight,
  LuPackage,
  LuPackageCheck,
  LuPackageX,
} from "react-icons/lu";
import axios from "../lib/axios";

const PurchaseSuccess = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const checkPaymentStatus = async (sessionId) => {
      try {
        const response = await axios.post(
          `/payment/checkout-success/${sessionId}`
        );
        setOrder(response.data);
      } catch (error) {
        setError(
          error.response.data.error || "An error occurred. Please try again."
        );
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    if (sessionId) {
      checkPaymentStatus(sessionId);
    } else {
      setError("No session ID provided. Please try again.");
      setIsProcessing(false);
    }
  }, []);

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-300">Processing your payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-900 shadow p-10 rounded-lg flex flex-col items-center gap-4 sm:w-96 break-all">
          <LuPackageX className="text-red-500" size={70} />
          <h1 className="text-4xl font-extrabold text-red-500 text-center">
            Payment Failed
          </h1>
          <p className="text-gray-300 text-center">{error}</p>
          <Link
            to="/"
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-1 transition duration-300 ease-in-out w-full font-medium"
          >
            <span>Try Again</span>
            <LuArrowRight />
          </Link>
          <p className="text-gray-500 text-sm -mt-3">
            If the issue persists, please contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-900 shadow p-10 rounded-lg flex flex-col items-center gap-4 sm:w-96">
        <LuPackageCheck className="text-emerald-400" size={70} />
        <h1 className="text-4xl font-extrabold text-emerald-400 text-center">
          Purchase Successful
        </h1>
        <p className="text-gray-300 text-center">
          Thank you for your purchase! It will be processed shortly.
        </p>
        <div className="flex items-center gap-2 bg-gray-700 p-2 rounded-lg w-full pointer-events-none">
          <LuPackage className="text-gray-300" size={20} />
          <input
            type="text"
            className="bg-gray-700 text-gray-300 w-full outline-none"
            placeholder={"Order ID: " + order?.order._id}
            readOnly
          />
        </div>
        <p className="text-gray-500 text-sm -mt-3">
          Your order will be shipped to your address within 3-5 business days.
        </p>
        <Link
          to="/"
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-1 transition duration-300 ease-in-out w-full font-medium"
        >
          <span>Continue Shopping</span>
          <LuArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
