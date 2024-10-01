import { IButton } from "./type";
const Button = ({ title, onClick, className, children }: IButton) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
