export interface IDragDropContext {
  files: File[];
  updateFiles: (files: File[]) => void;
  insertFiles: (f: File[]) => void;
  clear: () => void;
}
