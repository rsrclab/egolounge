import React from "react";
import * as S from "./elements";
import { HeroProps } from "~/types";

export const Hero: React.FC<HeroProps> = ({
  text,
  heroImgPath = "/static/img/homehero.png",
  ...props
}) => {
  return (
    <S.SectionContainer {...props}>
      <S.ImageContainer backgroundImage={heroImgPath}>
        <S.Typography variant='h1' weight={400} color='golden'>
          {text}
        </S.Typography>
      </S.ImageContainer>
    </S.SectionContainer>
  );
};
