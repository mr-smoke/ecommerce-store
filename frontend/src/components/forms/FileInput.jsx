const FileInput = ({ id, value, onChange, required = false }) => {
  return (
    <div className="flex">
      <label
        htmlFor={id}
        className="bg-gray-600 text-gray-300 w-full outline-none p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-150 ease-in-out text-center font-medium"
      >
        {value ? "Product Image Uploaded" : "Upload Product Image"}
      </label>
      <input
        type="file"
        id={id}
        name={id}
        className="sr-only bg-gray-600 text-gray-300 w-full outline-none p-2 rounded-lg"
        onChange={onChange}
        accept="image/*"
      />
    </div>
  );
};

export default FileInput;
