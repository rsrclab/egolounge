import * as S from "./elements";

export const Footer: React.FC = ({ ...props }) => {
  return (
    <S.FooterContainer {...props}>
      <S.Copyright>EGO Lounge © - All rights reserved</S.Copyright>

      <S.TermsAndPoliciesLink href='/privacy'>Terms and Policies</S.TermsAndPoliciesLink>
    </S.FooterContainer>
  );
};
