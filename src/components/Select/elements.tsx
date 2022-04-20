/* eslint-disable react/display-name */
import styled, { css } from "styled-components";
import { maxTablet, theme } from "~/styles";

import Select from "react-select";
import { forwardRef, LegacyRef } from "react";

export const SectionContainer = styled(({ ...props }) => <div {...props} />)`
  position: relative;
  min-height: 68px;
  max-width: 317px;

  @media ${maxTablet} {
    max-width: 100%;
  }
`;

const customStyles = {
  menu: provided => ({
    ...provided,
    backgroundColor: `${theme.colors.black}`,
    cursor: "pointer !important",
    width: "317px",
    minWidth: "100%",
    border: `2px solid ${theme.colors.golden}`,
    "& + &": {
      marginTop: "20px"
    },
    borderRadius: "5px",
    "&:hover": {
      borderColor: `${theme.colors.primary}`
    },
    "@media (max-width: 1024px)": {
      width: "100%"
    }
  }),
  menuList: provided => ({
    ...provided,
    maxHeight: "265px"
  }),
  control: provided => ({
    ...provided,
    width: "317px",
    backgroundColor: `${theme.colors.black}`,
    border: `2px solid ${theme.colors.golden}`,
    cursor: "pointer",
    "&:focus": {
      boxShadow: `0 0 0 1px ${theme.colors.primary}`
    },
    "&:hover": {
      boxShadow: `0 0 0 1px ${theme.colors.primary}`
    },
    minHeight: "68px",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "28px",
    "@media (max-width: 1024px)": {
      width: "100%"
    }
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    backgroundColor: state.isSelected ? theme.colors.lightGray : "transparent",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "28px",
    "&:hover": {
      backgroundColor: `${theme.colors.black1F}`
    },
    color: state.isDisabled ? `${theme.colors.darkGray} !important` : theme.colors.white
  }),
  singleValue: provided => ({
    ...provided,
    color: `${theme.colors.golden}`
  }),
  input: provided => ({
    ...provided,
    color: `${theme.colors.golden}`
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: `${theme.colors.golden}`
  }),
  placeholder: () => ({
    display: "none"
  }),
  indicatorSeparator: () => null
};

export const SelectContainer = styled(
  forwardRef(({ openUpwards, ...props }: any, ref: LegacyRef<HTMLInputElement>) => (
    <Select {...props} styles={customStyles} ref={ref} />
  ))
)`
  [class$="menu"] {
    ${({ openUpwards }) =>
      openUpwards
        ? css`
            top: auto;
            bottom: 100%;
          `
        : css`
            top: 100%;
            bottom: auto;
          `}
  }

  color: ${theme.colors.white};
`;

export const ErrorMessage = styled(({ ...props }) => <span {...props} />)`
  position: absolute;
  color: ${theme.colors.red}95;
  font-size: 12px;
  margin-left: 10px;
  bottom: -30px;
  left: -10px;
  text-align: left;

  @media ${maxTablet} {
    bottom: -15px;
  }
`;
