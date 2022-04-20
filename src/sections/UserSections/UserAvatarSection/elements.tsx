import styled, { css } from "styled-components";
import { theme, maxTablet } from "~/styles";
import { Typography, Image, Button as BaseButton } from "~/components";
import {
  PencilIcon as BasePencilIcon,
  CloseIcon as BaseCloseIcon,
  CheckmarkIcon as BaseCheckmarkIcon
} from "~/assets";
import { ButtonProps } from "~/types";

export const SectionContainer = styled(({ ...props }) => <div {...props} />)`
  position: relative;
  margin: 0 auto;
`;

export const FullInfoContainer = styled(({ ...props }) => <div {...props} />)`
  margin: 60px 0;
  max-width: 255px;
  display: flex;

  @media ${maxTablet} {
    margin: 40px 0;
  }
`;

export const Container = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  width: 125px;
  height: 125px;
  background-color: ${theme.colors.black1F};
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

// eslint-disable-next-line jsx-a11y/alt-text
export const UserAvatar = styled(({ ...props }) => <Image {...props} />)`
  border-radius: 15px;
`;

export const InfoContainer = styled(({ ...props }) => <div {...props} />)`
  flex-basis: 50%;
  padding: 3px 0 3px 15px;
`;

export const Title = styled(({ ...props }) => (
  <Typography {...props} variant='h4' weight={600} lineHeight='24px' />
))`
  margin: 5px 0 10px;
  color: ${theme.colors.white};
`;

export const MaxSize = styled(({ ...props }) => (
  <Typography {...props} variant='h5' weight={400} color='gray' />
))`
  // margin: 0; to reset margin
  margin: 0;
  margin-bottom: 22px;
`;

export const EditContainer = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  gap: 15px;
`;

export const Edit = styled(({ ...props }) => <input {...props} type='file' />)`
  position: absolute;

  cursor: pointer;
  ::-webkit-file-upload-button {
    cursor: pointer;
  }
  height: 40px;
  width: 40px;
  z-index: 2;
  opacity: 0;
`;

export const PencilIcon = styled(({ ...props }) => <BasePencilIcon {...props} />)`
  pointer-events: none;
`;

export const AvatarEditorContainer = styled(({ show, ...props }) => <div {...props} />)`
  pointer-events: none;

  ${({ show }) =>
    show &&
    css`
      opacity: 1;
      pointer-events: all;
    `}

  canvas {
    border-radius: 15px;
  }
`;

export const ScaleInput = styled(({ ...props }) => <input {...props} type='range' />)`
  position: absolute;
  top: 50px;
  left: -85px;
  transform: rotate(90deg);
  accent-color: ${theme.colors.golden};
`;

export const Button: React.FC<ButtonProps> = styled(({ ...props }: ButtonProps) => (
  <BaseButton {...props} />
))`
  position: absolute;
  bottom: -15px;
  left: 0;
  min-height: 30px;
  max-height: 30px;
  min-width: 125px;
`;

export const ErrorMessage = styled(({ ...props }) => <span {...props} />)`
  color: ${theme.colors.red}95;
  font-size: 12px;
  margin-left: 10px;
  width: fit-content;
  text-align: center;
  position: absolute;
  bottom: -25px;
  left: 0;
`;

export const IconContainer: React.FC = styled(({ ...props }) => <div {...props} />)`
  cursor: pointer;
  position: relative;
  height: 40px;
  width: 40px;
  border: 1px solid ${theme.colors.golden};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CloseIcon = styled(({ ...props }) => <BaseCloseIcon {...props} />)``;

export const CheckmarkIcon = styled(({ ...props }) => <BaseCheckmarkIcon {...props} />)``;
