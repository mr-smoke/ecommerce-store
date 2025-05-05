const NumberInput = ({
  label,
  id,
  type,
  value,
  defaultValue,
  placeholder,
  onChange,
  min,
  max,
  step,
  required = false,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="text-gray-300 font-medium">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={id}
        className="bg-gray-700 text-gray-300 w-full outline-none rounded-lg py-2 px-4 border border-gray-600 focus:ring-2 focus:ring-emerald-600"
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      />
    </div>
  );
};

export default NumberInput;
