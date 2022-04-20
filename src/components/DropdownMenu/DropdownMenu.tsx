import { RefObject, useEffect, useRef } from "react";
import * as S from "./elements";

export interface DropdownMenuProps {
  children: React.ReactNode;
  toggled: boolean;
  toggleClose: () => void;
  noCloseRefs?: RefObject<HTMLElement>[];
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  toggled,
  toggleClose,
  noCloseRefs,
  ...props
}) => {
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const closeDropdownOnDocumentClick = (event: MouseEvent) => {
    if (
      !dropdownMenuRef.current?.contains(event.target as Node) &&
      !noCloseRefs?.some(ref => ref?.current?.contains(event.target as Node))
    )
      toggleClose();
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdownOnDocumentClick);

    return () => document.removeEventListener("click", closeDropdownOnDocumentClick);
  }, []);

  return (
    <S.Menu {...props} toggled={toggled} ref={dropdownMenuRef}>
      {children}
    </S.Menu>
  );
};
