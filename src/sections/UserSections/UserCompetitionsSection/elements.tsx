import styled, { css } from "styled-components";
import { SectionContainer as BaseSectionContainer } from "~/components";
import React from "react";
import { maxTablet, theme } from "~/styles";
import { CompetitionTable } from "~/collections";

export const SectionContainer = styled(({ ...props }) => <BaseSectionContainer {...props} />)`
  margin-top: 100px;
  margin-bottom: 65px;
  padding: 0 50px;

  * {
    font-family: inherit;
  }

  @media ${maxTablet} {
    padding: 0 10px;
    margin-top: 60px;
  }
`;

export const DesktopWrapper = styled(({ showContainer, ...props }) => <div {...props} />)`
  display: none;
  ${({ showContainer }) =>
    showContainer &&
    css`
      display: block;
    `}

  & > div {
    box-shadow: none;
    background-color: ${theme.colors.black1F};
    border-radius: 15px;
    padding: 15px 10px;
  }
`;

export const CompetitionsTable = styled(({ ...props }) => <CompetitionTable {...props} />)``;

export const MobileWrapper = styled(({ showContainer, ...props }) => <div {...props} />)`
  display: none;

  ${({ showContainer }) =>
    showContainer &&
    css`
      width: 100%;
      display: block;
    `}
`;
