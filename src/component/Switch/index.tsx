import * as Switch from "@radix-ui/react-switch";
import { useState } from "react";

interface TextSwitchProps {
  onText?: string;
  offText?: string;
  onChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
  size?: "sm" | "md" | "lg";
}

const TextSwitch = ({
  onText = "ON",
  offText = "OFF",
  onChange,
  defaultChecked = false,
  size = "md",
}: TextSwitchProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (checked: boolean) => {
    console.log({ handleChange: checked });
    setChecked(checked);
    onChange?.(checked);
  };

  // Size variants
  const sizes = {
    sm: {
      root: "w-14 h-6",
      thumb: "w-5 h-5",
      text: "text-[10px]",
      translateX: "translate-x-[28px]",
    },
    md: {
      root: "w-16 h-7",
      thumb: "w-6 h-6",
      text: "text-xs",
      translateX: "translate-x-[36px]",
    },
    lg: {
      root: "w-18 h-8",
      thumb: "w-7 h-7",
      text: "text-sm",
      translateX: "translate-x-[38px]",
    },
  };

  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={handleChange}
      className={`
        relative rounded-full outline-none
        ${sizes[size].root}
        ${checked ? "bg-green-500" : "bg-gray-200"} 
        transition-colors duration-200
      `}
    >
      <span
        className={`
          absolute right-1.5 top-1/2 -translate-y-1/2
          ${sizes[size].text}
          font-medium text-black
          transition-opacity duration-200
          ${checked ? "opacity-0" : "opacity-100"}
        `}
      >
        {offText}
      </span>

      <span
        className={`
          absolute left-1.5 top-1/2 -translate-y-1/2
          ${sizes[size].text}
          font-medium text-black
          transition-opacity duration-200
          ${checked ? "opacity-100" : "opacity-0"}
        `}
      >
        {onText}
      </span>

      <Switch.Thumb
        className={`
          block rounded-full bg-white
          ${sizes[size].thumb}
          shadow-lg
          transition-transform duration-200
          ${checked ? sizes[size].translateX : "translate-x-[2px]"}
          transform
        `}
      />
    </Switch.Root>
  );
};

export default TextSwitch;
