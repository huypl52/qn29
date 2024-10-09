import { IBaseTextarea } from "./type";
import { MdClose } from "react-icons/md";

const BaseTextarea = ({
  value,
  onChange,
  disabled,
  showClear,
  resizable = true,
  loading,
}: IBaseTextarea) => {
  let className =
    "w-full h-full focus:outline-none text-base lg:text-2xl text-black custom-scrollbar p-4";

  if (!resizable) {
    className += " resize-none";
  }

  const showClearButton = showClear && value?.length;

  const handleTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e,
  ) => {
    const insertedText = e.target.value;
    onChange?.(insertedText);
  };

  const clearText = () => {
    onChange?.("");
  };

  return (
    <div className="flex flex-row relative">
      <textarea
        className={className}
        rows={5}
        spellCheck={false}
        placeholder={loading ? "" : "Xin mời nhập..."}
        value={value}
        onChange={handleTextChange}
        disabled={disabled}
      ></textarea>
      {showClearButton ? (
        <button
          className="hover:bg-gray-100 rounded-full w-10 h-10 mt-1 transition-colors duration-100 text-red-500 p-1 flex items-center justify-center"
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
