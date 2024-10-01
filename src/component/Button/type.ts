import { HTMLAttributes, PropsWithChildren } from "react";

interface IButton extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick: () => void;
}

interface IColorButton extends IButton {
  active?: boolean;
}

export { type IButton, type IColorButton };
