import styled, { css } from "styled-components";
import { maxTablet, theme } from "~/styles";

const alignBurgerBtn = css`
  left: calc(100% - 40px);
  border-top-width: 0px;
`;

const rotateClockwise = ({ invert = false }) => css`
  transform: rotate(${invert ? "-135" : "135"}deg);
  top: 5px;
  width: 15px;
`;

export const Container = styled(({ toggled, ...props }) => <div {...props} />)`
  @media ${maxTablet} {
    cursor: pointer;
    position: absolute;
    top: 50%;
    bottom: 0;
    left: 30px;
    right: 0;
    transform: translateY(-50%);
    z-index: 100;
    display: block;
    height: 14px;
    width: 23px;
    padding: 9px 11px;
    border-top: 1px solid ${theme.colors.golden};
    transition: left 2s ease;

    ${({ toggled }) => toggled && alignBurgerBtn}
  }
`;

export const Button = styled(({ toggled, ...props }) => <div {...props} />)`
  @media ${maxTablet} {
    border-radius: 2px;
    background-color: ${theme.colors.golden};

    &:after,
    &:before {
      position: absolute;
      content: "";
      left: 0;
      height: 1px;
      width: 23px;
      background-color: ${theme.colors.golden};
      border-radius: 2px;
      transition: all ease 1s;
    }

    &:after {
      top: 7px;

      ${({ toggled }) => toggled && rotateClockwise({ invert: false })};
    }

    &:before {
      top: 15px;

      ${({ toggled }) => toggled && rotateClockwise({ invert: true })}
    }
  }
`;
