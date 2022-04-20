import styled from "styled-components";
import { Button as BaseButton, FormInput } from "~/components";

export const Form = styled(({ ...props }) => <form {...props} />)``;

export const Input = styled(({ ...props }) => <FormInput {...props} />)`
  input {
    font-size: 16px;
  }
`;

export const Button = styled(({ ...props }) => (
  <BaseButton {...props} variant='contained' typography={{ variant: "h3" }} />
))`
  margin-top: 20px;
  width: 100%;
`;
