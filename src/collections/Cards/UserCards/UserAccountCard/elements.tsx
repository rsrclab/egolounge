import styled, { css } from "styled-components";
import { Typography, Image as BaseImage } from "~/components";
import { maxMobile, theme } from "~/styles";

const linkedCss = css`
  position: absolute;
  top: 0;
  right: 0;
  border-bottom-right-radius: 5px;
  height: 56px;
  width: 136px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  @media ${maxMobile} {
    width: 125px;
  }
`;

export const Container = styled(({ ...props }) => <div {...props} />)`
  position: relative;
  display: flex;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 11px 0;
  border-radius: 5px 0px 0px 5px;
  height: 56px;

  & + & {
    margin-top: 20px;
  }
`;

export const ImageContainer = styled(({ ...props }) => <div {...props} />)`
  width: 96px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${maxMobile} {
    width: 75px;
    margin-left: 5px;
    margin-right: 5px;
  }
`;

export const Image = styled(({ ...props }) => <BaseImage {...props} />)``;

export const NameContainer = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${theme.colors.white};
  padding-right: 145px;

  @media ${maxMobile} {
    padding-right: 130px;
  }
`;

export const Name = styled(({ ...props }) => (
  <Typography {...props} variant='h4' weight={500} color='golden' />
))`
  margin: 0;
`;

export const LinkContainer = styled(({ ...props }) => <div {...props} />)`
  background: rgba(63, 63, 63, 0.8);
  ${linkedCss}
`;

export const Linked = styled(({ ...props }) => <Typography {...props} variant='h4' weight={500} />)`
  position: relative;
  margin: 0;
  line-height: 20px;
  color: ${theme.colors.golden};
`;

export const NotLinkedContainer = styled(({ ...props }) => <div {...props} />)`
  background: ${theme.colors.primary};
  ${linkedCss}
`;

export const NotLinked = styled(({ ...props }) => (
  <Typography {...props} variant='h4' weight={500} />
))`
  position: relative;
  margin: 0;
  line-height: 20px;
  color: ${theme.colors.white};
`;
