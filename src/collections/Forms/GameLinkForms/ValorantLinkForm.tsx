import * as S from "./elements";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "~/utils";
import { auth, axiosInstance } from "../../../lib";
import { useRouter } from "next/router";

const registerSchema = yup.object({
  continent: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string().required("You have to choose continent.")
    })
    .nullable()
});

const continents = [
  { value: "LATAM", label: "Latin America (LATAM)" },
  { value: "BR", label: "Brazil" },
  { value: "EU", label: "Europe" },
  { value: "KR", label: "Korea" },
  { value: "NA", label: "North America" },
  { value: "AP", label: "Asia Pacific" }
];

export const ValorantLinkForm: React.FC = ({ ...props }) => {
  const resolver = useYupValidationResolver(registerSchema);
  const router = useRouter();
  const form = useForm({ resolver });

  const onSubmit = async data => {
    console.log(data);
    const continent = data.continent.value.toLowerCase();

    if (
      localStorage.getItem("setValorant") === "1" ||
      localStorage.getItem("setLeagueOfLegends") === "1"
    ) {
      const goToRsoLogoutResponse = await axiosInstance.post("/api/auth/rso/logout/");
      localStorage.setItem("setValorant", "0");
      localStorage.setItem("setLeagueOfLegends", "0");
      return window.open(goToRsoLogoutResponse.data.Redirect);
    }
    try {
      const goToRsoConnectResponse = await axiosInstance.post(
        "/api/auth/rso/connect/",
        { game_name: "valorant", continent },
        { headers: { Authorization: `bearer ${await auth.currentUser?.getIdToken()}` } }
      );
      localStorage.setItem("setValorant", "1");
      return router.push(goToRsoConnectResponse.data.Redirect);
    } catch (e: any) {
      return alert(e.response.data.errMsg);
    }
  };

  return (
    <S.Form {...props} onSubmit={form.handleSubmit(onSubmit)}>
      <S.DropdownContainer>
        <S.DropdownLabel>Select Continent:</S.DropdownLabel>
        <S.Dropdown
          id='continent'
          options={continents}
          defaultValue={{ value: "", label: "Continents" }}
          form={form}
        />
      </S.DropdownContainer>
      <S.Button value='Submit' type='submit' />
    </S.Form>
  );
};
