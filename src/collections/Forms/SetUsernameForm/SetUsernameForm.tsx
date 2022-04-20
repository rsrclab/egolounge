import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "~/utils";
import * as S from "./elements";

const setUsernameSchema = yup.object({
  username: yup
    .string()
    .required("Username field is required")
    .min(4, "Username must be minimum 4 characters long.")
    .max(16, "Username must be maximum 16 characters long.")
});

export const SetUsernameForm = ({ ...props }) => {
  const resolver = useYupValidationResolver(setUsernameSchema);
  const form = useForm({ resolver });

  const onSubmit = data => console.log(data);

  return (
    <S.Form {...props} onSubmit={form.handleSubmit(onSubmit)}>
      <S.Input form={form} placeholder='Username' labelText='Username' id='username' />

      <S.Button value='LOCK IT' type='submit' />
    </S.Form>
  );
};
