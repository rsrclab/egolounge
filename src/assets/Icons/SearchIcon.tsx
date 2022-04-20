import { IconProps } from "~/types";

export const SearchIcon: React.FC<IconProps> = ({ color, ...props }) => {
  return (
    <svg
      {...props}
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM0.9 6C0.9 8.81665 3.18335 11.1 6 11.1C8.81665 11.1 11.1 8.81665 11.1 6C11.1 3.18335 8.81665 0.9 6 0.9C3.18335 0.9 0.9 3.18335 0.9 6Z'
        fill='#929292'
      />
      <path d='M10 10L14 14' stroke='#929292' strokeLinecap='round' />
    </svg>
  );
};
