import { SectionContainerProps } from "~/types";
import * as S from "./elements";

export const SectionContainer: React.FC<SectionContainerProps> = ({ ...props }) => {
  return <S.SectionContainer {...props} />;
};
