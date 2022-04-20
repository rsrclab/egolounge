import styled from "styled-components";
import { FormInput, FormSelect as BaseFormSelect, Button as BaseButton } from "~/components";
import { maxMobile, maxTablet, theme } from "~/styles";

export const Form = styled(({ ...props }) => <form {...props} />)`
  padding: 30px;

  @media ${maxTablet} {
    margin-bottom: 55px;
  }
`;

export const Input = styled(({ ...props }) => <FormInput {...props} />)`
  margin-bottom: 20px;
  input {
    font-size: 16px;
  }

  h6 {
    top: -2px;
  }

  span {
    float: left;
  }
`;

export const DropdownContainers = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  gap: 30px;

  & > div {
    width: 50%;
  }

  @media ${maxTablet} {
    flex-direction: column;
  }
`;

export const DropdownContainer = styled(({ ...props }) => <div {...props} />)``;

export const Dropdown = styled(({ ...props }) => <BaseFormSelect {...props} />)`
  min-height: 46px;
  text-align: left;
  max-width: 100%;

  span {
    bottom: -20px;
  }

  [class$="singleValue"] {
    font-size: 16px;
    font-weight: 600;
  }

  [class$="control"] {
    min-height: 46px;
  }

  [class$="menu"],
  [class*="_SelectContainer-"],
  [class$="control"] {
    max-width: 100%;
    width: 100%;
  }
`;

export const DropdownLabel = styled(({ ...props }) => <span {...props} />)`
  line-height: 14px;
  margin: 6px 16px;
  color: #fff;
  float: left;
`;

export const Button = styled(({ ...props }) => (
  <BaseButton {...props} variant='contained' typography={{ variant: "h3" }} />
))`
  margin-top: 30px;
  width: 100%;
`;

export const ErrorMessage = styled(({ ...props }) => <span {...props} />)`
  color: ${theme.colors.red}95;
  font-size: 12px;
  margin: 20px 0;
  width: fit-content;
  text-align: center;
`;
