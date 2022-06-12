import classNames from "classnames";
import Image from "next/image";
import { FC, HTMLAttributes } from "react";
import { Hero } from "../pages";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  hero: Hero;
  isSelected?: boolean;
}

const HeroPortrait: FC<Props> = ({ disabled, hero, isSelected, onClick }) => {
  return (
    <button
      className={classNames(["relative", "flex"], {
        [classNames(["outline", "outline-4", "outline-blue-700"])]: isSelected,
        ["grayscale"]: disabled,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      <Image
        src={`http://api.opendota.com${hero.img}`}
        alt={hero.localized_name}
        width="128"
        height="77"
      />
    </button>
  );
};

export default HeroPortrait;
