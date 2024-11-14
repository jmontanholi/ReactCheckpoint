import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./IconButton.module.scss";
import { MouseEventHandler } from "react";

interface IconButtonPropsInterface {
  handleClick: MouseEventHandler;
  className?: string;
  icon: IconDefinition;
  ariaLabel: string;
}

function IconButton({
  handleClick,
  className,
  icon,
  ariaLabel,
}: IconButtonPropsInterface) {
  return (
    <FontAwesomeIcon
      role="button"
      aria-label={ariaLabel}
      onClick={handleClick}
      className={`${style["icon-button"]} ${className ? className : ""}`}
      icon={icon}
    />
  );
}

export default IconButton;
