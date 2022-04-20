import styled, { css } from "styled-components";
import { Typography } from "~/components";
export { CloseButton as PopupCloseButton } from "~/components";
import { maxSmallMobile, maxTablet, theme } from "~/styles";

const showPopup = css`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000090;
  z-index: 998;
  opacity: 1;
  pointer-events: all;
`;

export const PopupOverlay = styled(({ popupToggled, ...props }) => <div {...props} />)`
  opacity: 0;
  pointer-events: none;
  color: ${theme.colors.white};

  ${({ popupToggled }) => popupToggled && showPopup}
`;

export const PopupContainer = styled(
  ({ popupToggled, width, padding, positionInset, ...props }) => <div {...props} />
)`
  z-index: 999;
  position: fixed;
  ${({ positionInset }) =>
    positionInset
      ? css`
          inset: ${positionInset};
        `
      : css`
          top: 10px;
          left: 50%;
          right: 0;
          transform: translateX(-50%);
        `};
  max-width: ${({ width = "375px" }) => width};
  width: 100%;
  color: ${theme.colors.white};
  text-align: center;
  border-radius: 10px;
  max-height: 95%;
  height: fit-content;

  & > div {
    padding: ${({ padding = "40px 30px" }) => padding && padding};
    border-radius: 10px;
    background-color: ${theme.colors.black};
  }

  @media ${maxTablet} {
    width: 380px;
  }

  @media ${maxSmallMobile} {
    width: 95%;
  }
`;

export const Title = styled(({ ...props }) => (
  <Typography {...props} variant='h2' weight={600} lineHeight='30px' />
))`
  margin-bottom: 40px;

  @media ${maxTablet} {
    font-size: 20px;
  }
`;
