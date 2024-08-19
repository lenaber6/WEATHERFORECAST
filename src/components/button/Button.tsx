import clsx from "clsx";
import { ReactNode } from "react";

enum ButtonType {
  primary = "bg-custom-green",
  secondary = "bg-white border border-black",
  icon = "bg-transparent",
}

export default function Button({
  children,
  type,
  classNames,
  fullWidth,
  onClick,
}: {
  children: ReactNode;
  type: "primary" | "secondary" | "icon";
  fullWidth?: boolean;
  classNames?: string;
  onClick?: () => void;
}) {
  return (
      <button
        onClick={onClick}
        className={clsx(
          `rounded-3xl h-[52px] text-lg px-5`,
          classNames,
          ButtonType[type],
          {
            "w-full": fullWidth,
          }
        )}
      >
        {children}
      </button>
  );
}