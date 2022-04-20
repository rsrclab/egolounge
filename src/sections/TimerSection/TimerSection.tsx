import { useEffect, useState } from "react";
import * as S from "./elements";

interface TimerSectionProps {
  name: string;
  startsAt: Date;
  playersCount: number;
}

export const TimerSection: React.FC<TimerSectionProps> = ({
  name,
  startsAt,
  playersCount,
  ...props
}) => {
  const [timeleft, setTimeleft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const intervalHandler = setInterval(() => {
      const now = new Date().getTime();
      const timeleft = startsAt.getTime() - now;

      const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

      setTimeleft(prevTime => ({ ...prevTime, days, hours, minutes, seconds }));
    }, 1000);

    return () => {
      clearInterval(intervalHandler);
    };
  }, [startsAt]);

  return (
    <S.SectionContainer {...props}>
      <S.ContentContainer>
        <S.Subtitle>{name}</S.Subtitle>
        <S.Title>Starts in:</S.Title>
        <S.Container>
          <S.Countdown>
            <S.CountdownTypography>{timeleft.days}</S.CountdownTypography>
            <span>Days</span>
          </S.Countdown>
          <S.Countdown>
            <S.CountdownTypography>{timeleft.hours}</S.CountdownTypography>
            <span>Hours</span>
          </S.Countdown>
          <S.Countdown>
            <S.CountdownTypography>{timeleft.minutes}</S.CountdownTypography>
            <span>Minutes</span>
          </S.Countdown>
          <S.Countdown>
            <S.CountdownTypography>{timeleft.seconds}</S.CountdownTypography>
            <span>Seconds</span>
          </S.Countdown>
        </S.Container>
      </S.ContentContainer>

      <S.SectionActions>
        <S.Subtitle>Joined Competitors: {playersCount}</S.Subtitle>

        {/* <S.Button value='DETAILS' /> */}
      </S.SectionActions>
    </S.SectionContainer>
  );
};
