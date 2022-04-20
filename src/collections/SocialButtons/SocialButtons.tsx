import * as S from "./elements";
import { SocialButton } from "~/components";
import { MicrosoftLogo, TwitterLogo, DiscordLogo, FacebookLogo, SteamLogo } from "~/assets";
import { FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import { auth, axiosInstance } from "../../lib";

export const SocialButtons: React.FC = () => {
  const navigate = useRouter();
  const handleMicrosoftClick = async () => {
    try {
      const goToMicrosoftConnectResponse = await axiosInstance.post(`api/auth/microsoft/connect`);
      navigate.push(goToMicrosoftConnectResponse.data.Redirect);
    } catch (e: any) {
      alert(e.response.data.errMsg);
    }
  };

  const handleSteamClick = async () => {
    try {
      const goToSteamConnectResponse = await axiosInstance.post(`api/auth/steam/connect/`);
      navigate.push(goToSteamConnectResponse.data.Redirect);
    } catch (e: any) {
      alert(e.response.data.errMsg);
    }
  };

  const handleDiscordClick = async () => {
    try {
      const goToDiscordLoginResponse = await axiosInstance.post(`api/auth/discord/login/`);
      navigate.push(goToDiscordLoginResponse.data.Redirect);
    } catch (e: any) {
      alert(e.response.data.errMsg);
    }
  };

  return (
    <S.SocialsContainer>
      {/* TODO WHEN NEW VERSION OF TWITCH PUBLISHED WILL BE ACTIVATE AGAIN <SocialButton provider={OAuthProvider} Icon={TwitchLogo} backgroundColor='#4C16BE' /> */}
      <SocialButton
        providerConfig={{
          provider: handleMicrosoftClick
        }}
        Icon={MicrosoftLogo}
        backgroundColor='#ffffff'
        isCustomProvider
      />
      <SocialButton
        providerConfig={{
          provider: handleDiscordClick
        }}
        Icon={DiscordLogo}
        backgroundColor='#6A6DB0'
        isCustomProvider
      />
      <SocialButton
        isCustomProvider
        providerConfig={{ provider: handleSteamClick }}
        Icon={SteamLogo}
        backgroundColor='#0C1B33'
      />
      <SocialButton
        providerConfig={{ provider: FacebookAuthProvider }}
        Icon={FacebookLogo}
        backgroundColor='#1258B4'
      />
      <SocialButton
        providerConfig={{ provider: TwitterAuthProvider }}
        Icon={TwitterLogo}
        backgroundColor='#37ABFF'
      />
    </S.SocialsContainer>
  );
};
