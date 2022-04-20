import * as S from "./elements";
import { AccountDetailsForm } from "~/collections";
import { useContext } from "react";
import { UserContext } from "~/context";

export const UserDetailsSection: React.FC = ({ ...props }) => {
  const { user } = useContext(UserContext);

  return (
    <S.SectionContainer {...props}>
      <S.HeadContainer>
        <S.Title>{user?.username}</S.Title>
        <S.Subtitle>(Username can not be changed)</S.Subtitle>
      </S.HeadContainer>
      <AccountDetailsForm />
    </S.SectionContainer>
  );
};
