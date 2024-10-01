import Button from "./BaseButton";
import { IColorButton } from "./type";

const ColorButton = ({ title, onClick, children, active }: IColorButton) => {
  let activeClass = "";
  if (active) activeClass += " text-blue-700 bg-blue-100";
  else {
    activeClass += " text-blue-600";
  }
  return (
    <Button
      onClick={onClick}
      title={title}
      className="rounded px-3 py-1 border border-blue-200 text-base font-semibold focus:outline-none focus:ring-1 focus:ring-blue-600"
    >
      {children}
    </Button>
  );
};

export default ColorButton;
