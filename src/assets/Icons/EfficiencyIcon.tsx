import { IconProps } from "~/types";

export const EfficiencyIcon: React.FC<IconProps> = ({ color, ...props }) => {
  return (
    <svg
      {...props}
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M-1 52V-1H51.5V52H-1Z' fill='#DEA30A' />
    </svg>
  );
};
