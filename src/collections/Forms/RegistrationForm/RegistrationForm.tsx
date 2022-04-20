import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import * as S from "./elements";
import { createUserLocalStrategy } from "~/lib";
import { useYupValidationResolver } from "~/utils";
import { signOut } from "../../../lib/firebase/init";
import { UserContext } from "../../../context/UserContext";

const passwordMatch = /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9]).{8,}$/;

const registerSchema = yup.object({
  username: yup
    .string()
    .required("Username field is required")
    .matches(/^[aA-zZ0-9]+$/, "Only characters and numbers are allowed.")
    .min(4, "Username must be minimum 4 characters long.")
    .max(16, "Username must be maximum 16 characters long."),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email field is required"),
  password: yup
    .string()
    .required("Password field is required")
    .matches(passwordMatch, { message: "Password must contain Uppercase, Lowercase and Number" })
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords don't match"),
  agreedToToS: yup.boolean().oneOf([true], "Terms and Policies must be checked")
});

interface RegistrationFormProps {
  onSubmit?: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, ...props }) => {
  const { authenticated } = useContext(UserContext);
  const router = useRouter();
  const resolver = useYupValidationResolver(registerSchema);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const form = useForm({ resolver });
  const [error, setError] = useState(false);

  useEffect(() => {
    if (authenticated !== "unauthenticated" && !registrationSuccess) {
      router.push("/");
    }
  }, []);

  const handleOnSubmit = async data => {
    try {
      if (data.password === data.confirmPassword) {
        const user = await createUserLocalStrategy(data);
        signOut();
        setRegistrationSuccess(true);
        onSubmit && onSubmit();
      }
    } catch (e) {
      setError((e as any)?.code);
    }
  };

  return !registrationSuccess || authenticated === "authenticated" ? (
    <S.Form {...props} onSubmit={form.handleSubmit(handleOnSubmit)}>
      <S.Input form={form} placeholder='Username' labelText='Username' id='username' />
      <S.Input form={form} placeholder='Email' labelText='Email' id='email' />
      <S.Input
        form={form}
        placeholder='Password'
        type='password'
        labelText='Password'
        id='password'
      />
      <S.Input
        form={form}
        placeholder='Confirm Password'
        type='password'
        labelText='Confirm Password'
        id='confirmPassword'
      />
      <S.TOSContainer>
        <S.TOSText>
          I agree to the
          <Link href='/privacy'>
            <a>
              <S.HighlightedText>Terms and Policies</S.HighlightedText>
            </a>
          </Link>
          provided by egolounge.com, and certify that I am above the age of 18.
        </S.TOSText>
        <S.Checkbox id='agreedToToS' form={form} />
      </S.TOSContainer>
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      <S.Button value='REGISTER' type='submit' />
    </S.Form>
  ) : (
    <div style={{ color: "white", width: "100%" }}>
      <h2>Thank you for registering!</h2>
      <h2>Please check your email to complete registration.</h2>
    </div>
  );
};
