import {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDragDropContext } from "./context";

interface IDragDropArea
  extends React.HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  onlyShownInDrag?: boolean;
}

export default function DragDropArea(
  { className, children, onlyShownInDrag = false }: IDragDropArea,
) {
  const [isDragging, setIsDragging] = useState(false);
  const { updateFiles: setFiles } = useDragDropContext();
  const dragCounter = useRef(0);
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (dragCounter.current === 1) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  }, []);

  const dragDropClassname = useMemo(() => {
    let clsName =
      `rounded-lg border-2 border-dashed flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 z-10 duration-300 ease-in-out transition-all bg-blue-300 ${
        isDragging ? "opacity-85" : "opacity-0"
      } `;
    // if (isDragging) {
    //   dragDropClassname += " border-blue-500 bg-blue-50";
    // } else {
    //   dragDropClassname += " border-gray-300 bg-gray-50";
    // }

    clsName += ` ${className}`;
    return clsName;
  }, [isDragging, className]);

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative w-full"
    >
      {isDragging
        ? (
          <div className={dragDropClassname}>
            <div className="text-center p-4 ">
              <p className="text-blue-700 text-5xl">
                Thả tệp ở đây
              </p>
            </div>
          </div>
        )
        : null}
      {children}
    </div>
  );
}
