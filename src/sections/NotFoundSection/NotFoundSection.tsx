import * as S from "./elements";

export const NotFoundSection: React.FC = ({ ...props }) => {
  return (
    <S.SectionContainer {...props}>
      <S.Title variant='h1'>Page does not exits!</S.Title>
    </S.SectionContainer>
  );
};
