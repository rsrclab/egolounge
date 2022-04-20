import styled from "styled-components";
import { default as NextImage, ImageProps } from "next/image";

export const Image: React.FC<ImageProps> = styled(({ ...props }: ImageProps) => (
  <NextImage {...props} />
))``;
