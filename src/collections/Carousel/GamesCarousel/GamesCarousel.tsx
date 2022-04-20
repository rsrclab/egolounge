import md5 from "md5";
import { Pagination } from "swiper";
import { Carousel } from "~/components";
import { games } from "~/data";
import { GameCard } from "~/collections";
import "swiper/css";
import "swiper/css/pagination";
import { SwiperSlide } from "swiper/react";

const gamesCovers = games.map(({ bigLogoImg, name }) => ({ coverImage: bigLogoImg, name }));

export const GamesCarousel = ({ selectedGame, ...props }) => {
  const swiperConfig = {
    modules: [Pagination],
    slidesPerView: 1.2,
    pagination: { clickable: true },
    scrollbar: { draggable: true }
  };

  return (
    <Carousel {...props} config={swiperConfig}>
      {gamesCovers.map(({ coverImage, name }, i) => {
        return (
          <SwiperSlide key={md5("gamecardimg" + [i])}>
            <GameCard active={name === selectedGame} imgProps={coverImage} />
          </SwiperSlide>
        );
      })}
    </Carousel>
  );
};
