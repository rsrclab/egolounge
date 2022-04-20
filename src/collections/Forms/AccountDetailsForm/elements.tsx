import styled from "styled-components";
import {
  Button as BaseButton,
  FormInput,
  FormSelect as BaseFormSelect,
  FormSelectProps,
  SelectProps
} from "~/components";
import { maxSmallMobile, maxTablet, theme } from "~/styles";

export const FieldsContainer = styled(({ ...props }) => <div {...props} />)`
  color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FieldContainer = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  align-items: center;
  gap: 24px;

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${theme.colors.golden};
  }
`;

export const Button = styled(({ ...props }) => <BaseButton {...props} variant='contained' />)`
  min-height: 20px;
  height: 20px;
  min-width: unset;
  width: unset;

  h5 {
    margin: 0;
  }
`;

export const Select = styled(({ ...props }: FormSelectProps) => <BaseFormSelect {...props} />)`
  z-index: 80;
  min-height: 46px;

  [class$="singleValue"] {
    font-size: 16px;
    font-weight: 600;
  }

  [class$="control"] {
    min-height: 46px;

    @media ${maxTablet} {
      min-width: 250px;
    }
  }
`;

// export const Form = styled(({ ...props }) => <form {...props} />)``;

// export const Input = styled(({ ...props }) => <FormInput {...props} />)`
//   input {
//     min-height: 56px;
//     font-size: 16px;
//   }

//   h6 {
//     top: 0;
//   }

//   & + & {
//     margin-top: 20px;
//   }
// `;

// export const FootContainer = styled(({ ...props }) => <div {...props} />)`
//   margin-top: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   @media ${maxTablet} {
//     flex-direction: column;
//     align-items: flex-start;
//     row-gap: 20px;
//   }
// `;

// export const Button = styled(({ ...props }) => (
//   <Button {...props} variant='contained' />
// ))`
//   width: 190px;
//   min-width: 190px;
// `;

// export const Tooltip = styled(({ ...props }) => <span {...props} />)`
//   color: ${theme.colors.golden};
// `;
