import styled, { css } from "styled-components";
import { theme } from "~/styles";
import {
  Button as BaseButton,
  Typography as BaseTypography,
  Card as BaseCard,
  CardRow as BaseCardRow,
  Image as BaseImage,
  CompetitionCancelButton as BaseCompetitionCancelButton,
  CompetitionKickButton as BaseCompetitionKickButton,
  CompetitionLeaveButton as BaseCompetitionLeaveButton
} from "~/components";
import { IconButton as BaseIconButton } from "@mui/material";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CopyToClipboardIcon as BaseCopyToClipboardIcon
} from "~/assets";

const textAligns = {
  center: css`
    text-align: center;
  `,
  right: css`
    text-align: right;
  `
};

export const Typography = styled(({ textAlign, ...props }) => (
  <BaseTypography {...props} variant='h4' color='white' weight={600} />
))`
  margin: 0;
  vertical-align: middle;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${({ textAlign }) => textAlign && textAligns[textAlign]}
`;

export const Card = styled(({ ...props }) => <BaseCard {...props} />)`
  a {
    display: inline-block;
  }
`;

export const CardRow = styled(({ ...props }) => <BaseCardRow {...props} />)`
  & > ${Typography} {
    margin: 15px 0;
  }
`;

export const ActionsContainer = styled(({ ...props }) => <div {...props} />)`
  margin-top: 30px;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled(({ ...props }) => <div {...props} />)``;

export const Image = styled(({ ...props }) => <BaseImage {...props} />)`
  border-radius: 5px;
`;

export const Button = styled(({ ...props }) => (
  <BaseButton {...props} variant='contained' typography={{ weight: 700, variant: "h4" }} />
))``;

export const PlayerData = styled(({ ...props }) => <div {...props} />)`
  border-top: 1px solid ${theme.colors.golden};
  padding-top: 20px;

  & + & {
    margin-top: 20px;
  }

  &:first-of-type {
    margin-top: 30px;
  }
`;

export const KeyboardArrowDown = styled(({ ...props }) => (
  <ArrowDownIcon {...props} color={theme.colors.golden} />
))``;

export const KeyboardArrowUp = styled(({ ...props }) => (
  <ArrowUpIcon {...props} color={theme.colors.golden} />
))``;

export const IconButton = styled(({ ...props }) => <BaseIconButton {...props} />)`
  position: absolute;
  bottom: 10px;
  left: 0;
  padding: 0;

  svg {
    width: 30px;
    height: 30px;
  }
`;

export const CompetitionCode = styled(({ ...props }) => <span {...props} />)`
  cursor: pointer;
`;

export const CopyToClipboardIcon = styled(({ ...props }) => (
  <BaseCopyToClipboardIcon {...props} color={theme.colors.golden} />
))`
  margin-left: 5px;
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
