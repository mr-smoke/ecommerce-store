const ProductSkeleton = ({ count = 1, className = "" }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={className}>
          <div className="bg-gray-900 bg-opacity-30 backdrop-blur-sm border border-gray-700 rounded-lg shadow-md flex flex-col overflow-hidden">
            <div className="h-48 bg-gray-800 animate-pulse"></div>
            <div className="p-6 flex flex-col gap-4">
              <div className="h-6 bg-gray-800 rounded animate-pulse w-3/4"></div>
              <div className="h-8 bg-gray-800 rounded animate-pulse w-1/3"></div>
              <div className="h-10 bg-gray-800 rounded animate-pulse w-full"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductSkeleton;
