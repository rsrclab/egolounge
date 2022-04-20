import { DefaultTheme, css } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    primary: "#dea30a",
    secondary: "#793e3e",
    black: "#191919",
    darkGray: "#4e4e4e",
    lightGray: "#3F3F3F",
    gray: "#bcbcbc",
    white: "#fff",
    whiteFA: "#FAFAFA",
    blue4C: "#4c16be",
    blue12: "#1258b4",
    blue37: "#37abff",
    blue6a: "#6a6db0",
    golden: "#F2C44E",
    black1F: "#1F1F1F",
    brown: "#793E3E",
    red: "#e0243d"
  },
  gradient: {
    gray: css`
      background: linear-gradient(180deg, #bcbcbc 0%, #4a4a4a 100%);
    `,
    yellow: css`
      background: linear-gradient(180deg, #ffdb7d 0%, #dea30a 100%);
    `,
    brown: css`
      background: linear-gradient(180deg, #793e3e 0%, #301818 100%);
    `
  }
};
