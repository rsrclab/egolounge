/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import styled from "styled-components";
import { theme } from "~/styles";

import { DropdownMenuProps } from ".";

export const Menu = styled(
  forwardRef(
    (
      { toggled, ...props }: Omit<DropdownMenuProps, "toggleClose">,
      ref: React.Ref<HTMLDivElement>
    ) => <div {...props} ref={ref} />
  )
)`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: ${theme.colors.black};
  display: ${({ toggled }) => (toggled ? "flex" : "none")};
  flex-direction: column;
  padding: 10px 0;
  z-index: 999999;
  min-width: 210px;
  border-radius: 5px;
  box-shadow: -4px -4px 12px rgba(49, 49, 49, 0.5), 4px 4px 12px #000000;
`;

export const MenuItem = styled(({ ...props }) => <div {...props} />)`
  width: 100%;
  &:hover {
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.6);
  }

  a,
  span {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    text-align: center;
    min-height: 57px;
    transition: min-height 0.25s ease;
    &:hover {
      min-height: 70px;
    }
  }
`;
