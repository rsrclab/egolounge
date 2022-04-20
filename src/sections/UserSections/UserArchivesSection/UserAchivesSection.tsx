import * as S from "./elements";
import { UserCompetitionCard } from "~/collections";

export const UserArchivesSection = ({ competitions, ...props }) => {
  return (
    <S.Container {...props}>
      {competitions.length ? (
        competitions.map((competitionProps, i) => (
          <UserCompetitionCard key={competitionProps.name + i} {...competitionProps} />
        ))
      ) : (
        <S.Text style={{ color: "white", margin: "0 auto" }}>
          Competitor has not participated in any games yet!
        </S.Text>
      )}
    </S.Container>
  );
};
