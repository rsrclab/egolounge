import * as S from "./elements";

export const CompetitionTable = ({ children, ...props }) => {
  return <S.Table {...props}>{children}</S.Table>;
};
