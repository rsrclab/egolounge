import styled from "styled-components";
import {
  Popup as BasePopup,
  Button as BaseButton,
  Typography as BaseTypography
} from "~/components";
import { ButtonProps, TypographyProps } from "~/types";

export const Popup = styled(({ ...props }) => <BasePopup {...props} />)``;

export const Title: React.FC<TypographyProps> = styled(({ ...props }: TypographyProps) => (
  <BaseTypography {...props} />
))`
  margin: 0;
  margin-bottom: 10px;
`;

export const Description = styled(({ ...props }) => <p {...props} />)`
  margin: 0;
  margin-bottom: 25px;
  font-weight: 400;
`;

export const Actions = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  justify-content: space-between;
  margin: 0 15px;
`;

export const Button: React.FC<ButtonProps> = styled(({ ...props }: ButtonProps) => (
  <BaseButton {...props} variant='contained' />
))``;
