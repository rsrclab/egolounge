import * as S from "./elements";
import { DiscordLogo } from "~/assets";

export const DiscordCTA: React.FC = ({ ...props }) => {
  return (
    <S.SectionContainer {...props}>
      <S.InnerSectionContainer>
        <S.Title>Chill @ our Discord, whether you’re social or competitive.</S.Title>
        <S.DiscordCTALink href='https://discord.gg/ego'>
          <DiscordLogo />
        </S.DiscordCTALink>
      </S.InnerSectionContainer>
    </S.SectionContainer>
  );
};

// FIXME: This is a different button, it is not a login button.
