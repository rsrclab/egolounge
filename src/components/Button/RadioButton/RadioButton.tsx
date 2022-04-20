import * as S from "./elements";
import { Image } from "~/components";
import { ImageProps } from "next/image";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface RadioButtonProps {
  id?: string;
  gameLogoImg?: ImageProps;
  group?: string;
  value: string;
  onChange: (e: any) => void;
  name?: string;
  formRegisterId: string;
  form: UseFormReturn<FieldValues, object>;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  gameLogoImg,
  group,
  value,
  onChange,
  formRegisterId,
  form,
  ...props
}) => {
  const { register } = form;

  return (
    <S.RadioLabel {...props}>
      <S.RadioButton {...register(formRegisterId)} id={value} value={value} />
      {gameLogoImg && <Image {...gameLogoImg} />}
    </S.RadioLabel>
  );
};
