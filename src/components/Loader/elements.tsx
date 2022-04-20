import styled, { css } from "styled-components";
import { theme } from "~/styles";

const colors = {
  golden: css`
    border: 8px solid ${theme.colors.lightGray};
    border-top: 8px solid ${theme.colors.golden};
  `,
  reverseGolden: css`
    border: 8px solid ${theme.colors.golden};
    border-top: 8px solid ${theme.colors.lightGray};
  `,
  gray: css`
    border: 8px solid ${theme.colors.black1F};
    border-top: 8px solid ${theme.colors.gray};
  `,
  reverseGray: css`
    border: 8px solid ${theme.colors.gray};
    border-top: 8px solid ${theme.colors.black1F};
  `
};

export const StyledLoader = styled(({ color, ...props }) => <div {...props} />)`
  ${({ color }) => colors[color]};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  z-index: 99999;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
