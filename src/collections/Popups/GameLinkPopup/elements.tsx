import styled from "styled-components";
import { Popup as BasePopup, Typography } from "~/components";
import { PopupProps } from "~/types";

export const Popup = styled(({ ...props }: PopupProps) => (
  <BasePopup {...props} padding='0' width='520px' />
))``;

export const Title = styled(({ ...props }) => (
  <Typography {...props} variant='h1' color='golden' />
))`
  margin: 0;
  padding-top: 30px;
  max-width: 80%;
  margin: 0 auto;
  font-family: EgoFont;
`;
