import style from "./Logo.module.scss";

interface LogoProps {
  className?: string;
}

function Logo({ className }: LogoProps) {
  return (
    <h1
      aria-label="logo"
      className={`${style["logo"]} ${className ? className : ""}`}
    >
      cottage core
    </h1>
  );
}

export default Logo;
