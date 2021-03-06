import { IconProps } from "~/types";

export const MinusIcon: React.FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      {...props}
      width='16'
      height='2'
      viewBox='0 0 16 2'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.3333 1.5H0.666667C0.489856 1.5 0.320287 1.42098 0.195262 1.28033C0.070238 1.13968 0 0.948912 0 0.75C0 0.551088 0.070238 0.360322 0.195262 0.21967C0.320287 0.0790178 0.489856 0 0.666667 0H15.3333C15.5101 0 15.6797 0.0790178 15.8047 0.21967C15.9298 0.360322 16 0.551088 16 0.75C16 0.948912 15.9298 1.13968 15.8047 1.28033C15.6797 1.42098 15.5101 1.5 15.3333 1.5Z'
        fill='#191919'
      />
    </svg>
  );
};
