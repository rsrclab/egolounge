import styled, { css } from "styled-components";
import { italic, underline, theme } from "~/styles";
import { TypographyProps } from "~/types";

const colors = {
  brown: css`
    color: ${theme.colors.brown};
  `,
  golden: css`
    color: ${theme.colors.primary};
  `,
  white: css`
    color: ${theme.colors.white};
  `,
  gray: css`
    color: ${theme.colors.darkGray};
  `
};

const lineHeights = {
  h1: {
    "44px": css`
      line-height: 44px;
    `
  },
  h2: {
    "32px": css`
      line-height: 32px;
    `,
    "30px": css`
      line-height: 30px;
    `
  },
  h3: {
    "30px": css`
      line-height: 30px;
    `
  },
  h4: {
    "24px": css`
      line-height: 24px;
    `,
    "20px": css`
      line-height: 20px;
    `
  },
  h5: {
    "16px": css`
      line-height: 16px;
    `
  },
  h6: {
    "14px": css`
      line-height: 14px;
    `
  }
};

type StyledTypographyProps = Omit<TypographyProps, "variant">;

//can't use : React.FC
export const Heading1 = styled(
  ({ color, lineHeight, weight, isUnderlined, isItalic, ...props }: StyledTypographyProps) => (
    <h1 {...props} />
  )
)`
  ${({ color = "white" }) => colors[color]}
  ${({ lineHeight = "44px" }) => lineHeights.h1[lineHeight]}
  font-weight: ${({ weight }) => weight};

  ${({ isUnderlined }) => isUnderlined && underline}
  ${({ isItalic }) => isItalic && italic}
  font-size: 34px;
`;

//can't use : React.FC
export const Heading2 = styled(
  ({ color = "white", lineHeight, weight, isUnderlined, isItalic, ...props }) => <h2 {...props} />
)`
  ${({ color }) => colors[color]}
  ${({ lineHeight }) => lineHeights.h2[lineHeight]}
  font-weight: ${({ weight }) => weight};

  ${({ isUnderlined }) => isUnderlined && underline}
  ${({ isItalic }) => isItalic && italic}
  font-size: 24px;
`;

//can't use : React.FC
export const Heading3 = styled(
  ({ color = "white", lineHeight, weight, isUnderlined, isItalic, ...props }) => <h3 {...props} />
)`
  ${({ color }) => colors[color]}
  ${({ lineHeight }) => lineHeights.h3[lineHeight]}
  font-weight: ${({ weight }) => weight};

  ${({ isUnderlined }) => isUnderlined && underline}

  ${({ isItalic }) => isItalic && italic}

  font-size: 20px;
`;

//can't use : React.FC
export const Heading4 = styled(
  ({ color = "white", lineHeight, weight, isUnderlined, isItalic, ...props }) => <h4 {...props} />
)`
  ${({ color }) => colors[color]}
  ${({ lineHeight }) => lineHeights["h4"][lineHeight]}
  font-weight: ${({ weight }) => weight};

  ${({ isUnderlined }) => isUnderlined && underline}

  ${({ isItalic }) => isItalic && italic}

  font-size: 16px;
`;

//can't use : React.FC
export const Heading5 = styled(
  ({ color = "white", lineHeight, weight, isUnderlined, isItalic, ...props }) => <h5 {...props} />
)`
  ${({ color }) => colors[color]}
  ${({ lineHeight }) => lineHeights["h5"][lineHeight]}
  font-weight: ${({ weight }) => weight};

  ${({ isUnderlined }) => isUnderlined && underline}

  ${({ isItalic }) => isItalic && italic}

  font-size: 14px;
`;

//can't use : React.FC
export const Heading6 = styled(
  ({ color = "white", lineHeight, weight, isUnderlined, isItalic, ...props }) => <h6 {...props} />
)`
  ${({ color }) => colors[color]}
  ${({ lineHeight }) => lineHeights["h6"][lineHeight]}
  font-weight: ${({ weight }) => weight};

  ${({ isUnderlined }) => isUnderlined && underline}
  ${({ isItalic }) => isItalic && italic}

  font-size: 10px;
`;
