import styled from "styled-components";
import { Typography, Popup as BasePopup } from "~/components";
import React from "react";
import { PopupProps } from "~/types";

export const Popup = styled(({ ...props }: PopupProps) => (
  <BasePopup {...props} padding='40px 30px 50px' />
))``;

export const Title = styled(({ ...props }) => <Typography {...props} variant='h2' weight={600} />)`
  margin-bottom: 30px;
  margin-top: 0;
`;
