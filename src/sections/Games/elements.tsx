import styled, { css } from "styled-components";
import { SectionContainer as BaseSectionContainer } from "~/components";
import { maxTablet } from "../../styles/breakpoints";

export const SectionContainer: React.FC = styled(({ ...props }) => (
  <BaseSectionContainer {...props} direction='column' />
))`
  padding: 0 50px 20px;

  @media ${maxTablet} {
    display: none;
  }
`;

export const GamesContainer: React.FC = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding-top: 40px;

  @media ${maxTablet} {
    flex-wrap: nowrap;
  }
`;
