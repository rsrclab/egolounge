import { useContext } from "react";
import { CreateCompetitionForm } from "~/collections";
import { PopupContext } from "~/context";
import { PopupProps } from "~/types";
import * as S from "./elements";

interface CreateCompetitionPopupProps extends PopupProps {
  gameName: string;
}

export const CreateCompetitionPopup: React.FC<
  Omit<CreateCompetitionPopupProps, "children" | "toggled" | "toggleOnClick">
> = ({ gameName, ...props }) => {
  const {
    createCompetition: { toggled, handleToggle }
  } = useContext(PopupContext);

  return (
    <S.Popup {...props} toggled={toggled} toggleOnClick={handleToggle}>
      <S.PopupTitle>Create a Competition</S.PopupTitle>
      <CreateCompetitionForm />
    </S.Popup>
  );
};
