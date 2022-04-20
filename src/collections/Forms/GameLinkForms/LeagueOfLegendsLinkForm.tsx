import * as S from "./elements";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useYupValidationResolver } from "~/utils";
import { useContext, useState } from "react";
import { UserContext } from "~/context";
import { auth, axiosInstance } from "../../../lib";
import { useRouter } from "next/router";

const continents = [
  { value: "AMERICAS", label: "Americas" },
  { value: "ASIA", label: "Asia" },
  { value: "EUROPE", label: "Europe" }
];

const europeRegions = [
  { value: "TR1", label: "TR" },
  { value: "EUN1", label: "EUNE" },
  { value: "EUW1", label: "EUW" }
];

const americasRegions = [
  { value: "LA1", label: "LA1" },
  { value: "LA2", label: "LA2" },
  { value: "NA1", label: "NA" },
  { value: "BR1", label: "BR" }
];

const asiaRegions = [
  { value: "JP1", label: "JP" },
  { value: "KR", label: "KR" },
  { value: "OC1", label: "OC" },
  { value: "RU", label: "RU" }
];

const registerSchema = yup.object({
  // username: yup.string().required("You have to fill this field."),
  lolRegion: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string().required("You have to choose region.")
    })
    .nullable(),
  lolContinent: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string()
    })
    .nullable()
});

export const LeagueOfLegendsLinkForm = ({ handleClosePopup, ...props }) => {
  const { user } = useContext(UserContext);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const resolver = useYupValidationResolver(registerSchema);
  const form = useForm({ resolver });

  const onSubmit = async (data: any) => {
    const region = data.lolRegion.value.toLowerCase();
    const continent = data.lolContinent.value.toLowerCase();
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
        { game_name: "leagueOfLegends", region, continent },
        { headers: { Authorization: `bearer ${await auth.currentUser?.getIdToken()}` } }
      );
      localStorage.setItem("setLeagueOfLegends", "1");
      return router.push(goToRsoConnectResponse.data.Redirect);
    } catch (e: any) {
      return alert(e.response.data.errMsg);
    }
  };

  const handleSetSelectedContinent = continent => {
    setSelectedContinent(continent);
    form.resetField("lolRegion" as never);
  };

  return (
    <S.Form {...props} onSubmit={form.handleSubmit(onSubmit)}>
      {/* <S.Input id='username' placeholder='Summoner Name' labelText='Summoner Name' form={form} /> */}
      <S.DropdownContainers>
        <S.DropdownContainer>
          <S.DropdownLabel>Select Continent:</S.DropdownLabel>
          <S.Dropdown
            id='lolContinent'
            options={continents}
            defaultValue={{ value: "", label: "Continents" }}
            onChange={value => {
              handleSetSelectedContinent(value.label);
              form.setValue("lolContinent" as never, value as never);
            }}
            form={form}
          />
        </S.DropdownContainer>
        <S.DropdownContainer>
          <S.DropdownLabel>Select Region:</S.DropdownLabel>
          <S.Dropdown
            id='lolRegion'
            options={
              (selectedContinent === "Asia" && asiaRegions) ||
              (selectedContinent === "Americas" && americasRegions) ||
              (selectedContinent === "Europe" && europeRegions) || [
                { value: "", label: "Select continent." }
              ]
            }
            defaultValue={{ value: "", label: "Regions" }}
            form={form}
          />
        </S.DropdownContainer>
      </S.DropdownContainers>
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      <S.Button value='Submit' type='submit' />
    </S.Form>
  );
};
