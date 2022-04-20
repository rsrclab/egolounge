import { IconProps } from "~/types";

export interface InputProps {
    placeholder?: string;
    labelText?: string;
    type?: string;
    height?: string;
    Icon?: React.FC<IconProps>;
    iconColor?: string;
  }