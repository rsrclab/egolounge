import * as S from "./elements";

export const Checkbox = ({ children, id, form, ...props }) => {
  const {
    register,
    formState: { errors }
  } = form;

  return (
    <S.Container {...props}>
      <S.Label>
        <S.Input id={id} {...register(id)} />

        <S.Checkmark />

        <S.Text>{children}</S.Text>
      </S.Label>
      {errors[id] && <S.ErrorMessage>{errors[id].message}</S.ErrorMessage>}
    </S.Container>
  );
};
