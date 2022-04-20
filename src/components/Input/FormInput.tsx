import React from "react";
import { useState, useEffect } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { InputProps } from ".";
import * as S from "./elements";

export interface FormInputProps extends InputProps {
  form: UseFormReturn<FieldValues, object>;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  direction,
  placeholder,
  labelText,
  type = "text",
  height = "52px",
  Icon,
  iconSize,
  iconColor,
  form,
  ...props
}) => {
  const [value, setValue] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [showLabel, setShowLabel] = useState<boolean>(false);

  const {
    register,
    formState: { errors }
  } = form;

  useEffect(() => {
    if (value.length > 0 || focused) {
      setShowLabel(true);
    } else {
      setShowLabel(false);
    }
  }, [value, focused]);

  const handleInputOnChange = e => {
    setValue(e.target.value);
  };

  const handleInputOnFocus = () => {
    setFocused(true);
  };

  const handleInputOnBlur = () => {
    setFocused(false);
  };

  return (
    <S.InputContainer {...props}>
      <S.Label htmlFor={id}>
        {labelText && (
          <S.LabelText showLabel={showLabel} variant='h6' weight={400} lineHeight='14px'>
            {labelText}
          </S.LabelText>
        )}
        {Icon && <Icon color={iconColor} />}
        <S.Input
          height={height}
          onFocus={handleInputOnFocus}
          type={type}
          placeholder={placeholder}
          id={id}
          {...register(id, {
            onChange: handleInputOnChange,
            onBlur: handleInputOnBlur
          })}
        />
      </S.Label>
      {errors[id] && <S.ErrorMessage>{errors[id].message}</S.ErrorMessage>}
    </S.InputContainer>
  );
};
