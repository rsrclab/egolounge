/* eslint-disable react/display-name */
import { forwardRef, LegacyRef } from "react";
import styled, { css } from "styled-components";
import { Typography } from "~/components";
import { theme } from "~/styles";
import { InputProps } from ".";

const showLabelFunc = css`
  opacity: 1;
  z-index: 1;
  transform: translateY(-21px);
`;

export const InputContainer: React.FC = styled(({ ...props }) => <div {...props} />)`
  width: 100%;
`;

export const Label = styled(({ ...props }) => <label {...props} />)`
  position: relative;
  display: flex;

  svg {
    position: absolute;
    top: 50%;
    bottom: 0;
    left: 20px;
    transform: translateY(-50%);
    fill: #929292;
    z-index: 100;
  }

  width: 100%;
`;

export const Input = styled(
  forwardRef(({ ...props }: InputProps, ref: LegacyRef<HTMLInputElement>) => (
    <input {...props} ref={ref} />
  ))
)`
  border: unset;
  background-color: transparent;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 16px;
  color: ${theme.colors.white};
  width: 100%;
  font-size: 22px;
  outline: none;
  height: 52px;
  background-color: ${theme.colors.black1F};
  border: 1px solid transparent;
  z-index: 1;

  &:focus {
    border: 1px solid ${theme.colors.golden};
  }

  svg + & {
    padding-left: 44px !important;
  }
`;

export const ErrorMessage = styled(({ ...props }) => <span {...props} />)`
  color: ${theme.colors.red}95;
  font-size: 12px;
  margin-left: 10px;
`;

export const LabelText = styled(({ showLabel, ...props }) => (
  <Typography {...props} variant='h6' weight={400} lineHeight='14px' />
))`
  position: absolute;
  top: -7px;
  left: 0;
  margin: 0;
  padding: 6px 16px;
  color: ${theme.colors.white};
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.25s ease-in-out;
  ${({ showLabel }) => (showLabel ? showLabelFunc : "")}
  z-index: 0;
`;
