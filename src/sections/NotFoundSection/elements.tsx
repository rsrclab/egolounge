import styled from "styled-components";
import { theme } from "~/styles";
import {
  SectionContainer as BaseSectionContainer,
  Typography as BaseTypography
} from "~/components";
import { TypographyProps } from "~/types";

export const SectionContainer: React.FC = styled(({ ...props }) => (
  <BaseSectionContainer {...props} direction='column' />
))`
  justify-content: center;
  margin: 85px auto 100px;
  padding: 0 50px;
  color: ${theme.colors.white};
  background-color: ${theme.colors.black1F};
  min-height: 220px;
  align-items: center;
  border-radius: 15px;
`;

export const Title: React.FC<TypographyProps> = styled(({ ...props }: TypographyProps) => (
  <BaseTypography {...props} />
))`
  color: #ff0000;
`;
