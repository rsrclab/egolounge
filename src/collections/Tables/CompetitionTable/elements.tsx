/* eslint-disable jsx-a11y/alt-text */
import styled from "styled-components";
import { IconButton as BaseIconButton } from "@mui/material";
import {
  Table as BaseTable,
  CollapsibleTable as BaseCollapsibleTable,
  TableBody as BaseTableBody,
  TableHead as BaseTableHead,
  TableRow as BaseTableRow,
  TableCell as BaseTableCell,
  Collapse as BaseCollapse,
  Button as BaseButton,
  CompetitionCancelButton as BaseCompetitionCancelButton,
  CompetitionKickButton as BaseCompetitionKickButton,
  CompetitionLeaveButton as BaseCompetitionLeaveButton,
  Image as BaseImage
} from "~/components";
import { maxComputer, theme } from "~/styles";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CopyToClipboardIcon as BaseCopyToClipboardIcon
} from "~/assets";

export { CompetitionCollapsedRow } from "~/collections";

export const KeyboardArrowDown = styled(({ ...props }) => (
  <ArrowDownIcon {...props} color={theme.colors.golden} />
))``;

export const KeyboardArrowUp = styled(({ ...props }) => (
  <ArrowUpIcon {...props} color={theme.colors.golden} />
))``;

export const ViewCompetitionButton = styled(({ ...props }) => (
  <BaseButton {...props} variant='contained' typography={{ variant: "h4" }} />
))``;

export const IconButton = styled(({ ...props }) => <BaseIconButton {...props} />)``;

export const Collapse = styled(({ ...props }) => <BaseCollapse {...props} />)``;

export const CollapsibleTable = styled(({ ...props }) => <BaseCollapsibleTable {...props} />)``;

export const Table = styled(({ ...props }) => <BaseTable {...props} />)``;

export const TableBody = styled(({ ...props }) => <BaseTableBody {...props} />)``;

export const TableHead = styled(({ ...props }) => <BaseTableHead {...props} />)``;

export const TableCell = styled(({ ...props }) => <BaseTableCell {...props} />)``;

export const CollapsedTableCell = styled(({ ...props }) => <BaseTableCell {...props} />)`
  padding: 15px 0;

  &:last-of-type {
    padding-left: 30px;

    @media ${maxComputer} {
      padding-left: 15px;
    }
  }
`;

export const TableRow = styled(({ ...props }) => <BaseTableRow {...props} />)`
  ${CollapsedTableCell}:first-of-type {
    padding-left: 25px;
  }
`;

export const CollapsedTableRow = styled(({ ...props }) => <BaseTableRow {...props} />)`
  & > td {
    padding: 0 70px;
  }

  th:first-of-type {
    padding-left: 25px;
  }
`;

export const CompetitionCancelButton = styled(({ ...props }) => (
  <BaseCompetitionCancelButton {...props} />
))``;

export const CompetitionKickButton = styled(({ ...props }) => (
  <BaseCompetitionKickButton {...props} />
))``;

export const CompetitionLeaveButton = styled(({ ...props }) => (
  <BaseCompetitionLeaveButton {...props} />
))``;

export const Image = styled(({ ...props }) => <BaseImage {...props} />)`
  border-radius: 5px;
`;

export const CompetitionCode = styled(({ ...props }) => <span {...props} />)`
  cursor: pointer;
`;

export const CopyToClipboardIcon = styled(({ ...props }) => (
  <BaseCopyToClipboardIcon {...props} color={theme.colors.golden} />
))`
  margin-left: 5px;
`;
