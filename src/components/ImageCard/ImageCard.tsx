import * as S from "./elements";

interface CardProps {
  children: React.ReactNode[];
}

export const ImageCard: React.FC<CardProps> = ({ children, ...props }) => {
  return <S.CardContainer {...props}>{children}</S.CardContainer>;
};
