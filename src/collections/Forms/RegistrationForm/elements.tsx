import styled from "styled-components";
import {
  Button as BaseButton,
  FormInput,
  Checkbox as BaseCheckbox,
  Typography
} from "~/components";
import { maxTablet, theme } from "~/styles";

export const Form = styled(({ ...props }) => <form {...props} />)`
  margin-bottom: 100px;

  @media ${maxTablet} {
    margin-bottom: 55px;
  }
`;

export const Input = styled(({ ...props }) => <FormInput {...props} />)`
  input {
    font-size: 16px;
  }

  h6 {
    top: -2px;
  }

  & + & {
    margin-top: 25px;
  }
`;

export const TOSContainer = styled(({ ...props }) => <div {...props} />)`
  margin: 20px 0;
  display: flex;
  flex-direction: row-reverse;
  position: relative;
`;

export const Checkbox = styled(({ ...props }) => <BaseCheckbox {...props} />)`
  margin-top: 5px;

  & > span {
    position: absolute;
    bottom: -15px;
    left: 15px;
  }
`;

export const HighlightedText = styled(({ ...props }) => (
  <Typography {...props} isUnderlined variant='h4' weight={700} lineHeight='24px' color='golden' />
))`
  display: inline-block;
  margin: 0 5px;
`;

export const TOSText = styled(({ ...props }) => (
  <Typography {...props} variant='h4' weight={400} lineHeight='24px' color='white' />
))`
  margin: 0;
`;

export const Button = styled(({ ...props }) => <BaseButton {...props} variant='contained' />)`
  width: 100%;
  margin-top: 35px;
  box-shadow: unset;
`;

export const ErrorMessage = styled(({ ...props }) => <span {...props} />)`
  color: ${theme.colors.red}95;
  font-size: 12px;
  margin-left: 10px;
  width: 320px;
  text-align: right;

  position: absolute;
  bottom: -20px;
  right: 0;

  @media ${maxTablet} {
    left: 0;
    right: unset;
    text-align: left;
  }
`;
