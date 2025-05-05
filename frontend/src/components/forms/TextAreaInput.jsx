const TextAreaInput = ({
  label,
  id,
  value,
  placeholder,
  onChange,
  minLength,
  maxLength,
  rows,
  required = false,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="text-gray-300 font-medium">
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={id}
        className="bg-gray-700 text-gray-300 w-full outline-none rounded-lg py-2 px-4 border border-gray-600 focus:ring-2 focus:ring-emerald-600"
        value={value}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        rows={rows}
        onChange={onChange}
      />
    </div>
  );
};

export default TextAreaInput;
