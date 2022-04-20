import styled from "styled-components";
import { Button as BaseButton, Typography, Popup as BasePopup } from "~/components";
import { maxSmallMobile } from "~/styles";
import { ButtonProps } from "~/types";

export const PopupContainer = styled(({ ...props }) => (
  <BasePopup {...props} width='375px' padding='35px 37px 25px' />
))``;

export const ContentContainer = styled(({ ...props }) => <div {...props} />)`
  max-width: 325px;
`;

export const Title = styled(({ ...props }) => (
  <Typography {...props} variant='h3' weight={500} color='white' />
))`
  margin: 0;
`;

export const Actions: React.FC = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  gap: 15px;
  margin-top: 30px;

  @media ${maxSmallMobile} {
    flex-direction: column;
  }
`;

export const Button: React.FC<ButtonProps> = styled(({ ...props }: ButtonProps) => (
  <BaseButton {...props} variant='contained' color='primary' />
))`
  width: 140px;
  min-width: 140px;

  @media ${maxSmallMobile} {
    width: 100%;
  }
`;
