import { createContext, useContext, useState } from 'react';

import { IDragDropContext } from './type';

const DragDropContext = createContext<IDragDropContext>({
  files: [],
  updateFiles: () => {},
  insertFiles: () => {},
  clear: () => {},
});

const DragDropContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const insertFiles = (files: File[]) => {
    setFiles((prev) => [...prev, ...files]);
  };

  return (
    <DragDropContext.Provider
      value={{
        files,
        updateFiles: setFiles,
        insertFiles,
        clear: () => setFiles([]),
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
};

const useDragDropContext = () => {
  return useContext(DragDropContext);
};

export { DragDropContextProvider, useDragDropContext };
