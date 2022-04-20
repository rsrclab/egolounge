import React from "react";
import styled, { css } from "styled-components";
import { maxTablet } from "~/styles";

const showMenu = css`
  pointer-events: all;
  opacity: 1;
  transform: translateX(0);
  z-index: 99;
  transition: transform 1.5s ease, opacity 1s ease-in-out;
`;

export const MobileMenu = styled(({ toggled, ...props }) => <div {...props} />)`
  overflow: auto;
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-100vw);
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ toggled }) =>
    toggled &&
    css`
      transition: transform 1.5s ease, opacity 1s ease;
    `}

  @media ${maxTablet} {
    width: 100vw;
    height: 100vh;
    background-color: #121212;

    ${({ toggled }) => toggled && showMenu}
  }
`;

export const Content = styled(({ ...props }) => <div {...props} />)``;

export const SiteLogo: React.FC = styled(({ ...props }) => <div {...props} />)`
  @media ${maxTablet} {
    position: absolute;
    display: flex;
    top: 25px;
    left: 30px;
    align-items: center;
    justify-content: center;
  }
`;

export const MenuItems: React.FC = styled(({ ...props }) => <ul {...props} />)`
  padding-inline-start: 0;
  margin-top: 90px;
`;

export const MenuItem: React.FC = styled(({ ...props }) => <li {...props} />)`
  list-style-type: none;
  padding: 27px 30px;

  a {
    font-size: 16px;
    font-weight: 700;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
  }
`;

export const ButtonContainer: React.FC = styled(({ ...props }) => <div {...props} />)`
  padding: 0 30px;
  width: 100%;
  margin-bottom: 50px;

  button {
    width: 100%;
    min-width: 150px;
    min-height: 52px;
  }
`;
