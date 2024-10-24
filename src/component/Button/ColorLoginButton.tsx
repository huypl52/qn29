import Button from './BaseButton';
import { IColorButton } from './type';


const ColorLoginButton = ({
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
      className={`border-b-4 text-sm px-4 py-2 rounded-md  ${
        active
          ? 'border-blue-500 bg-blue-500 text-white'
          : 'border-transparent border-gray-300 bg-gray-300 '
      }`}
      // disabled={!active}
    >
      {children}
    </Button>
  );
};

export default ColorLoginButton;
