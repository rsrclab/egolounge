import * as S from "./elements";
import { CarouselProps } from "~/types";
import { Swiper } from "swiper/react";
import { Pagination } from "swiper";

export const Carousel: React.FC<CarouselProps> = ({ config, children, ...props }) => {
  return (
    <S.CarouselContainer {...props}>
      <Swiper
        {...config}
        modules={[Pagination]}
        slidesPerView={1.2}
        spaceBetween={30}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {children}
      </Swiper>
    </S.CarouselContainer>
  );
};
