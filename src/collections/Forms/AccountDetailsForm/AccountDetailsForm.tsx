import * as S from "./elements";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "~/utils";
import { useContext, useEffect, useState } from "react";
import { games } from "~/data";
import { PopupContext, UserContext } from "~/context";
import { ReauthenticatePopup } from "~/collections";
import { axiosInstance } from "~/lib";

const passwordMatch = /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9]).{8,}$/;

const registerSchema = yup.object({
  accountDetailsEmail: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email field is required"),
  accountDetailsConfirmEmail: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email field is required")
    .oneOf([yup.ref("accountDetailsEmail")], "Emails don't match"),
  accountDetailsPassword: yup
    .string()
    .required("Password field is required")
    .matches(passwordMatch, { message: "Password must contain Uppercase, Lowercase and Number" })
    .min(8, "Password must be at least 8 characters"),
  accountDetailsConfirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("accountDetailsPassword")], "Passwords don't match")
});

export const AccountDetailsForm = ({ ...props }) => {
  const resolver = useYupValidationResolver(registerSchema);
  const form = useForm({ resolver });
  const { user, setUserField } = useContext(UserContext);
  const { reauthenticate } = useContext(PopupContext);
  const linkedGames = Object.keys(user.gameAccounts).filter(
    game => user.gameAccounts[game] !== null
  );
  const primaryGamesSelection = games
    .map(({ name, shorthand }) => ({
      value: shorthand,
      label: name
    }))
    .filter(name => linkedGames.find(linkedGame => linkedGame === name.value));
  const [currentPrimaryGame, setCurrentPrimaryGamesSelection] = useState(user?.primaryGame);

  useEffect(() => {
    if (user?.primaryGame) setCurrentPrimaryGamesSelection(user?.primaryGame);
  }, [currentPrimaryGame, user]);

  const handleSetCurrentPrimaryGameOnChange = async e => {
    try {
      await axiosInstance.put(`/api/competitor/update/primary-game`, {
        userId: user.id,
        newPrimaryGame: e.value
      });

      setCurrentPrimaryGamesSelection(e.label);
      setUserField("primaryGame", e.label);
      form.setValue("primaryGameSelect" as never, { label: e.label, value: e.label } as never);
    } catch (e) {
      console.log(e);
      console.log("err updating primary game");
    }
  };

  const handleInitiateEmailChange = () => {
    // handleSetReauthenticateChanges("email");
    // handleSetReauthenticatePopupToggle();
    reauthenticate.handleOpen("email");
  };

  const handleInitiatePasswordChange = () => {
    // handleSetReauthenticateChanges("password");
    // handleSetReauthenticatePopupToggle();
    reauthenticate.handleOpen("password");
  };

  return (
    <>
      <S.FieldsContainer {...props}>
        <S.FieldContainer>
          Email address: <span>{user.email}</span>
          <S.Button onClick={handleInitiateEmailChange}>change</S.Button>
        </S.FieldContainer>
        <S.FieldContainer>
          Password: <span>********</span>
          <S.Button onClick={handleInitiatePasswordChange}>change</S.Button>
        </S.FieldContainer>
        <S.FieldContainer>
          Primary game:
          <S.Select
            id='primaryGameSelect'
            onChange={handleSetCurrentPrimaryGameOnChange}
            options={primaryGamesSelection}
            defaultValue={
              primaryGamesSelection.find(e => e.value === currentPrimaryGame) || {
                value: "",
                label: ""
              }
            }
            form={form}
          />
        </S.FieldContainer>
      </S.FieldsContainer>
      {reauthenticate.toggled && <ReauthenticatePopup />}
    </>
  );
};
