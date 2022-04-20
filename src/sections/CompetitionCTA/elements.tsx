import styled from "styled-components";
import {
  SectionContainer as BaseSectionContainer,
  Input as BaseInput,
  Button as BaseButton,
  Typography
} from "~/components";
import { maxTablet } from "~/styles";
import { PopupContainer } from "../../components/Popup/elements";

export const SectionContainer: React.FC = styled(({ ...props }) => (
  <BaseSectionContainer {...props} />
))`
  display: flex;
  flex-direction: column;
  margin-top: 100px;

  @media ${maxTablet} {
    margin-top: 50px;
  }
`;

export const InnerSectionContainer: React.FC = styled(({ ...props }) => <div {...props} />)`
  position: relative;
  display: flex;
  gap: 30px;

  ${PopupContainer} > div {
    padding: 0;
  }

  @media ${maxTablet} {
    flex-wrap: wrap;
    flex-direction: column;

    h1 {
      text-align: center;
    }

    button {
      width: 100%;
    }
  }
`;

export const Container: React.FC = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 50%;
  padding-right: 50px;

  button {
    min-width: 150px;
    min-height: 52px;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 6px;
    left: 50%;
    right: 0;
    transform: translateX(-50%);
    height: 80%;
    width: 2px;
    background-color: rgba(255, 255, 255, 0.4);

    @media ${maxTablet} {
      width: 50%;
      height: 2px;
      top: 50%;
      bottom: 0;
      transform: translate(-50, 50%);
      margin-top: 40px;
    }
  }

  @media ${maxTablet} {
    padding: 0;
  }
`;

export const CompetitionInputContainer: React.FC = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  align-items: flex-end;
  gap: 30px;

  @media ${maxTablet} {
    flex-wrap: wrap;
    place-content: center;
  }
`;

export const Input = styled(({ ...props }) => <BaseInput {...props} />)``;

export const Button = styled(({ ...props }) => (
  <BaseButton {...props} variant='contained' typography={{ variant: "h4" }} />
))`
  height: 52px;
  width: 150px;
`;

export const Title: React.FC = styled(({ ...props }) => (
  <Typography {...props} variant='h1' color='white' />
))``;

export const CreateCompetitionContainer: React.FC = styled(({ ...props }) => <div {...props} />)`
  flex-basis: 50%;
  padding-left: 50px;

  h1 {
    padding-bottom: 25px;
  }

  @media ${maxTablet} {
    padding: 35px 0 0;
  }
`;
