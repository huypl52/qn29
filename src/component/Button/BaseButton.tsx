import { IButton } from "./type";
const Button = ({ title, onClick, className, children }: IButton) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-3 py-1 text-base font-semibold ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
