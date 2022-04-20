import { Box, Collapse, IconButton, Tab } from "@mui/material";
import React from "react";
import { useState } from "react";
import * as S from "./elements";

export const CollapsibleTableRow = ({ children, collapsedColumns, ...props }) => {
  const [open, setOpen] = useState(false);

  const handleSetOpenTable = () => {
    setOpen(prevState => !prevState);
  };

  return (
    <React.Fragment>
      <S.TableRow {...props}>
        <S.TableCell>
          <IconButton aria-label='expand row' size='small' onClick={handleSetOpenTable}>
            {open ? <S.KeyboardArrowDown /> : <S.KeyboardArrowUp />}
          </IconButton>
        </S.TableCell>
        {children}
      </S.TableRow>
      <S.CollapsibleTableRow>
        <S.TableCell colSpan={8}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box>
              <S.CollapsibleTable>
                <S.TableHead columns={collapsedColumns} />
                <S.TableBody>
                  <span></span>
                </S.TableBody>
              </S.CollapsibleTable>
            </Box>
          </Collapse>
        </S.TableCell>
      </S.CollapsibleTableRow>
    </React.Fragment>
  );
};
