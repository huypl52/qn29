import { ColorButton } from "~/component/Button";
import LangBar from "../languageSelect/LangBar";
import { useOcrContext } from "./context";
import drag2dropImg from "~/assets/drag_and_drop.png";
import DragDropArea from "~/component/Drag&Drop";

const Container = () => {
  const { isEmpty } = useOcrContext();
  console.log("Container");
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
      ) : null}
    </div>
  );
};

export default Container;
