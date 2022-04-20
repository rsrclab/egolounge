import type { NextPage } from "next";
import { Hero } from "~/sections";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../../../lib";

const RegisterError: NextPage = () => {
  const [second, setSecond] = useState(5);
  const router = useRouter();
  const { msg } = router.query;

  useEffect(() => {
    if (!msg) router.push("/");
  }, [msg, router]);

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
    <main>
      <Hero text='SUCCESS' />
      <div style={{ color: "white", textAlign: "center", margin: "200px 0" }}>
        <RegisterErrorMessage msg={msg} />
        <p>You will automatically be redirected to the homepage within {second} seconds.</p>
      </div>
    </main>
  );
};
const RegisterErrorMessage: React.FC<{ msg?: string | string[] }> = ({ msg }) => {
  return (
    <>
      {auth.currentUser ? (
        auth.currentUser.emailVerified ? (
          <h2>User email has been verified already for {auth.currentUser?.email}</h2>
        ) : (
          <h2>
            Verifiying email is not completed for {auth.currentUser?.email}. {msg}
          </h2>
        )
      ) : (
        <h2>Verifiying email is not completed .{msg}</h2>
      )}
    </>
  );
};

export default RegisterError;
