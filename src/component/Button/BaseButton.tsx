import { IButton } from "./type";
const Button = ({
  title,
  onClick,
  className,
  type,
  children,
  ...props
}: IButton) => {
  return (
    <button
      onClick={onClick}
      title={title}
      type={type}
      className={`px-3 py-1 text-base font-semibold disabled:opacity-35 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
