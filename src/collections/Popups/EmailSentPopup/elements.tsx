import styled from "styled-components";
import { Button as BaseButton, Typography, Popup as BasePopup } from "~/components";
import { maxSmallMobile } from "~/styles";

export const Popup = styled(({ ...props }) => <BasePopup {...props} padding='17px 15px 20px' />)`
  @media ${maxSmallMobile} {
    width: 300px;
  }
`;

export const ContentContainer = styled(({ ...props }) => <div {...props} />)`
  max-width: 325px;
  margin: 0 auto;
`;

export const Title = styled(({ ...props }) => (
  <Typography {...props} variant='h2' weight={600} color='white' />
))`
  margin: 10px 0 5px;
`;

export const Description = styled(({ ...props }) => (
  <Typography {...props} variant='h5' weight={400} color='white' />
))`
  margin: 0;
  margin-bottom: 14px;
`;

export const Button = styled(({ ...props }) => (
  <BaseButton {...props} variant='contained' color='primary' />
))`
  width: 100%;
`;
