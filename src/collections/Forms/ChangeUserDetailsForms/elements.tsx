import styled from "styled-components";
import { FormInput, Button as BaseButton } from "~/components";
import { maxTablet } from "~/styles";

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

export const Button = styled(({ ...props }) => (
  <BaseButton {...props} variant='contained' typography={{ variant: "h3" }} />
))`
  margin-top: 30px;
  width: 100%;
`;
