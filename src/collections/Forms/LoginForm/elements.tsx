import styled from "styled-components";
import { Button as BaseButton, Checkbox, FormInput } from "~/components";
import { maxTablet, theme } from "~/styles";

export const LoginForm = styled(({ ...props }) => <form {...props} />)`
  position: relative;
`;

export const ErrorMessage = styled(({ ...props }) => <span {...props} />)`
  position: absolute;
  bottom: 105px;
  left: 50%;
  right: 0;
  transform: translateX(-50%);
  color: ${theme.colors.red}95;
  font-size: 12px;
  margin-left: 10px;
  width: fit-content;
  text-align: right;
`;

export const Input = styled(({ ...props }) => <FormInput {...props} />)`
  input {
    font-size: 16px;
    height: 56px;
    min-height: 56px;

    @media ${maxTablet} {
      height: 40px;
      min-height: 40px;

      font-size: 14px;
    }
  }

  & + & {
    margin-top: 20px;
  }
`;

export const RememberMeCheckbox = styled(({ ...props }) => <Checkbox {...props} />)`
  padding: 25px 0 70px;
`;

export const Button = styled(({ ...props }) => <BaseButton {...props} variant='contained' />)`
  width: 100%;

  & + & {
    margin-top: 20px;
  }

  @media ${maxTablet} {
    height: 40px;
    min-height: 40px;
  }
`;
