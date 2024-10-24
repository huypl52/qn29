import LoadingText from '../LoadingText';
import { IBaseTextarea } from './type';
import { MdClose } from 'react-icons/md';

const BaseTextarea = ({
  value,
  onChange,
  disabled,
  showClear,
  resizable = true,
  loading,
  text,
  rows = 5,
}: IBaseTextarea) => {
  let className =
    'w-full bg-white focus:outline-none text-base h-[75vh] lg:text-2xl text-black custom-scrollbar overflow-auto p-4 rounded-tl-lg rounded-tr-lg';

  if (!resizable) {
    className += ' resize-none';
  }

  const showClearButton = showClear && value?.length;

  const handleTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const insertedText = e.target.value;
    onChange?.(insertedText);
  };

  const clearText = () => {
    onChange?.('');
  };

  return (
    <div className="flex flex-row relative h-full">
      <textarea
        className={className}
        rows={rows}
        spellCheck={false}
        placeholder={loading ? '' : text}
        value={loading ? '' : value}
        onChange={handleTextChange}
        disabled={disabled}
      ></textarea>
      {showClearButton ? (
        <button
          className="hover:bg-gray-100 rounded-tl rounded-tr w-10 h-10 mt-1 transition-colors duration-100 text-red-500 p-1 flex items-center justify-center"
          title="Clear"
          onClick={clearText}
        >
          <MdClose size={20} />
        </button>
      ) : null}
      {loading ? (
        <div className="absolute top-2 left-2">
          <LoadingText />
        </div>
      ) : null}
    </div>
  );
};

export default BaseTextarea;
