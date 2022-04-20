import * as S from "./elements";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "~/utils";

const registerSchema = yup.object({
  username: yup.string().required("You have to fill this field.")
});

export const ChangeUserPasswordForm: React.FC = ({ ...props }) => {
  const resolver = useYupValidationResolver(registerSchema);
  const form = useForm({ resolver });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <S.Form {...props} onSubmit={form.handleSubmit(onSubmit)}>
      <S.Input id='username' placeholder='Username' labelText='Username' form={form} />

      <S.Button value='Submit' type='submit' />
    </S.Form>
  );
};
