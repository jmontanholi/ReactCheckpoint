import style from "./Logo.module.scss";

interface LogoProps {
  className?: string;
}

function Logo({ className }: LogoProps) {
  return (
    <p
      aria-label="logo"
      className={`${style["logo"]} ${className ? className : ""}`}
    >
      cottage core
    </p>
  );
}

export default Logo;
