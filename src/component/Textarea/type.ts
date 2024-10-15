import React from 'react';
interface IBaseTextarea {
  value?: string;
  onChange?: (s: string) => void;
  disabled?: boolean;
  resizable?: boolean;
  showClear?: boolean;
  loading?: boolean;
  text?: string;
}

interface IStructureTextarea extends IBaseTextarea {
  header?: React.FC;
  footer?: React.FC;
}

export { type IBaseTextarea, type IStructureTextarea };
