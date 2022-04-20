import * as S from "./elements";

interface TableCellProps {
  width?: number;
  colSpan?: number;
  textAlign?: "left" | "center" | "right";
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  width,
  colSpan,
  textAlign = "center",
  ...props
}) => {
  return (
    <S.TableCell {...props} width={width} colSpan={colSpan} textAlign={textAlign}>
      {children}
    </S.TableCell>
  );
};
