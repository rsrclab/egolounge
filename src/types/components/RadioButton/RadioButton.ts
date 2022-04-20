export interface RadioButtonProps {
  id: string;
  name: string;
  value: string | number;
  checked?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  isDisabled?: boolean;
}
