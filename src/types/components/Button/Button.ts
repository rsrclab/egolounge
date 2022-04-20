import { TypographyProps } from "~/types";

export interface ButtonProps {
  href?: string;
  value: string;
  color?: "primary" | "secondary";
  borderColor?: "primary" | "whiteFA";
  typography?: TypographyProps;
  variant?: "outlined" | "contained" | "text";
  backgroundColor?: string;
  onClick?: () => void;
}
