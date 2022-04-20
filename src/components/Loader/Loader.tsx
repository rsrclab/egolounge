import * as S from "./elements";

interface LoaderProps {
  color?: "golden" | "gray" | "reverseGolden" | "reverseGray";
}

export const Loader: React.FC<LoaderProps> = ({ color = "primary", ...props }) => {
  return <S.StyledLoader {...props} color={color} />;
};
