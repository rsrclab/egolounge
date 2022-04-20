import styled from "styled-components";
import { FormInput, Button as BaseButton } from "~/components";
import { maxTablet, theme } from "~/styles";

export const Form = styled(({ ...props }) => <form {...props} />)`
  position: relative;
  display: flex;
  gap: 30px;

  span {
    position: absolute;
    bottom: -20px;
    left: 0;
  }

  @media ${maxTablet} {
    flex-direction: column;
  }
`;

export const InputContainer: React.FC = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  width: 100%;
`;

export const Input = styled(({ ...props }) => <FormInput {...props} />)``;

export const Button = styled(({ ...props }) => <BaseButton {...props} variant='contained' />)``;

export const ErrorMessage = styled(({ ...props }) => <span {...props} />)`
  color: ${theme.colors.red}95;
  font-size: 12px;
  margin-left: 10px;
  width: 320px;
  text-align: left;
  position: absolute;
  bottom: -20px;
  right: 0;

  @media ${maxTablet} {
    left: 0;
    right: unset;
  }
`;
