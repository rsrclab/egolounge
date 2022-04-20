import { Paper } from "@mui/material";
import * as S from "./elements";

export const Table = ({ children, ...props }) => {
  return (
    <S.TableContainer {...props} component={Paper}>
      <S.Table>{children}</S.Table>
    </S.TableContainer>
  );
};
