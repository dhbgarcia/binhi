import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({ placeholder, name, width = 'w-full', type = 'text' }) => {
  const showEye = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showEye ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative self-center w-full">
      {showEye && !showPassword && (
        <Eye
          className="text-primaryGreen cursor-pointer absolute right-5 top-[25%]"
          onClick={() => setShowPassword(true)}
        />
      )}
      {showEye && showPassword && (
        <EyeOff
          className="text-primaryGreen cursor-pointer absolute right-5 top-[25%]"
          onClick={() => setShowPassword(false)}
        />
      )}
      <input
        type={inputType}
        placeholder={placeholder}
        name={name}
        className={`text-2xl ${width} bg-primaryYellow rounded-full text-xs py-4 pl-5 text-primaryGreen placeholder-primaryGreen placeholder:text-[2vh] font-Primary`}
      />
    </div>
  );
};

export default Input;
