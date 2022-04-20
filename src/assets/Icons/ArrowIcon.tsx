import { IconProps } from "~/types";

export const ArrowIcon: React.FC<IconProps> = ({ color, ...props }) => {
  return (
    <svg width='8' height='14' viewBox='0 0 8 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        {...props}
        d='M1 1L7 7L1 13'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
