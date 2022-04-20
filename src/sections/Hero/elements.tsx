import styled, { css } from "styled-components";
import { SectionContainer as BaseSectionContainer } from "~/components";
import { maxMobile, maxTablet } from "~/styles";

export { Typography } from "~/components";

export const SectionContainer: React.FC = styled(({ ...props }) => (
  <BaseSectionContainer {...props} />
))`
  padding: 0;
`;

export const ImageContainer = styled(({ backgroundImage, ...props }) => <div {...props} />)`
  @font-face {
    font-family: EgoFont;
    src: url("/static/fonts/font.otf");
  }

  display: flex;
  place-items: center;
  place-content: center;

  ${({ backgroundImage }) =>
    css`
      background: url(${backgroundImage}) top center;
    `}
  background-size: cover;
  background-repeat: no-repeat;
  width: 1440px;
  height: 250px;

  h1 {
    margin-top: 35px;
    margin-left: 10px;
    font-size: 53px;
    font-family: EgoFont;
    letter-spacing: 0.25rem;
    word-break: break-word;
    text-align: center;
  }

  @media ${maxTablet} {
    height: 210px;
  }

  @media ${maxMobile} {
    h1 {
      font-size: 38px;
    }
  }
`;
