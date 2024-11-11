import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDragDropContext } from "./context";
import ImageEditor from "~/feature/imageEditor";

interface IDragDropArea
  extends React.HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  onlyShownInDrag?: boolean;
}

export default function DragDropArea({
  className,
  children,
  onlyShownInDrag = false,
}: IDragDropArea) {
  const [isDragging, setIsDragging] = useState(false);
  const [editing, setEditing] = useState(false);
  const { updateFiles: setFiles, files } = useDragDropContext();
  const [recentFile, setRecentFile] = useState<File>();
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
    console.log({ droppedFiles });
    setEditing(true);
    if (droppedFiles?.length) {
      setRecentFile(droppedFiles[0]);
    }
    // setFiles(droppedFiles);
  }, []);

  const handleSubmitFile = useCallback((blob: Blob, name: string) => {
    const file = new File([blob], name, {
      type: blob.type,
      lastModified: Date.now(),
    });
    setFiles([file]);
    setEditing(false);
  }, []);

  useEffect(() => {
    if (!files?.length) setEditing(false);
  }, [files]);

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
              <p className="text-blue-700 text-5xl">Thả tệp ở đây</p>
            </div>
          </div>
        )
        : null}
      {editing
        ? <ImageEditor loadedFile={recentFile} onSave={handleSubmitFile} />
        : children}
    </div>
  );
}
