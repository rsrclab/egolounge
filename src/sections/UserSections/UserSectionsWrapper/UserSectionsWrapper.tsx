import { useContext } from "react";
import { PopupContext } from "~/context";
import * as S from "./elements";

export const UserSectionsWrapper = ({ children, ...props }) => {
  // const { closeAccountPopupToggled, handleSetCloseAccountPopupToggled } = useContext(PopupContext);
  const userPassword = "test";
  let userInput = "";

  // const handleCloseAccount = () => {
  //   if (userInput === userPassword) {
  //     // handleSetCloseAccountPopupToggled();
  //   } else {
  //   }
  // };

  const handlePasswordOnChange = e => {
    userInput = e.target.value;
  };

  return (
    <S.UserSectionWrapperContainer {...props}>
      {children}
      <S.UserSectionActions>
        {/* <S.UserSectionCloseAccountButton
          value='CLOSE ACCOUNT'
          onClick={handleSetCloseAccountPopupToggled}
        />

        {closeAccountPopupToggled && (
          <S.CloseAccountPopup
            title="Close your account? Contant us if you'd like to rejoin in the future."
            toggled={closeAccountPopupToggled}
            toggleOnClick={handleSetCloseAccountPopupToggled}
            submitBtnText='CLOSE'
            onSubmit={handleCloseAccount}
          >
            <S.CloseAccountInput
              labelText='Confirm Password'
              placeholder='Confirm Password'
              onChange={handlePasswordOnChange}
              type='password'
            />
          </S.CloseAccountPopup>
        )} */}
      </S.UserSectionActions>
    </S.UserSectionWrapperContainer>
  );
};
