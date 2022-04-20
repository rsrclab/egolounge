import * as S from "./elements";
import { TableCell, TableRow } from "~/components";

export const TableHead = ({ columns, ...props }) => {
  return (
    <S.TableHead {...props}>
      <TableRow>
        {columns.map((column, i) => (
          <TableCell key={column.title + i} width={column.width} textAlign={column.textAlign}>
            {column.title}
          </TableCell>
        ))}
      </TableRow>
    </S.TableHead>
  );
};
