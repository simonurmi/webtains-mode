import classNames from "classnames";
import type { NextPage } from "next";
import GameButton, { Variant } from "../../components/GameButton";

const Buttons: NextPage = () => {
  return (
    <div className={classNames(["container", "mx-auto", "space-x-4", "space-y-4"])}>
      <GameButton className={classNames(['flex-auto'])}
        variant={Variant.PICK}
        disabled={false}
        text="Pick Techies" />

      <GameButton className={classNames(['flex-auto'])}
        variant={Variant.BAN}
        disabled={false}
        text="Ban Riki" />

      <GameButton className={classNames(['flex-auto'])}
        variant={Variant.DEFAULT}
        disabled={false}
        text="Start game" />
    </div>
  )
}

export default Buttons;
