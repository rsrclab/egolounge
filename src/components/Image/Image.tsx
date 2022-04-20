import { ImageProps } from "next/image";
import * as S from "./elements";

export const Image: React.FC<ImageProps> = ({ ...props }) => {
  return <S.Image {...props} />;
};
