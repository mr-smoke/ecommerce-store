const ProductSkeleton = ({ count, className }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={`w-full ${className}`}>
          <div className="animate-pulse bg-gray-900 bg-opacity-30 backdrop-blur-sm border border-gray-700 rounded-lg shadow-md flex flex-col overflow-hidden ">
            <div className="h-48 bg-gray-700" />
            <div className="p-6 flex flex-col gap-4">
              <div className="h-7 bg-gray-700 rounded w-1/2" />
              <div className="h-8 bg-gray-700 rounded w-full" />
              <div className="h-10 bg-gray-700 rounded w-full" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductSkeleton;
