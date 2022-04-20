import styled from "styled-components";
import { Typography, Button as BaseButton, Popup as BasePopup } from "~/components";
import { theme, maxMobile, maxTablet } from "~/styles";
import { SocialsContainer } from "../../SocialButtons/elements";
import { CopyToClipboardIcon as BaseCopyToClipboardIcon } from "~/assets";
import { ButtonProps } from "~/types";

export const Popup = styled(({ ...props }) => <BasePopup {...props} width='470px' />)``;

export const Content = styled(({ ...props }) => <div {...props} />)`
  padding: 50px 25px 25px;
  width: 100%;

  @media ${maxTablet} {
    padding: 40px 20px 20px;
  }

  ${SocialsContainer} {
    column-gap: 5px;
  }
`;

export const IconContainer = styled(({ ...props }) => <div {...props} />)``;

export const CodeContainer = styled(({ ...props }) => <div {...props} />)`
  margin-top: 40px;

  @media ${maxMobile} {
    h1 {
      font-size: 22px;
    }
    h2 {
      font-size: 20px;
    }
  }
`;

export const Title = styled(({ ...props }) => <Typography {...props} variant='h2' weight={600} />)`
  margin: 0;
  margin-bottom: 5px;

  @media ${maxTablet} {
    font-size: 20px;
  }
`;

export const CodeContent = styled(({ ...props }) => (
  <Typography {...props} variant='h1' weight={400} />
))`
  cursor: pointer;
  display: inline-block;
  position: relative;
  font-size: 20px;
  margin: 5px 0 30px;

  span {
    vertical-align: middle;
  }

  svg {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  @media ${maxTablet} {
    font-size: 32px;
    margin: 5px 0 20px;
  }
`;

export const CopyToClipboardIcon = styled(({ ...props }) => (
  <BaseCopyToClipboardIcon {...props} color={theme.colors.golden} />
))``;

export const Actions = styled(({ ...props }) => <div {...props} />)``;

export const Button = styled(({ ...props }: Omit<ButtonProps, "color">) => (
  <BaseButton {...props} variant='contained' typography={{ variant: "h4", weight: 700 }} />
))`
  width: 100%;

  h4 {
    margin: 0;
  }
`;

export const SocialShare = styled(({ ...props }) => <div {...props} />)`
  ${Title} {
    font-size: 16px;
    margin: 30px 0 20px;
    font-weight: 400;
  }

  svg {
    width: 27px;
    vertical-align: middle;
  }
`;
