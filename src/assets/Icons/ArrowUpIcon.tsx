import { IconProps } from "~/types";

export const ArrowUpIcon: React.FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      {...props}
      width='12'
      height='8'
      viewBox='0 0 12 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M11 7L6 2L1 7' stroke='#DEA30A' strokeWidth='2' strokeLinecap='round' />
    </svg>
  );
};
