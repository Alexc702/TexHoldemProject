import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "text";
    fullWidth?: boolean;
  }
>;

export function Button({
  variant = "primary",
  fullWidth = true,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button button-${variant} ${fullWidth ? "button-full" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
