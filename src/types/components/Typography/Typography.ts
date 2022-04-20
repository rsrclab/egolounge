export interface TypographyProps {
    color?: "white" | "golden" | "brown" | "gray";
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
    lineHeight?: "44px" | "32px" | "30px" | "24px" | "20px" | "16px" | "14px";
    weight?: 400 | 500 | 600 | 700;
    isItalic?: boolean;
    isUnderlined?: boolean;
  }