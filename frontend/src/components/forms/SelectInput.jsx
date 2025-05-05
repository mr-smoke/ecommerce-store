const SelectInput = ({
  label,
  id,
  value,
  placeholder,
  options = [],
  onChange,
  required = false,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="text-gray-300 font-medium">
          {label}
        </label>
      )}
      <select
        id={id}
        name={id}
        className="bg-gray-700 text-gray-300 w-full outline-none rounded-lg py-2 px-4 border border-gray-600 focus:ring-2 focus:ring-emerald-600"
        value={value}
        required={required}
        onChange={onChange}
      >
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.name} value={option.name} className="capitalize">
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
