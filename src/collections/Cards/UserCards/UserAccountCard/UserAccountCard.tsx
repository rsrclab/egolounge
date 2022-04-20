import { IconProps, IGame } from "~/types";
import Link from "next/link";
import * as S from "./elements";
import { ArrowIcon } from "~/assets";
import { theme } from "~/styles";
import { ImageProps } from "next/image";

interface UserAccountCardProps {
  Logo?: React.FC<IconProps>;
  gameLogoImg?: Pick<ImageProps, "src" | "height" | "width">;
  name?: string;
  isLinked?: boolean;
  userId?: string;
  implemented: boolean;
  linkOnClick?: (gameName: IGame["shorthand"]) => void;
  unlinkOnClick?: (gameName: IGame["shorthand"]) => void;
}

export const UserAccountCard: React.FC<UserAccountCardProps> = ({
  Logo,
  gameLogoImg,
  name,
  isLinked,
  userId,
  implemented,
  linkOnClick,
  unlinkOnClick,
  ...props
}) => {
  console.log(userId);

  return (
    <S.Container {...props}>
      <S.ImageContainer>
        {gameLogoImg && <S.Image {...gameLogoImg} />}
        {Logo && <Logo />}
      </S.ImageContainer>

      <S.NameContainer>
        {userId && (userId && isLinked ? <S.Name>{userId}</S.Name> : "Not Linked")}
      </S.NameContainer>

      {isLinked ? (
        <S.NotLinkedContainer onClick={implemented ? unlinkOnClick : null}>
          <S.NotLinked>Unlink</S.NotLinked>
          <ArrowIcon color={theme.colors.white} />
        </S.NotLinkedContainer>
      ) : (
        <S.LinkContainer onClick={implemented ? linkOnClick : null}>
          <S.Linked>Link Now</S.Linked>
          <ArrowIcon color={implemented ? theme.colors.golden : theme.colors.darkGray} />
        </S.LinkContainer>
      )}
    </S.Container>
  );
};
