import { IconProps } from "~/types";

export const ChevronIcon: React.FC<IconProps> = ({ color, ...props }) => {
  return (
    <svg
      {...props}
      width='14'
      height='8'
      viewBox='0 0 14 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13 1L7 7L1 0.999999'
        stroke='#F2C44E'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
