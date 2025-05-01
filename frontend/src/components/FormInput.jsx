import { LuMail, LuLock, LuUser } from "react-icons/lu";

const iconMap = {
  email: LuMail,
  password: LuLock,
  name: LuUser,
  confirmPassword: LuLock,
};

const FormInput = ({
  label,
  id,
  type,
  placeholder,
  onChange,
  minLength,
  maxLength,
}) => {
  const Icon = iconMap[id] || null;

  return (
    <div>
      <label htmlFor={id} className="text-gray-300 font-medium">
        {label}
      </label>
      <div className="flex items-center gap-2 bg-gray-700 rounded-lg relative">
        {Icon && <Icon className="text-gray-400 absolute left-3 w-5 h-5" />}
        <input
          type={type}
          id={id}
          className="bg-gray-700 text-gray-300 w-full outline-none rounded-lg p-2 pl-10 border border-gray-600 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder={placeholder}
          required
          onChange={onChange}
          minLength={minLength}
          maxLength={maxLength}
        />
      </div>
    </div>
  );
};

export default FormInput;
