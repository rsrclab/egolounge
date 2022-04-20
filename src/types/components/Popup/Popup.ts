export interface PopupProps {
  title?: string;
  width?: string;
  toggled: boolean;
  toggleOnClick: () => void;
  children: React.ReactNode;
  hasCloseButton?: boolean;
  padding?: string;
  positionInset?: string;
}
