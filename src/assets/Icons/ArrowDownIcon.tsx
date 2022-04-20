import { IconProps } from "~/types";

export const ArrowDownIcon: React.FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      {...props}
      width='12'
      height='8'
      viewBox='0 0 12 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M1 1L6 6L11 1' stroke='#DEA30A' strokeWidth='2' strokeLinecap='round' />
    </svg>
  );
};
