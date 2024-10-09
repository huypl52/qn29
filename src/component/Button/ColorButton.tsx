import Button from "./BaseButton";
import { IColorButton } from "./type";

const ColorButton = ({
  title,
  onClick,
  children,
  active,
  className,
}: IColorButton) => {
  className +=
    " rounded border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-600";
  if (active) className += " text-blue-700 bg-blue-100";
  else {
    className += " text-blue-600";
  }
  return (
    <Button
      onClick={onClick}
      title={title}
      className={className}
      // disabled={!active}
    >
      {children}
    </Button>
  );
};

export default ColorButton;
