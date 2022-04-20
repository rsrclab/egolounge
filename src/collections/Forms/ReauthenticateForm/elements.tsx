import styled from "styled-components";
import {
  Typography,
  Button as BaseButton,
  FormInput as BaseInput,
  FormInputProps
} from "~/components";
import { theme } from "~/styles";

export const Form = styled(({ ...props }) => <form {...props} />)``;

export const Title = styled(({ ...props }) => (
  <Typography {...props} variant='h3' weight={500} lineHeight='28px' />
))`
  margin: 0;
  margin-bottom: 10px;
`;

export const Description = styled(({ ...props }) => (
  <Typography {...props} variant='h4' weight={400} lineHeight='24px' />
))`
  margin: 0;
`;

export const Actions = styled(({ ...props }) => <div {...props} />)`
  margin-top: 25px;
  column-gap: 20px;
  display: flex;
`;

export const Button = styled(({ ...props }) => (
  <BaseButton {...props} variant='contained' typography={{ variant: "h4", weight: 700 }} />
))`
  width: 100%;
`;

export const Input: React.FC<FormInputProps> = styled(({ ...props }: FormInputProps) => (
  <BaseInput {...props} />
))`
  margin-top: 30px;

  input {
    font-size: 20px;
  }
`;

export const ErrorMessage = styled(({ ...props }) => <span {...props} />)`
  color: ${theme.colors.red}95;
  font-size: 12px;
  margin-left: 10px;
`;
