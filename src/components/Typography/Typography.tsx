import * as S from "./elements";
import { TypographyProps } from "~/types";

const typographies = {
  h1: ({ ...props }) => <S.Heading1 {...props} />,
  h2: ({ ...props }) => <S.Heading2 {...props} />,
  h3: ({ ...props }) => <S.Heading3 {...props} />,
  h4: ({ ...props }) => <S.Heading4 {...props} />,
  h5: ({ ...props }) => <S.Heading5 {...props} />,
  h6: ({ ...props }) => <S.Heading6 {...props} />
};

export const Typography: React.FC<TypographyProps> = ({ variant, ...props }) => {
  const SelectedTypography = typographies[variant];

  return <SelectedTypography {...props} />;
};
