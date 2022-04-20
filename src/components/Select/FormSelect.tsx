import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import * as S from "./elements";
import { SelectProps } from "./Select";

export interface FormSelectProps extends SelectProps {
  form: UseFormReturn<FieldValues, object>;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  id,
  options,
  onChange = null,
  defaultValue = options[0],
  value = null,
  openUpwards = false,
  form,
  ...props
}) => {
  const {
    control,
    formState: { errors }
  } = form as any;

  return (
    <S.SectionContainer {...props}>
      <Controller
        name={id}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <S.SelectContainer
            {...field}
            isSearchable={false}
            options={options}
            value={value ? value : field.value}
            openUpwards={openUpwards}
            onChange={onChange ? onChange : field.onChange}
            isOptionDisabled={option => option.isDisabled}
          />
        )}
      />
      {errors[id + ".value"] && <S.ErrorMessage>{errors[id + ".value"].message}</S.ErrorMessage>}
    </S.SectionContainer>
  );
};
