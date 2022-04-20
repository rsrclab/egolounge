import styled from "styled-components";
import { ReauthenticatePopup } from "~/collections";
import { Button, Input } from "~/components";

export const UserSectionWrapperContainer = styled(({ ...props }) => <div {...props} />)`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 30px;
`;

export const UserSectionActions = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
`;

export const UserSectionCloseAccountButton = styled(({ ...props }) => (
  <Button {...props} variant='contained' typography={{ variant: "h4", weight: 700 }} />
))`
  min-width: 210px;
`;

export const CloseAccountPopup = styled(({ ...props }) => <ReauthenticatePopup {...props} />)``;

export const CloseAccountInput = styled(({ ...props }) => <Input {...props} />)`
  margin: 25px 0;

  input {
    font-size: 16px;
  }
`;
