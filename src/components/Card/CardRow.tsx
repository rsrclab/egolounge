import * as S from "./elements";

export const CardRow = ({ children, ...props }) => {
  return <S.Row {...props}>{children}</S.Row>;
};
