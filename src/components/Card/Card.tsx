import * as S from "./elements";

export const Card = ({ children, ...props }) => {
  return <S.Container {...props}>{children}</S.Container>;
};
