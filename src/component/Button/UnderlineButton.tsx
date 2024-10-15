import Button from './BaseButton';
import { IUnderlineButton } from './type';

const UnderlineButton = (props: IUnderlineButton) => {
  const { active, children, color, ...args } = props;

  const className = active ? 'border-b-2 border-blue-500' : '';
  return (
    <Button
      className={`text-gray-600 font-semibold  text-xs lg:text-sm hover:bg-gray-50 hover:text-gray-700 transition-colors duration-100 ${className}`}
      {...args}
    >
      {children}
    </Button>
  );
};

export default UnderlineButton;
