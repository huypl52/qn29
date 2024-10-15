import Button from './BaseButton';
import { IColorButton } from './type';
import { DLang } from '~/type';

const ColorButton = ({
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
      className={`border-b-4 text-sm px-4 py-2  ${
        active
          ? 'border-blue-500 text-blue-500 bg-white'
          : 'border-transparent hover:border-gray-300 hover:bg-gray-300'
      }`}
      // disabled={!active}
    >
      {children}
    </Button>
  );
};

export default ColorButton;
