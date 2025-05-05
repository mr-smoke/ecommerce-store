import { LuMail, LuLock, LuUser } from "react-icons/lu";

const iconMap = {
  email: LuMail,
  password: LuLock,
  user: LuUser,
  confirmPassword: LuLock,
};

const TextInput = ({
  label,
  id,
  type,
  value,
  defaultValue,
  placeholder,
  onChange,
  minLength,
  maxLength,
  required = false,
  icon,
}) => {
  const Icon = icon && iconMap[icon];

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="text-gray-300 font-medium">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2 bg-gray-700 rounded-lg relative">
        {icon && <Icon className="text-gray-400 absolute left-3 w-5 h-5" />}
        <input
          type={type}
          id={id}
          name={id}
          className={`bg-gray-700 text-gray-300 w-full outline-none rounded-lg py-2 px-4 border border-gray-600 focus:ring-2 focus:ring-emerald-600 ${
            icon ? "pl-10" : ""
          } `}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TextInput;
