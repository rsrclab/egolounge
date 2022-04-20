import styled from "styled-components";
import { Button as BaseButton } from "~/components";
import { ButtonProps } from "~/types";
import { SimplePopup as BaseSimplePopup } from "~/collections";
import { theme } from "~/styles";

export const Button: React.FC<ButtonProps> = styled(({ ...props }: ButtonProps) => (
  <BaseButton {...props} variant='contained' typography={{ variant: "h4", weight: 700 }} />
))`
  border: none;
  cursor: pointer;
`;

export const SimplePopup = styled(({ ...props }) => <BaseSimplePopup {...props} />)``;

export const HighlightText = styled(({ ...props }) => <span {...props} />)`
  color: ${theme.colors.golden};
`;
