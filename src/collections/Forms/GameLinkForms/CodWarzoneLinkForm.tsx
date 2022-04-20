import * as S from "./elements";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "~/utils";
import { battleNetAuthFlowEndPoints, battleNetRegions } from "../../../data";
import { FormEvent, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../../context";
import { axiosInstance } from "../../../lib";
import { auth } from "~/lib";

const registerSchema = yup.object({
  username: yup.string().required("You have to fill this field."),
  codRegion: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string().required("You have to choose region.")
    })
    .nullable()
});

const codRegions = [
  { value: battleNetRegions.us.value, label: battleNetRegions.us.label },
  { value: battleNetRegions.eu.value, label: battleNetRegions.eu.label },
  { value: battleNetRegions.tw.value, label: battleNetRegions.tw.label },
  { value: battleNetRegions.kr.value, label: battleNetRegions.kr.label }
];

export const CodWarzoneLinkForm: React.FC = ({ ...props }) => {
  const resolver = useYupValidationResolver(registerSchema);
  const router = useRouter();
  const form = useForm({ resolver });
  const { user } = useContext(UserContext);
  const { gameAccounts } = user;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (gameAccounts.codWarzone) return;
    const region = (form.getValues() as any).codRegion.value;
    try {
      const goToBattleNetAuthorizationUriResponse = await axiosInstance.post(
        battleNetAuthFlowEndPoints.login,
        {
          region,
          game_name: "codWarzone"
        },
        { headers: { Authorization: `bearer ${await auth.currentUser?.getIdToken()}` } }
      );
      router.push(goToBattleNetAuthorizationUriResponse.data.Redirect);
    } catch (e: any) {
      alert(e.response.data.errMsg);
    }
    // console.log(data);
  };

  return (
    <S.Form {...props} onSubmit={(e: FormEvent) => onSubmit(e)}>
      {/* <S.Input id='username' placeholder='Username' labelText='Username' form={form} /> */}
      <S.DropdownContainer>
        <S.DropdownLabel>Select Region:</S.DropdownLabel>
        <S.Dropdown
          id='codRegion'
          options={codRegions || [{ value: "", label: "Select region." }]}
          defaultValue={{ value: battleNetRegions.us.value, label: "Regions" }}
          form={form}
        />
      </S.DropdownContainer>
      <S.Button value='Submit' type='submit' />
    </S.Form>
  );
};
