import styled from "styled-components";
import { Popup as BasePopup } from "~/components";

export const Popup = styled(({ ...props }) => (
  <BasePopup {...props} width='375px' hasCloseButton={false} />
))``;
