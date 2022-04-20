/* eslint-disable react/display-name */
import styled from "styled-components";
import { theme } from "~/styles";
import { forwardRef, LegacyRef } from "react";
import { RadioButtonProps } from "./RadioButton";

export const RadioButton = styled(
  forwardRef(
    ({ ...props }: Pick<RadioButtonProps, "id" | "value">, ref: LegacyRef<HTMLInputElement>) => (
      <input {...props} type='radio' ref={ref} />
    )
  )
)`
  position: absolute;
  cursor: pointer;
  height: 56px;
  width: 100%;
  appearance: none;
  padding: 5px 12px;
  margin: 0;

  &:checked {
    border: 1px solid ${theme.colors.golden};
    border-radius: 5px;
  }
`;

export const RadioLabel = styled(({ ...props }) => <label {...props} />)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  min-height: 45px;
`;

export const ErrorMessage = styled(({ ...props }) => <span {...props} />)`
  color: ${theme.colors.red}95;
  font-size: 12px;
  margin-left: 10px;
`;
