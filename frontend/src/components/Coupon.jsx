const Coupon = ({ coupon }) => {
  return (
    <>
      <div
        key={coupon._id}
        className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2"
      >
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg border border-emerald-500/30 overflow-hidden">
          <div className="p-4 flex flex-col items-center gap-2">
            <h3 className="text-2xl font-semibold text-white">{coupon.name}</h3>
            <p className="text-emerald-300 text-xl font-medium">
              {coupon.discount}% off
            </p>
            <p className="text-gray-400">
              Expires on:{" "}
              {new Date(coupon.expiry).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 mt-2">
              Get Coupon
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupon;
