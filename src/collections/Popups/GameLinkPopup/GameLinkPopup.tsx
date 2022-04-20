import { useContext } from "react";
import {
  // ApexLegendsLinkForm,
  HaloLinkForm,
  CodWarzoneLinkForm,
  CSGOLinkForm,
  DotaLinkForm,
  FortniteLinkForm,
  LeagueOfLegendsLinkForm,
  PUBGLinkForm,
  ValorantLinkForm
} from "~/collections";
import { PopupContext } from "~/context";
import { PopupProps } from "~/types";
import * as S from "./elements";

export interface GameLinkPopupProps
  extends Omit<PopupProps, "children" | "toggled" | "toggleOnClick"> {}

const titles = {
  csgo: "CS:GO",
  halo: "Halo Infinite",
  fortnite: "Fortnite",
  leagueOfLegends: "League of Legends",
  pubg: "PUBG",
  dota: "DOTA",
  valorant: "Valorant",
  codWarzone: "Call of Duty: Warzone"
};

export const GameLinkPopup: React.FC<GameLinkPopupProps> = ({ ...props }) => {
  const {
    gameLink: { toggled, handleToggle },
    gameName
  } = useContext(PopupContext);

  return (
    <S.Popup {...props} toggled={toggled} toggleOnClick={handleToggle}>
      <S.Title>{titles[gameName]?.toUpperCase()}</S.Title>
      {gameName === "csgo" && <CSGOLinkForm />}
      {gameName === "halo" && <HaloLinkForm />}
      {/* {gameName === "apexLegends" && <ApexLegendsLinkForm />} */}
      {gameName === "fortnite" && <FortniteLinkForm />}
      {gameName === "leagueOfLegends" && (
        <LeagueOfLegendsLinkForm handleClosePopup={handleToggle} />
      )}
      {gameName === "pubg" && <PUBGLinkForm />}
      {gameName === "dota" && <DotaLinkForm />}
      {gameName === "valorant" && <ValorantLinkForm />}
      {gameName === "codWarzone" && <CodWarzoneLinkForm />}
    </S.Popup>
  );
};
