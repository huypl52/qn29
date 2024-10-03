import { ButtonHTMLAttributes, CSSProperties, PropsWithChildren } from "react";

interface IButton
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  onClick?: () => void;
}

interface IActiveButton extends IButton {
  active?: boolean;
}
interface IColorButton extends IActiveButton {}

interface IUnderlineButton extends IActiveButton {
  color: CSSProperties["color"];
}

export { type IButton, type IColorButton, type IUnderlineButton };
