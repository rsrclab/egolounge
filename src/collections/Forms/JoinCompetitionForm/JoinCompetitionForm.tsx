import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { PopupContext, UserContext } from "~/context";
import { useAuthorization } from "~/hooks";
import { auth } from "~/lib";
import { useYupValidationResolver } from "~/utils";
import * as yup from "yup";
import * as S from "./elements";
import axios from "axios";
import { useRouter } from "next/router";
import { RedirectToAccountPopup } from "~/collections";

const registerSchema = yup.object({
  joinCompetitionCode: yup.string().length(20, "").required("")
});

export const JoinCompetitionForm = ({ ...props }) => {
  const { redirectToAccount } = useContext(PopupContext);
  const [code, setCode] = useState("");
  const resolver = useYupValidationResolver(registerSchema);
  const form = useForm({ resolver });
  const { actionWithLoggedInAndVerified } = useAuthorization();
  const { user } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [gameName, setGameName] = useState("");
  const router = useRouter();

  const handleSetCodeOnChange = e => {
    setCode(e.target.value);
    error && setError(false);
  };

  const handleOnJoinNow = () =>
    actionWithLoggedInAndVerified(async () => {
      if (code && auth.currentUser?.uid) {
        try {
          const res = await axios.get(
            `/api/competition/update/player-joined?competitionId=${code}&userId=${user.id}`
          );

          router.push(`/competition/${code}`);
          // console.log(res.data.success);
        } catch (e) {
          console.log(e);
          if ((e as any).response.data.message.includes("is not linked.")) {
            redirectToAccount.handleToggle();
            setGameName((e as any)?.response?.data?.gameName);
          } else {
            !(e as any)?.response?.data?.success && setError((e as any).response.data.message);
          }
        }
      }
    });

  const onSubmit = d => {};

  return (
    <>
      <S.Form {...props} onSubmit={form.handleSubmit(onSubmit)}>
        <S.InputContainer>
          <S.Input
            form={form}
            id='joinCompetitionCode'
            placeholder='Competition Code'
            labelText='Competition Code'
            value={code}
            onChange={handleSetCodeOnChange}
          />
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </S.InputContainer>
        <S.Button onClick={handleOnJoinNow} value='JOIN NOW' type='submit' />
      </S.Form>

      {redirectToAccount.toggled && <RedirectToAccountPopup gameName={gameName} />}
    </>
  );
};
