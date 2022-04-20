import styled, { css } from "styled-components";
import { theme } from "~/styles";

const rotateClockwise = ({ invert = false }) => css`
  transform: rotate(${invert ? "-135" : "135"}deg);
  top: 5px;
  width: 15px;
`;

export const CloseButton: React.FC = styled(({ ...props }) => <span {...props} />)`
  height: 14px;
  width: 14px;
  cursor: pointer;
  z-index: 999;
  position: absolute;
  top: 30px;
  right: 30px;

  &:after,
  &:before {
    position: absolute;
    content: "";
    top: 0;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 22px;
    background-color: ${theme.colors.golden};
    border-radius: 2px;
    transition: all ease 1s;
  }

  &:after {
    ${rotateClockwise({ invert: true })}
  }

  &:before {
    ${rotateClockwise({ invert: false })}
  }
`;
