import * as S from "./elements";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "~/lib";

export const EmailVerifiedSection: React.FC = ({ ...props }) => {
  const [second, setSecond] = useState(5);
  const router = useRouter();
  const { email } = router.query;

  useEffect(() => {
    if (!email) router.push("/");
  }, [email, router]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (second === 0) {
        return router.push("/");
      }
      return setSecond(second - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [router, second]);

  return (
    <S.Container {...props}>
      <S.Content>
        <S.Text>
          <RegisterSuccessMessage email={email} />
        </S.Text>
        <S.Text>
          You will automatically be redirected to the homepage within <span>{second}</span> seconds.
        </S.Text>
      </S.Content>
    </S.Container>
  );
};

const RegisterSuccessMessage: React.FC<{ email?: string | string[] }> = ({ email }) => {
  const msg = !auth.currentUser
    ? null
    : "Please Sign in and connect any game account to Create or Join Competitions.";

  return (
    <>
      Thank you for verifying your email <span>{email}</span> - {msg}
    </>
  );
};
