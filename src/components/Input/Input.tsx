import { useState, useEffect } from "react";
import { IconProps } from "~/types";
import * as S from "./elements";

export interface InputProps {
  id: string;
  direction?: "column" | "row";
  placeholder?: string;
  labelText?: string;
  height?: string;
  Icon?: React.FC<IconProps>;
  iconSize?: number;
  iconColor?: string;
  onFocus?: (e: any) => void;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  type?: "text" | "number" | "password" | "radio" | "email";
}

export const Input: React.FC<InputProps> = ({
  id,
  direction,
  placeholder,
  labelText,
  type = "text",
  height = "52px",
  Icon,
  iconSize,
  iconColor,
  ...props
}) => {
  const [value, setValue] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [showLabel, setShowLabel] = useState<boolean>(false);

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
          onChange={handleInputOnChange}
          onFocus={handleInputOnFocus}
          onBlur={handleInputOnBlur}
          type={type}
          placeholder={placeholder}
          id={id}
        />
      </S.Label>
    </S.InputContainer>
  );
};
