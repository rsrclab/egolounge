import * as S from "./elements";
import { useContext, useEffect, useState } from "react";
import { PopupContext, UserContext } from "~/context";
import { games } from "~/data";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  useYupValidationResolver,
  getNextSevenDays,
  createJoiningCompetitionDefaultPlayer
} from "~/utils";
import { ICompetitionFormInput, IGame } from "~/types";
import axios from "axios";

const daysRequired: number = 7;
const daysToPick = getNextSevenDays(daysRequired);

const forbiddenTime = 1;

const createCompetitionSchema = (validHours: number[], selectedDate, gamesToPick) =>
  yup.object({
    competitionName: yup
      .string()
      .required("Competition Name is required")
      .max(20, "Competition Name must be max 20 characters"),
    hoursPicked: yup.string().nullable().required("You have to choose an hour"),
    ampmHour: yup.string().nullable().required("Choose either AM or PM"),
    gamePicked: yup
      .object()
      .shape({
        label: yup.string(),
        value: yup
          .string()
          .oneOf(
            gamesToPick.map(g => g.value),
            "Choose correct game"
          )
          .required("You have to choose a game")
      })
      .nullable(),
    startDate: yup
      .object()
      .shape({
        label: yup.string(),
        value: yup
          .date()
          .test("checkIfValidDate", "Choose Correct Date", value => {
            if (!value) return false;

            const selectedDate = new Date(value);
            const selectedDayNumber = selectedDate.getDate();

            const availableDays = daysToPick.map(day => day.value.getDate());

            daysToPick.map(d => d.value);

            return availableDays.includes(selectedDayNumber);
          })
          .required("You have to choose start date")
      })
      .nullable()
      .required("You have to choose start date"),
    startTime: yup.object().shape({
      label: yup.string(),
      value: yup
        .number()
        .test("checkIfValidHour", "You have to choose later hour", value => {
          let isValid = true;
          if (selectedDate === daysToPick[0].value) {
            console.log(validHours[0], value, new Date().getMinutes(), 60 - forbiddenTime);
            if (validHours[0] === value && new Date().getMinutes() > 60 - forbiddenTime) {
              isValid = false;
            }
          }

          return isValid;
        })
        .oneOf(validHours, "You have to choose correct start hour")
        .required("You have to choose start hour")
    })
  });

const getAvailableHours = (startHour: number, amPm: "AM" | "PM") => {
  const availableHours: { label: string; value: number }[] = [];
  const endHour = amPm === "AM" ? 12 : 24;
  const midnightOrMiddayCondition = amPm === "AM" ? 0 : 12;
  const midnightOrMiddayLabel = amPm === "AM" ? `0 AM (Midnight)` : `12 PM (Midday)`;
  const midnightOrMiddayValue = amPm === "AM" ? 0 : 12;
  const midnightOrMiddayOption = { label: midnightOrMiddayLabel, value: midnightOrMiddayValue };
  const createAmPmLabel = (i: number) => `${amPm === "AM" ? i : i - 12} ${amPm}`;
  const createAmPmValue = (i: number) => (amPm === "AM" ? i : i - 12);

  for (let i = startHour; i < endHour; i++) {
    if (i === midnightOrMiddayCondition) {
      availableHours.push(midnightOrMiddayOption);
      continue;
    }

    availableHours.push({ label: createAmPmLabel(i), value: createAmPmValue(i) });
  }

  return availableHours;
};

