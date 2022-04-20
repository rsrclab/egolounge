import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      black: string;
      darkGray: string;
      gray: string;
      white: string;
      whiteFA: string;
      blue4C: string;
      blue12: string;
      blue37: string;
      blue6a: string;
      golden: string;
      black1F: string;
      lightGray: string;
      brown: string;
      red: string;
    };
    gradient: { gray: ThemedCssFunction; yellow: ThemedCssFunction; brown: ThemedCssFunction };
  }
}

// TODO: Factories for User/Competition, check validity...
