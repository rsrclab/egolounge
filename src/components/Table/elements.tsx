/* eslint-disable jsx-a11y/alt-text */
import styled, { css } from "styled-components";
import { maxComputer, theme } from "~/styles";
import { Collapse as BaseCollapse } from "~/components";
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableContainer as MuiTableContainer,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  IconButton as BaseIconButton
} from "@mui/material";
import { ArrowUpIcon, ArrowDownIcon } from "~/assets";

export const Collapse = styled(({ ...props }) => <BaseCollapse {...props} />)``;

export const IconButton = styled(({ ...props }) => <BaseIconButton {...props} />)``;

export const KeyboardArrowDown = styled(({ ...props }) => (
  <ArrowDownIcon {...props} color={theme.colors.golden} />
))``;

export const KeyboardArrowUp = styled(({ ...props }) => (
  <ArrowUpIcon {...props} color={theme.colors.golden} />
))``;

//Table Containers
export const TableContainer = styled(({ ...props }) => <MuiTableContainer {...props} />)`
  border-radius: 15px;
`;

export const Table = styled(({ ...props }) => <MuiTable {...props} />)`
  margin: 0 auto;
  padding: 0 15px;
`;

export const TableBody = styled(({ ...props }) => <MuiTableBody {...props} />)`
  & > tr:first-of-type > td {
    padding-top: 30px;
  }
`;

export const TableHead = styled(({ ...props }) => <MuiTableHead {...props} />)`
  border-bottom: 1px solid ${theme.colors.golden};

  th {
    padding: 30px 5px;
  }
`;

export const TableRow = styled(({ ...props }) => <MuiTableRow {...props} />)``;

export const TableCell = styled(({ width, textAlign, ...props }) => <MuiTableCell {...props} />)`
  border: none;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #ffffff;
  padding: 25px 0;
  margin: 0 5px;

  ${({ textAlign }) =>
    textAlign &&
    css`
      text-align: ${textAlign};
    `}

  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `};
`;

//Collapsible Table styled components

export const CollapsibleTable = styled(({ ...props }) => <MuiTable {...props} />)`
  border-left: 1px solid ${theme.colors.golden};
  max-width: 1100px;
  margin: 0 auto;

  ${TableHead} {
    border: none;
  }

  ${TableHead} th {
    color: ${theme.colors.golden};
  }

  @media ${maxComputer} {
    margin-left: 0;
  }
`;

export const CollapsibleTableRow = styled(({ ...props }) => <MuiTableRow {...props} />)``;
