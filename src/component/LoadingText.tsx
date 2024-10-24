const LoadingText = () => {
  return (
    <div className="flex gap-1 items-center text-base lg:text-2xl text-black custom-scrollbar p-4">
      <div>Đang thực hiện</div>
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-[pulse_1s_infinite_0ms]"></div>
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-[pulse_1s_infinite_200ms]"></div>
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-[pulse_1s_infinite_400ms]"></div>
    </div>
  );
};

export default LoadingText;
