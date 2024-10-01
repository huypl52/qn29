import React from "react";
interface IBaseTextarea {
  value?: string;
  onChange?: () => void;
  disabled?: false;
}

interface IStructureTextarea extends IBaseTextarea {
  header?: React.FC;
  footer?: React.FC;
}

export { type IBaseTextarea, type IStructureTextarea };
