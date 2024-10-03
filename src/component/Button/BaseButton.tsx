import { IButton } from "./type";
const Button = ({ title, onClick, className, type, children }: IButton) => {
  return (
    <button
      onClick={onClick}
      title={title}
      type={type}
      className={`px-3 py-1 text-base font-semibold ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
