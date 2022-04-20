import * as S from "./elements";

export interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({ onClick, children, ...props }) => {
  return (
    <S.MenuItem {...props} onClick={onClick}>
      {children}
    </S.MenuItem>
  );
};