export const CreateCompetitionForm = ({ ...props }) => {
  const [startDate, setStartDate] = useState(daysToPick[0]);
  const [hoursOptions, setHoursOptions] = useState([{ value: 0, label: "No options" }]);
  const [AMRadioButtonDisabled, setAMRadioButtonDisabled] = useState(false);
  const [timeRadioButtonChecked, setTimeRadioButtonChecked] = useState<"AM" | "PM" | null>(null);
  const [error, setError] = useState<boolean | string>(false);
  const { user } = useContext(UserContext);
  const { competitionCode } = useContext(PopupContext);
  const [validHours, setValidHours] = useState<number[]>([]);
  const linkedGames = Object.keys(user.gameAccounts).filter(
    game => user.gameAccounts[game] !== null
  );
  const gamesToPick = games
    .map(({ name, shorthand }) => ({
      value: shorthand,
      label: name
    }))
    .filter(name => linkedGames.find(linkedGame => linkedGame === name.value));
  const resolver = useYupValidationResolver(
    createCompetitionSchema(validHours, startDate.value, gamesToPick)
  );
  const form = useForm({ resolver });
  const {
    register,
    formState: { errors }
  } = form;

  useEffect(() => {
    form.setValue("startDate" as never, daysToPick[0] as never);
    handleStartDayOnChange({
      value: daysToPick[0].value,
      label: daysToPick[0].label
    });

    if (daysToPick[0].value.getHours() >= 23) {
      form.setValue("startDate" as never, daysToPick[1] as never);
      handleStartDayOnChange({
        value: daysToPick[1].value,
        label: daysToPick[1].label
      });
    }

    form.setValue("hoursPicked" as never, "2" as never);
    form.setFocus("competitionName" as never);
    setValidHours(hoursOptions.map(h => h.value));
  }, []);

  useEffect(() => {
    if (startDate.value.getHours() < 11) {
      setAMRadioButtonDisabled(false);
      handleAMRadioButtonOnClick();
      setTimeRadioButtonChecked("AM");
    } else {
      setAMRadioButtonDisabled(true);
      handlePMRadioButtonOnClick();
      setTimeRadioButtonChecked("PM");
    }
  }, [startDate]);

  useEffect(() => {
    setValidHours(hoursOptions.map(h => h.value));
  }, [hoursOptions]);

  const handleAMRadioButtonOnClick = () => {
    setTimeRadioButtonChecked("AM");
    const selectedDate = startDate.value;
    let firstStartHour = selectedDate.getHours();

    if (selectedDate === daysToPick[0].value) {
      firstStartHour = selectedDate.getHours() + 1;
    }

    const amHours = getAvailableHours(firstStartHour, "AM");

    form.setValue("startTime" as never, amHours[0] as never);
    setHoursOptions(amHours);
    setValidHours(hoursOptions.map(h => h.value));
  };

  const handlePMRadioButtonOnClick = () => {
    setTimeRadioButtonChecked("PM");
    const selectedDate = startDate.value;
    const firstStartHour = selectedDate.getHours() < 12 ? 12 : selectedDate.getHours() + 1;

    const pmHours = getAvailableHours(firstStartHour, "PM");

    form.setValue("startTime" as never, pmHours[0] as never);
    setHoursOptions(pmHours);
    setValidHours(hoursOptions.map(h => h.value));
  };

  const handleStartDayOnChange = (currentTime: { value: Date; label: string }) => {
    // currentTime.value = new Date(currentTime.value.setHours(0));
    setStartDate(currentTime);

    form.setValue("startDate" as never, currentTime as never);
    form.resetField("startTime" as never);

    if (currentTime.value.getHours() < 11) {
      form.setValue("ampmHour" as never, "AM" as never);
      setAMRadioButtonDisabled(false);
      handleAMRadioButtonOnClick();
      setTimeRadioButtonChecked("AM");
    } else {
      form.setValue("ampmHour" as never, "PM" as never);
      setAMRadioButtonDisabled(true);
      handlePMRadioButtonOnClick();
      setTimeRadioButtonChecked("PM");
    }
  };

  const onSubmit = async data => {
    const startTime = data.startTime.value;
    const startHour =
      data.ampmHour.toUpperCase() === "AM" ? startTime : startTime === 12 ? 12 : startTime + 12;
    const actualStartsAt = new Date(data.startDate.value.setHours(startHour)).valueOf();

    const createCompetitionData: ICompetitionFormInput = createJoiningCompetitionDefaultPlayer({
      user: user,
      amPm: data.ampmHour.toUpperCase(),
      duration: data.hoursPicked,
      gameName: data.gamePicked.label as IGame["name"],
      competitionName: data.competitionName,
      startsAt: actualStartsAt,
      startTime: data.startTime.value
    });

    try {
      const newCompetitionRes = await axios.post(`/api/competition/create/new`, {
        ...createCompetitionData,
        userId: user.id
      });

      competitionCode.handleOpen(newCompetitionRes.data.competitionId || "");
    } catch (e) {
      console.log(e);
      !(e as any)?.response?.data?.success && setError((e as any).response.data.error);
    }
  };

  return (
    <S.Form {...props} onSubmit={form.handleSubmit(onSubmit)}>
      <S.GamePick>
        <S.GamesDropdown
          id='gamePicked'
          options={gamesToPick}
          defaultValue={
            user.primaryGame
              ? gamesToPick.find(x => x.label === user.primaryGame)
              : { label: "Select a Game", value: "" }
          }
          form={form}
        />
        {errors["gamesPicked"] && <S.ErrorMessage>{errors["gamePicked"].message}</S.ErrorMessage>}
      </S.GamePick>
      <S.InputContainer>
        <S.Input
          placeholder='Competition Name'
          labelText='Competition Name'
          form={form}
          id='competitionName'
        />
      </S.InputContainer>
      <S.DayTimeContainer>
        <S.Dropdown
          id='startDate'
          options={daysToPick}
          defaultValue={{ label: "Date", value: "" }}
          form={form}
          value={startDate}
          onChange={handleStartDayOnChange}
        />
        <S.Dropdown
          id='startTime'
          options={hoursOptions}
          defaultValue={{ label: "Time", value: "" }}
          form={form}
        />
        <S.AMPMRadioContainer>
          <S.RadioButtonsContainer>
            <S.RadioInput
              {...register("ampmHour" as never)}
              id='amHour'
              value='AM'
              onClick={handleAMRadioButtonOnClick}
              disabled={AMRadioButtonDisabled}
              isDisabled={AMRadioButtonDisabled}
              checked={timeRadioButtonChecked === "AM"}
            />
            <S.RadioLabel htmlFor='amHour'>AM</S.RadioLabel>
            <S.RadioInput
              {...register("ampmHour" as never)}
              id='pmHour'
              value='PM'
              onClick={handlePMRadioButtonOnClick}
              checked={timeRadioButtonChecked === "PM"}
            />
            <S.RadioLabel htmlFor='pmHour'>PM</S.RadioLabel>
          </S.RadioButtonsContainer>
          {errors["ampmHour"] && <S.ErrorMessage>{errors["ampmHour"].message}</S.ErrorMessage>}
        </S.AMPMRadioContainer>
      </S.DayTimeContainer>
      <S.RadioContainer>
        <S.RadioContainerTitle>Number of Hours</S.RadioContainerTitle>
        <S.RadioButtonsContainer>
          <S.RadioInput {...register("hoursPicked" as never)} id='hour1' value={2} />
          <S.RadioLabel htmlFor='hour1'>2h</S.RadioLabel>
          <S.RadioInput {...register("hoursPicked" as never)} id='hour2' value={3} />
          <S.RadioLabel htmlFor='hour2'>3h</S.RadioLabel>
          <S.RadioInput {...register("hoursPicked" as never)} id='hour3' value={4} />
          <S.RadioLabel htmlFor='hour3'>4h</S.RadioLabel>
        </S.RadioButtonsContainer>
        {errors["hoursPicked"] && <S.ErrorMessage>{errors["hoursPicked"].message}</S.ErrorMessage>}
      </S.RadioContainer>
      {error && (
        <S.ErrorMessage dangerouslySetInnerHTML={{ __html: error as string }}></S.ErrorMessage>
      )}
      <S.Actions>
        <S.CreateButton type='submit' />
      </S.Actions>
    </S.Form>
  );
};
