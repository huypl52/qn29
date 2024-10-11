import { useState } from "react";
import { useOcrContext } from "./context";
import { MdClose } from "react-icons/md";
import { useDragDropContext } from "~/component/Drag&Drop/context";
import TextSwitch from "~/component/Switch";
import { BaseTextarea } from "~/component/Textarea";

const Result = () => {
  const { translations, clearInput } = useOcrContext();
  const { files } = useDragDropContext();
  const [doTranslate, setDoTranslate] = useState(false);

  return (
    <div className="w-full h-full relative border border-gray-200 p-1 divide-y divide-stone-200 bg-stone-100 rounded-lg">
      <div className="flex items-center gap-3">
        <button
          className=" hover:bg-gray-300 rounded-full w-10 h-10 mt-1 transition-colors duration-100 text-red-500 p-1 flex items-center justify-center"
          title="Clear"
          onClick={clearInput}
        >
          <MdClose size={20} />
        </button>
        <TextSwitch
          onText="Dịch"
          offText="Dịch"
          defaultChecked={false}
          onChange={() => setDoTranslate((prev) => !prev)}
        />
      </div>
      <div className="w-full h-full p-4 divide-y divide-stone-400">
        {files.map((f, i) => {
          const description = translations[i] || "";
          return (
            <div
              className="flex w-full divide-x divide-stone-400 gap-4 py-2"
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
  );
};

export default Result;
