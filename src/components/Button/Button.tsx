import * as S from "./elements";
import { ButtonProps } from "~/types";

export const Button: React.FC<ButtonProps> = ({
  children,
  typography = { variant: "h5" },
  value,
  ...props
}) => {
  return (
    <S.Button {...props}>
      <S.Typography {...typography}>{value || children}</S.Typography>
    </S.Button>
  );
};
