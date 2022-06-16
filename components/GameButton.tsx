import classNames from "classnames";
import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
  text?: string;
  variant: Variant;
}

export enum Variant {
  DEFAULT,
  PICK,
  BAN
}

const BASE_STYLE = ['relative', 'w-80', 'py-6', 'px-4', 'rounded'];

const VARIANT_STYLE_MAP: Record<Variant, Array<string>> = {
  [Variant.DEFAULT]: [
    ...BASE_STYLE,
    'border', 'border-gray-800',
    'bg-gradient-to-b', 'from-gray-700', 'to-gray-600',
    'text-white', 'font-bold'
  ],
  [Variant.BAN]: [
    ...BASE_STYLE,
    'border', 'border-red-800',
    'bg-gradient-to-b', 'from-red-700', 'to-red-600',
    'text-white', 'font-bold'
  ],
  [Variant.PICK]: [
    ...BASE_STYLE,
    'border', 'border-green-800',
    'bg-gradient-to-b', 'from-green-700', 'to-green-600',
    'text-white', 'font-bold'
  ],
};

const getText = (variant: Variant, text: string) => {
  switch (variant) {
    case Variant.PICK:
      return ("Pick " + text)
    case Variant.BAN:
      return ("Ban " + text)
    default:
      return (text);
  }
}

const GameButton: FC<Props> = ({ text, disabled, onClick, variant }) => {
  return (
    <button
      className={classNames(
        VARIANT_STYLE_MAP[variant],
        disabled ? "cursor-not-allowed" : "")}
      disabled={disabled}
      onClick={onClick}
    >
      {
        getText(variant, text)
      }
    </button>
  )
};

export default GameButton;
