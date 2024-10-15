import Button from './BaseButton';
import { IColorButton } from './type';

const ColorOptionButton = ({
  title,
  onClick,
  children,
  active,
  className,
}: IColorButton) => {
  return (
    <Button
      onClick={onClick}
      title={title}
      className={`border border-gray-300 rounded-md text-sm px-4 py-2 ${
        active ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'
      } ${className ? className : ''}`}
      // disabled={!active}
    >
      {children}
    </Button>
  );
};

export default ColorOptionButton;
