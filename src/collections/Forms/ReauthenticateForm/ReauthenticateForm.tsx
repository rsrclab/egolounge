import * as S from "./elements";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useYupValidationResolver } from "~/utils";
import { useContext, useEffect, useState } from "react";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  updatePassword
} from "firebase/auth";
import { PopupContext } from "~/context";
import { auth } from "~/lib";

const passwordMatch = /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9]).{8,}$/;

const reauthenticateSchema = yup.object({
  reauthenticatePassword: yup.string().required("Required field."),
  newEmail: yup.string().email("Invalid email address"),
  newPassword: yup
    .string()
    .matches(passwordMatch, { message: "Password must contain Uppercase, Lowercase and Number" })
    .min(8, "Password must be at least 8 characters"),
  confirmNewPassword: yup.string().oneOf([yup.ref("newPassword")], "Passwords don't match")
});

export interface ReauthenticateFormProps {
  title?: string;
  description?: string;
  submitBtnText?: string;
  onSubmit?: () => void;
  cancelBtnText?: string;
  onCancel?: () => void;
  disableSubmitBtn?: boolean;
  closePopupHandle?: () => void;
}

export const ReauthenticateForm: React.FC<ReauthenticateFormProps> = ({
  title,
  description,
  disableSubmitBtn = false,
  submitBtnText = "REAUTHENTICATE",
  onSubmit,
  cancelBtnText = "CANCEL",
  onCancel,
  closePopupHandle,
  ...props
}) => {
  const { reauthenticate, reauthenticateForm } = useContext(PopupContext);
  const [error, setError] = useState("");
  const [reauthenticated, setReauthenticated] = useState(false);

  const resolver = useYupValidationResolver(reauthenticateSchema);
  const form = useForm({ resolver });

  const handleSubmit = async data => {
    try {
      setError("");
      const user = auth?.currentUser;

      if (user) {
        const credential = EmailAuthProvider.credential(
          user?.email as string,
          data.reauthenticatePassword
        );

        const res = await reauthenticateWithCredential(user, credential);

        if (res) {
          setReauthenticated(true);
          onSubmit && onSubmit();

          if (data.newPassword && data.confirmNewPassword) {
            updatePassword(user, data.newPassword);

            reauthenticate.handleClose();
            setReauthenticated(false);
          } else if (data.newEmail) {
            updateEmail(user, data.newEmail);

            reauthenticate.handleClose();
            setReauthenticated(false);
          } else {
            console.log("Unsuccessful change.");
          }
        }
      }
    } catch (e) {
      setError("Invalid Password");
    }
  };

  return (
    <S.Form {...props} onSubmit={form.handleSubmit(handleSubmit)}>
      <S.Title>Please Reauthenticate</S.Title>
      {description?.length && <S.Description>{description}</S.Description>}
      {!reauthenticated && (
        <S.Input
          form={form}
          id='reauthenticatePassword'
          placeholder='Password'
          type='password'
          labelText='Your Password'
        />
      )}
      {!reauthenticated && error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      {reauthenticated && reauthenticateForm === "email" && (
        <S.Input
          form={form}
          id='newEmail'
          type='text'
          placeholder='New Email'
          labelText='New Email'
        />
      )}
      {reauthenticated && reauthenticateForm === "password" && (
        <>
          <S.Input
            form={form}
            id='newPassword'
            type='password'
            placeholder='New Password'
            labelText='New Password'
          />
          <S.Input
            form={form}
            id='confirmNewPassword'
            type='password'
            placeholder='Confirm New Password'
            labelText='Confirm New Password'
          />
        </>
      )}

      <S.Actions>
        <S.Button value={cancelBtnText} onClick={closePopupHandle} type='button' />
        <S.Button value='SUBMIT' type='submit' />
      </S.Actions>
    </S.Form>
  );
};
