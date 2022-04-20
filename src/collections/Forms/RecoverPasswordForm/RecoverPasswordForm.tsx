import { useForm } from "react-hook-form";
import { PopupContext } from "~/context";
import { useContext } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "~/lib";
import * as S from "./elements";
import * as yup from "yup";
import { useYupValidationResolver } from "~/utils";

const registerSchema = yup.object({
  recoverPasswordEmail: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email field is required")
});
export const RecoverPasswordForm = ({ ...props }) => {
  const resolver = useYupValidationResolver(registerSchema);
  const form = useForm({ resolver });
  const { forgottenPassword, emailSent } = useContext(PopupContext);

  const onSubmit = data => {
    if (data.recoverPasswordEmail) {
      sendPasswordResetEmail(auth, data.recoverPasswordEmail)
        .then(res => {
          forgottenPassword.handleClose();
          emailSent.handleToggle();
        })
        .catch(err => {
          console.log("Error while sending recovery email: ", err);
        });
    }
  };

  return (
    <S.Form {...props} onSubmit={form.handleSubmit(onSubmit)}>
      <S.Input
        form={form}
        placeholder='Email Address'
        labelText='Email Address'
        id='recoverPasswordEmail'
      />

      <S.Button value='SEND RESET INSTRUCTIONS' type='submit' />
    </S.Form>
  );
};
