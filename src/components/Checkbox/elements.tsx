/* eslint-disable react/display-name */
import styled from "styled-components";
import { theme } from "~/styles";
import { Typography } from "~/components";
import { forwardRef, LegacyRef } from "react";

export const Container = styled(({ ...props }) => <div {...props} />)`
  vertical-align: middle;
`;

export const Label: React.FC = styled(({ ...props }) => <label {...props} />)`
  display: block;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  font-size: 22px;

  &:hover input ~ span {
    background-color: #cccccc25;
  }

  input:checked ~ span {
    ${theme.gradient.yellow};
  }
`;

export const Input = styled(
  forwardRef(({ ...props }, ref: LegacyRef<HTMLInputElement>) => (
    <input {...props} type='checkbox' ref={ref} />
  ))
)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
  height: 15px;
  width: 15px;
  z-index: 100;
  margin: 0;

  &:checked ~ span:after,
  &:checked ~ span:before {
    opacity: 1;
  }
`;

export const Checkmark: React.FC = styled(({ ...props }) => <span {...props} />)`
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  width: 16px;
  border: 1px solid ${theme.colors.golden};
  border-radius: 2px;
  z-index: 98;

  &:before {
    position: absolute;
    left: 0;
    top: 6px;
    height: 5px;
    width: 2px;
    background-color: ${theme.colors.black};
    content: "";
    transform: translateX(5px) rotate(-45deg);
    transform-origin: left bottom;
    opacity: 0;
  }

  &:after {
    position: absolute;
    left: -5px;
    bottom: 3px;
    height: 2px;
    width: 10px;
    background-color: ${theme.colors.black};
    content: "";
    transform: translateX(10px) rotate(-45deg);
    transform-origin: left bottom;
    opacity: 0;
  }
`;

export const Text = styled(({ ...props }) => <Typography {...props} variant='h5' weight={400} />)`
  float: left;
  margin: -1px 0 0;
`;

export const ErrorMessage = styled(({ ...props }) => <span {...props} />)`
  color: ${theme.colors.red}95;
  font-size: 12px;
  margin-left: 10px;
`;
