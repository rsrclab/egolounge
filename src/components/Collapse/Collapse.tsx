import * as S from "./elements";

export const Collapse = ({ children, ...props }) => {
  return <S.Collapse {...props}>{children}</S.Collapse>;
};
