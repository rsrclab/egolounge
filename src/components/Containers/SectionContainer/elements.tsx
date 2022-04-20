import React from "react";
import styled from "styled-components";
import { SectionContainerProps } from "~/types";
import { maxTablet } from "~/styles";

export const SectionContainer = styled(({ direction = "row", ...props }: SectionContainerProps) => (
  <div {...props} />
))`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: ${({ direction }) => direction};
  padding: 0 50px;

  @media ${maxTablet} {
    padding: 0 25px;
  }
`;
