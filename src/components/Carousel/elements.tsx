import styled from "styled-components";
import { maxTablet, theme } from "~/styles";

export const CarouselContainer: React.FC = styled(({ ...props }) => <div {...props} />)`
  margin-top: 60px;
  text-align: center;

  .swiper { 
    padding: 0 15px 
  }

  .swiper-pagination {
    bottom: 0;
  }

  .swiper-pagination-bullet {
    height: 15px;
    width: 15px;
    margin: 0 10px !important;
  }

  .swiper-pagination-bullet-active {
    background: ${theme.colors.golden};
  }

  .swiper-wrapper {
    margin: 40px 0;
  }

  @media ${maxTablet} {
    margin-top: 0;
  }
`;
