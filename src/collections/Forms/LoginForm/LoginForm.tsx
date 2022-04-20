import { useState } from "react";
import { useForm } from "react-hook-form";
import { signInUserLocalStrategy } from "../../../lib/firebase/init";
import * as S from "./elements";

export const LoginForm = ({ onSubmit, ...props }) => {
  const form = useForm();
  const [error, setError] = useState(false);

  const handleOnSubmit = async data => {
    try {
      const res = await signInUserLocalStrategy({
        email: data.usernameOrEmailLogin,
        password: data.passwordLogin
      });

      onSubmit && onSubmit();
    } catch (e) {
      setError((e as any)?.code);
    }
  };

  return (
    <S.LoginForm {...props} onSubmit={form.handleSubmit(handleOnSubmit)}>
      <S.Input
        type='text'
        placeholder='Email Address'
        labelText='Email Address'
        form={form}
        id='usernameOrEmailLogin'
      />

      <S.Input
        type='password'
        placeholder='Password'
        labelText='Password'
        form={form}
        id='passwordLogin'
      />
      <S.RememberMeCheckbox id='rememberMeLoginCheckbox' form={form}>
        Remember me
      </S.RememberMeCheckbox>
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      <S.Button value='LOGIN' type='submit' />
    </S.LoginForm>
  );
};
