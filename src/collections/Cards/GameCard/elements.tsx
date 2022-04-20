import styled, { css } from "styled-components";
import { ImageCard } from "~/components";
import { maxTablet, theme } from "~/styles";

export const Container = styled(({ active, ...props }) => <ImageCard {...props} />)`
  width: 320px;
  height: 185px;
  filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.25));
  cursor: pointer;

  ${({ active }) =>
    !active &&
    css`
      /* filter: grayscale(100%); */
    `}

  & > span {
    overflow: visible !important;
  }

  & > span::after {
    border: 5px solid ${theme.colors.golden};
    border-radius: 10px;
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    content: "";
    opacity: 0;
  }

  & > span:hover {
    position: relative;
    border-radius: 10px;
    /* box-shadow: 0 0 5px 10px #ffffff20; */

    &::after {
      opacity: 1;
    }
  }

  @media ${maxTablet} {
    width: 100%;
    height: 100%;
  }
`;
