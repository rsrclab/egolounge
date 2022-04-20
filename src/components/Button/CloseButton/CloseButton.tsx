import { ButtonProps } from "~/types";
import * as S from "./elements";

export const CloseButton: React.FC<Omit<ButtonProps, "value">> = ({ ...props }) => {
  return <S.CloseButton {...props} />;
};
