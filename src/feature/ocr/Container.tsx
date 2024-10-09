import { ColorButton } from "~/component/Button";
import LangBar from "../languageSelect/LangBar";
import { useOcrContext } from "./context";
import drag2dropImg from "~/assets/drag_and_drop.png";
import DragDropArea from "~/component/Drag&Drop";
import { useDragDropContext } from "~/component/Drag&Drop/context";
import { MdClose } from "react-icons/md";
import { useEffect } from "react";
import { BaseTextarea } from "~/component/Textarea";

const Container = () => {
  const { isEmpty, translations, clearInput } = useOcrContext();
  const { files, updateFiles } = useDragDropContext();

  return (
    <div className="w-full h-full max-w-screen-2xl mx-auto">
      <LangBar />
      {isEmpty ? (
        <DragDropArea>
          <div className="flex w-full h-[50vh] min-h-[360px] border border-gray-200 rounded-xl">
            <div className="w-full h-full flex justify-center items-center">
              <img
                src={drag2dropImg}
                alt="drag and drop"
                className="object-cover w-32 md:w-48 lg:w-64"
              />
            </div>
            <div className="h-5/6 w-[2px] bg-gray-300 my-auto"></div>
            <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
              <span className="mb-4 text-xl font-semibold">Hoặc chọn tệp</span>
              <ColorButton active className="w-48">
                Tải tệp lên
              </ColorButton>
              <ColorButton className="w-48">Dán ảnh từ clipboard</ColorButton>
            </div>
          </div>
        </DragDropArea>
      ) : (
        <div className="w-full h-full relative border border-gray-200 p-1 divide-y divide-stone-200 bg-stone-100 rounded-lg">
          <div>
            <button
              className=" hover:bg-gray-100 rounded-full w-10 h-10 mt-1 transition-colors duration-100 text-red-500 p-1 flex items-center justify-center"
              title="Clear"
              onClick={clearInput}
            >
              <MdClose size={20} />
            </button>
          </div>
          <div className="w-full h-full p-4">
            {files.map((f, i) => {
              const description = translations[i] || "";
              return (
                <div
                  className="flex w-full divide-x divide-stone-200 gap-4"
                  key={i}
                >
                  <div className="w-1/2 min-w-32 h-1/3 min-h-16">
                    {/* <p className="text-sm font-medium text-gray-600">{f.name}</p> */}
                    <img
                      src={URL.createObjectURL(f)}
                      alt={f.name}
                      className="object-contain w-full h-full"
                    />
                  </div>

                  <div className="w-full">
                    <BaseTextarea value={description} disabled />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Container;
