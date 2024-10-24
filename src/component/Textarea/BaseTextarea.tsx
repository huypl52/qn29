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
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="flex gap-1 items-center text-base lg:text-2xl text-black custom-scrollbar p-4">
            <div>Đang thực hiện</div>
            <div className="w-2 h-2 rounded-full bg-gray-500 animate-[pulse_1s_infinite_0ms]"></div>
            <div className="w-2 h-2 rounded-full bg-gray-500 animate-[pulse_1s_infinite_200ms]"></div>
            <div className="w-2 h-2 rounded-full bg-gray-500 animate-[pulse_1s_infinite_400ms]"></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BaseTextarea;
