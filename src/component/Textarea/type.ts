import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
interface IBaseTextarea
  extends PropsWithChildren,
    Omit<ButtonHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value?: string;
  onChange?: (s: string) => void;
  disabled?: boolean;
  resizable?: boolean;
  showClear?: boolean;
  loading?: boolean;
  text?: string;
  rows?: number;
}

interface IStructureTextarea extends IBaseTextarea {
  header?: React.FC;
  footer?: React.FC;
}

export { type IBaseTextarea, type IStructureTextarea };
