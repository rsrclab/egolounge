import { useContext } from "react";
import * as S from "./elements";
import { GameLinkPopup, UserAccountCard } from "~/collections";
import { epicGameAuthFlowEndPoints, games, steamEndPoints } from "~/data";
import { PopupContext, UserContext } from "~/context";
import { IGame } from "~/types";
import { useRouter } from "next/router";
import { auth, axiosInstance, updateUser } from "../../../lib";

const gamesData = games.map(({ implemented, smallLogoImg, linked, shorthand }) => ({
  smallLogoImg,
  linked,
  shorthand,
  implemented
}));

// const apexLegends = gamesData.find(x => x.shorthand === "apexLegends");
const csgo = gamesData.find(x => x.shorthand === "csgo");
const halo = gamesData.find(x => x.shorthand === "halo");
const dota = gamesData.find(x => x.shorthand === "dota");
const fortnite = gamesData.find(x => x.shorthand === "fortnite");
const leagueOfLegends = gamesData.find(x => x.shorthand === "leagueOfLegends");
const pubg = gamesData.find(x => x.shorthand === "pubg");
const valorant = gamesData.find(x => x.shorthand === "valorant");
const codWarzone = gamesData.find(x => x.shorthand === "codWarzone");

export const UserGamesSection: React.FC = ({ ...props }) => {
  const { gameLink } = useContext(PopupContext);
  const { user } = useContext(UserContext);
  const { gameAccounts, id } = user;
  const router = useRouter();
  // TODO: isLinked state should come from user

  const handleOpenGameLinkPopup = (shorthand: IGame["shorthand"]) => {
    gameLink.handleOpen(shorthand);
  };

  //Halo
  const handleLinkHaloOnClick = async () => {
    if (gameAccounts.halo) return;
    try {
      const goToMicrosoftConnectResponse = await axiosInstance.post(
        "https://egolounge.com/api/auth/microsoft/connect/",
        {
          game_name: "halo"
        },
        {
          headers: {
            Authorization: `bearer ${await auth.currentUser?.getIdToken()}`
          }
        }
      );
      router.push(goToMicrosoftConnectResponse.data.Redirect);
    } catch (e: any) {
      console.log(e);
      alert(e.response.data.errMsg);
    }
  };

  const handleUnlinkHaloOnClick = async () => {
    if (!id) return;
    await updateUser(id, { gameAccounts: { halo: null } });
    router.reload();
    console.log("Unlink Halo");
  };

  // //Apex
  // const handleLinkApexOnClick = () => {
  //   if (gameAccounts.apex) return;
  //   handleOpenGameLinkPopup("apexLegends");
  // };
  // const handleUnlinkApexOnClick = async () => {
  //   if (!id) return;
  //   await updateUser(id, { gameAccounts: { apex: null } });
  //   router.reload();
  //   console.log("Unlink Apex");
  // };

  //CSGO
  const handleLinkCsgoOnClick = async () => {
    if (gameAccounts.csgo) return;
    try {
      const goToSteamConnectResponse = await axiosInstance.post(
        "https://egolounge.com/api/auth/steam/connect",
        { game_name: "csgo" },
        { headers: { Authorization: `bearer ${await auth.currentUser?.getIdToken()}` } }
      );

      router.push(goToSteamConnectResponse.data.Redirect);
    } catch (e: any) {
      alert(e.response?.data.errMsg);
    }
  };

  const handleUnlinkCsgoOnClick = async () => {
    if (!id || !gameAccounts.csgo) return;
    await updateUser(id, { gameAccounts: { csgo: null } });
    router.reload();
    // await router.push(steamEndPoints.logout);
  };

  //Dota
  const handleLinkDotaOnClick = async () => {
    if (gameAccounts.dota) return;
    try {
      const goToSteamConnectResponse = await axiosInstance.post(
        steamEndPoints.connect,
        { game_name: "dota" },
        { headers: { Authorization: `bearer ${await auth.currentUser?.getIdToken()}` } }
      );

      router.push(goToSteamConnectResponse.data.Redirect);
    } catch (e: any) {
      alert(e.response.data.errMsg);
    }
  };

  const handleUnlinkDotaOnClick = async () => {
    if (!id || !gameAccounts.dota) return;
    await updateUser(id, { gameAccounts: { dota: null } });
    router.reload();
  };

  //Fortnite
  const handleLinkFortniteOnClick = async () => {
    if (gameAccounts.fortnite) return;
    try {
      const goToFortniteConnectResponse = await axiosInstance.post(
        epicGameAuthFlowEndPoints.login,
        { game_name: "fortnite" },
        { headers: { Authorization: `bearer ${await auth.currentUser?.getIdToken()}` } }
      );

      router.push(goToFortniteConnectResponse.data.Redirect);
    } catch (e: any) {
      alert(e.response.data.errMsg);
    }
    // await router.push(epicGameAuthFlowEndPoints.login + `/${access_token}`);
  };

  const handleUnlinkFortniteOnClick = async () => {
    if (!id || !gameAccounts.fortnite) return;
    await updateUser(id, { gameAccounts: { fortnite: null } });
    router.reload();
  };

  //LoL
  const handleLinkLeagueoflegendsOnClick = async () => {
    if (gameAccounts.leagueOfLegends) return;
    handleOpenGameLinkPopup("leagueOfLegends");
  };

  const handleUnlinkLeagueofLegendsOnClick = async () => {
    if (!id || !gameAccounts.leagueOfLegends) return;
    await updateUser(id, { gameAccounts: { leagueOfLegends: null } });
    router.reload();
  };

  //Pubg
  const handleLinkPubgOnClick = async () => {
    if (gameAccounts.pubg) return;
    try {
      const goToSteamConnectResponse = await axiosInstance.post(
        steamEndPoints.connect,
        { game_name: "pubg" },
        { headers: { Authorization: `bearer ${await auth.currentUser?.getIdToken()}` } }
      );

      router.push(goToSteamConnectResponse.data.Redirect);
    } catch (e: any) {
      alert(e.response.data.errMsg);
    }
  };

  const handleUnlinkPubgOnClick = async () => {
    if (!id || !gameAccounts.pubg) return;
    await updateUser(id, { gameAccounts: { pubg: null } });
    router.reload();
  };

  //Valorant
  const handleLinkValorantOnClick = async () => {
    if (gameAccounts.valorant) return;
    handleOpenGameLinkPopup("valorant");
  };

  const handleUnlinkValorantOnClick = async () => {
    if (!id || !gameAccounts.valorant) return;
    await updateUser(id, { gameAccounts: { valorant: null } });
    router.reload();
  };

  //CoD Warzone
  const handleLinkCodWarzoneOnClick = () => {
    handleOpenGameLinkPopup("codWarzone");
  };

  const handleUnlinkCodWarzoneOnClick = async () => {
    if (!id || !gameAccounts.codWarzone) return;
    await updateUser(id, { gameAccounts: { codWarzone: null } });
    router.reload();
  };

  return (
    <S.Container {...props}>
      <S.Title>Gaming Accounts</S.Title>
      {/* <S.Card>
        <UserAccountCard
          userId={`${
            gameAccounts.apex && gameAccounts.apex.originInfo
              ? `Origin ID : ` + gameAccounts.apex.originInfo.platformUserId
              : "Some User Csgo"
          }`}
          gameLogoImg={apexLegends?.smallLogoImg}
          isLinked={gameAccounts.apex}
          implemented={apexLegends ? apexLegends.implemented : false}
          linkOnClick={handleLinkApexOnClick}
          unlinkOnClick={handleUnlinkApexOnClick}
        />
      </S.Card> */}
      {/* <S.Card>
        <UserAccountCard
          userId={`${
            gameAccounts.codWarzone && gameAccounts.codWarzone.battleNetData
              ? `Battle.net ID: ${gameAccounts.codWarzone.battleNetData.battleNetId}`
              : "Error"
          }`}
          gameLogoImg={codWarzone?.smallLogoImg}
          isLinked={gameAccounts?.codWarzone}
          implemented={codWarzone ? codWarzone.implemented : false}
          linkOnClick={handleLinkCodWarzoneOnClick}
          unlinkOnClick={handleUnlinkCodWarzoneOnClick}
        />
      </S.Card> */}
      <S.Card>
        <UserAccountCard
          userId={`${
            gameAccounts.csgo && gameAccounts.csgo.steamData
              ? `Steam ID: ${gameAccounts.csgo.steamData.steamid}`
              : "Error"
          }`}
          gameLogoImg={csgo?.smallLogoImg}
          isLinked={gameAccounts?.csgo}
          implemented={csgo ? csgo.implemented : false}
          linkOnClick={handleLinkCsgoOnClick}
          unlinkOnClick={handleUnlinkCsgoOnClick}
        />
      </S.Card>
      <S.Card>
        <UserAccountCard
          userId={`${
            gameAccounts.dota && gameAccounts.dota.steamData
              ? `Steam ID: ${gameAccounts.dota.steamData.steamid}`
              : "Error"
          }`}
          gameLogoImg={dota?.smallLogoImg}
          isLinked={gameAccounts?.dota}
          implemented={dota ? dota.implemented : false}
          linkOnClick={handleLinkDotaOnClick}
          unlinkOnClick={handleUnlinkDotaOnClick}
        />
      </S.Card>
      <S.Card>
        <UserAccountCard
          userId={`${
            gameAccounts.fortnite && gameAccounts.fortnite.epicGameData
              ? `Epic Game ID: ${gameAccounts.fortnite.epicGameData.account_id}`
              : "Error"
          }`}
          gameLogoImg={fortnite?.smallLogoImg}
          isLinked={gameAccounts?.fortnite}
          implemented={fortnite ? fortnite.implemented : false}
          linkOnClick={handleLinkFortniteOnClick}
          unlinkOnClick={handleUnlinkFortniteOnClick}
        />
      </S.Card>
      <S.Card>
        <UserAccountCard
          userId={`${
            gameAccounts.halo && gameAccounts.halo.xboxData
              ? `Xbox ID: ${gameAccounts.halo.xboxData.xboxId}`
              : "Error"
          }`}
          gameLogoImg={halo?.smallLogoImg}
          isLinked={gameAccounts?.halo}
          implemented={halo ? halo.implemented : false}
          linkOnClick={handleLinkHaloOnClick}
          unlinkOnClick={handleUnlinkHaloOnClick}
        />
      </S.Card>
      <S.Card>
        <UserAccountCard
          userId={`${
            gameAccounts.leagueOfLegends && gameAccounts.leagueOfLegends.riotData?.name
              ? `Username: ${gameAccounts.leagueOfLegends.riotData?.name}`
              : "Error"
          }`}
          gameLogoImg={leagueOfLegends?.smallLogoImg}
          isLinked={gameAccounts?.leagueOfLegends}
          implemented={leagueOfLegends ? leagueOfLegends.implemented : false}
          linkOnClick={handleLinkLeagueoflegendsOnClick}
          unlinkOnClick={handleUnlinkLeagueofLegendsOnClick}
        />
      </S.Card>
      {/* <S.Card>
        <UserAccountCard
          userId={`${
            gameAccounts.pubg && gameAccounts.pubg.steamData
              ? `Steam ID: ${gameAccounts.pubg.steamData.pubgId}`
              : "Error"
          }`}
          gameLogoImg={pubg?.smallLogoImg}
          isLinked={gameAccounts?.pubg}
          implemented={pubg ? pubg.implemented : false}
          linkOnClick={handleLinkPubgOnClick}
          unlinkOnClick={handleUnlinkPubgOnClick}
        />
      </S.Card> */}
      <S.Card>
        <UserAccountCard
          userId={`${
            gameAccounts.valorant && gameAccounts.valorant.riotData?.gameName
              ? `Valorant Username: ${gameAccounts.valorant.riotData?.gameName}`
              : "Error"
          }`}
          gameLogoImg={valorant?.smallLogoImg}
          isLinked={gameAccounts?.valorant}
          implemented={true}
          linkOnClick={handleLinkValorantOnClick}
          unlinkOnClick={handleUnlinkValorantOnClick}
        />
      </S.Card>
      {gameLink.toggled && <GameLinkPopup />}
    </S.Container>
  );
};
