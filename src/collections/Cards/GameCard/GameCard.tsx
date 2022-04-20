import * as S from "./elements";
import { Image } from "~/components";

export const GameCard = ({ imgProps, ...props }) => {
  return (
    <S.Container {...props}>
      <Image {...imgProps} />
    </S.Container>
  );
};
