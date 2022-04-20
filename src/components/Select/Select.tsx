import * as S from "./elements";

export interface SelectProps {
  id: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange?: any;
  defaultValue: {
    value: string;
    label: string;
  };
  value?: {
    value: string;
    label: string;
  };
  openUpwards?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  id,
  options,
  onChange = null,
  defaultValue = options[0],
  value = options[0],
  openUpwards = false,
  ...props
}) => {
  return (
    <S.SectionContainer {...props}>
      <S.SelectContainer
        isSearchable={false}
        options={options}
        defaultValue={defaultValue}
        openUpwards={openUpwards}
        onChange={onChange && onChange}
      />
    </S.SectionContainer>
  );
};
