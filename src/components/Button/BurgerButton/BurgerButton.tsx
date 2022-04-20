import * as S from "./elements";
import { BurgerButtonProps } from "~/types";

export const BurgerButton: React.FC<BurgerButtonProps> = ({ toggled, onClick, ...props }) => {
  return (
    <S.Container {...props} toggled={toggled} onClick={onClick}>
      <S.Button toggled={toggled} />
    </S.Container>
  );
};
