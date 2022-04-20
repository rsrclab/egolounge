/* eslint-disable react/display-name */
import { forwardRef, LegacyRef } from "react";
import styled, { css } from "styled-components";
import { Button, FormInput, RadioButton, FormSelect as Select, Typography } from "~/components";
import { maxTablet, maxSmallMobile, theme } from "~/styles";
import { RadioButtonProps } from "~/types";

export const Form = styled(({ ...props }) => <form {...props} />)`
  padding: 40px 30px 30px;
  position: relative;
`;

export const GamePick = styled(({ ...props }) => <div {...props} />)`
  flex-wrap: wrap;
  margin-bottom: 25px;
`;

export const RadioButtonImage = styled(({ ...props }) => <RadioButton {...props} />)`
  width: 25%;

  @media ${maxTablet} {
    width: 33.33%;
  }

  @media ${maxSmallMobile} {
    width: 50%;
  }
`;

export const Input = styled(({ ...props }) => <FormInput {...props} type='text' />)`
  input {
    font-size: 16px;
    height: 56px;
    color: #ffffff;

    &::placeholder {
      color: #ffffff40;
    }

    &:focus {
      color: ${theme.colors.white};
    }
  }

  text-align: left;
`;

export const DayTimeContainer = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  justify-content: space-between;
  min-height: 52px;
  margin-top: 30px;

  @media ${maxTablet} {
    flex-wrap: wrap;
  }

  & > div:first-of-type > span {
    bottom: -20px;
  }
`;

export const Dropdown = styled(({ ...props }) => <Select {...props} />)`
  min-height: 52px;
  position: relative;

  @media ${maxTablet} {
    max-width: 100%;
    width: 100%;

    & + & {
      margin-top: 30px;
    }
  }

  div {
    font-size: 16px;
    text-align: left;
    color: ${theme.colors.white};

    svg {
      color: ${theme.colors.golden};
    }
  }

  [class$="ValueContainer"] {
    padding-right: 5px;
  }

  [class$="indicatorContainer"] {
    padding-left: 0;
  }

  [class$="menu"] {
    max-width: 130px;
    z-index: 50;

    @media ${maxTablet} {
      max-width: 100%;
    }
  }

  [class*="control"] {
    border: none;
    background-color: ${theme.colors.black1F};
    max-width: 130px;
    min-height: 52px;

    @media ${maxTablet} {
      max-width: 100%;
      width: 100%;
    }
  }
`;

export const GamesDropdown = styled(({ ...props }) => <Dropdown {...props} />)`
  width: 100%;
  max-width: 100%;

  [class*="_ErrorMessage"] {
    position: static;
    display: flex;
    margin-top: 5px;
    margin-bottom: 30px;
  }

  [class*="singleValue"] {
    color: ${theme.colors.golden};
    font-size: 16px;
    font-weight: 500;
  }

  [class*="control"] {
    max-width: 100%;
    width: 100%;
    padding: 0 8px;
  }
`;

export const AMPMRadioContainer = styled(({ ...props }) => <div {...props} />)`
  position: relative;
  margin-top: 7px;

  @media ${maxTablet} {
    margin-top: 20px;
  }
`;

export const RadioContainer = styled(({ ...props }) => <div {...props} />)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 45px 0;

  @media ${maxTablet} {
    margin: 30px 0;
  }

  @media ${maxSmallMobile} {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 10px;
  }
`;

export const RadioContainerTitle = styled(({ ...props }) => (
  <Typography {...props} variant='h4' weight={400} color='white' />
))`
  margin: 0;
`;

export const RadioButtonsContainer = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  position: relative;
  background-color: rgba(63, 63, 63, 0.8);
  border-radius: 20px;
`;

export const RadioInput = styled(
  forwardRef(({ isDisabled, ...props }: RadioButtonProps, ref: LegacyRef<HTMLInputElement>) => (
    <input {...props} type='radio' ref={ref} />
  ))
)`
  position: absolute;
  visibility: hidden;
  display: none;

  &:checked + label {
    background: linear-gradient(180deg, #ffdb7d 0%, #dea30a 100%);
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.2);
    color: ${theme.colors.black};
  }

  &:checked:first-of-type + label {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  &:checked:last-of-type + label {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  ${({ checked }) =>
    checked &&
    css`
      color: ${theme.colors.red};
    `}

  & + label {
    ${({ isDisabled }) =>
      isDisabled &&
      css`
        color: ${theme.colors.red};
      `}
  }
`;

export const RadioLabel = styled(({ ...props }) => <label {...props} />)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 50px;
  height: 36px;
  font-size: 16px;
  font-weight: 400;
  color: ${theme.colors.golden};
`;

export const InputContainer = styled(({ ...props }) => <div {...props} />)`
  width: 100%;

  & + & {
    margin-top: 20px;
  }
`;

export const Actions = styled(({ ...props }) => <div {...props} />)`
  margin-top: 30px;
`;

export const CreateButton = styled(({ ...props }) => (
  <Button
    {...props}
    variant='contained'
    value='Create Competition'
    typography={{ variant: "h4", weight: 700 }}
  />
))`
  width: 100%;
`;

export const ErrorMessage = styled(({ ...props }) => <span {...props} />)`
  color: ${theme.colors.red}95;
  font-size: 12px;
  margin-left: 10px;
  width: fit-content;
  text-align: center;

  position: absolute;
  bottom: 90px;
  left: 50%;
  right: 0;
  transform: translateX(-50%);
`;
