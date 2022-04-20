import Link from "next/link";
import styled from "styled-components";
import { theme } from "~/styles";
import { Typography as BaseTypography } from "~/components";
import { ButtonProps, TypographyProps } from "~/types";

export const Button = styled(
  ({
    href,
    color = "primary",
    borderColor,
    variant,
    backgroundColor,
    ...props
  }: Pick<ButtonProps, "href" | "backgroundColor" | "color" | "borderColor" | "variant">) => {
    return href ? (
      <Link href={href} passHref>
        <a {...props} />
      </Link>
    ) : (
      <button {...props} />
    );
  }
)`
  font-family: Arial;
  display: block;
  cursor: pointer;
  min-height: 52px;
  min-width: 150px;
  height: 52px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: 5px;
  border: unset;
  transition: box-shadow 0.4s ease;
  box-shadow: -4px -4px 12px rgba(49, 49, 49, 0.5), 4px 4px 12px #000000;
  &:hover {
    box-shadow: 0px 0px 15px ${theme.colors.primary};
  }

  ${({ color }) => color};
  ${({ variant, theme, borderColor = "primary" }) =>
    (variant === "contained" &&
      `${theme.gradient.yellow}; 
      color: ${theme.colors.black}; 
      h1, h2, h3, h4, h5, h6 { color: ${theme.colors.black} 
    }`) ||
    (variant === "outlined" &&
      `border: 2px solid ${theme.colors[borderColor]}; h1, h2, h3, h4, h5, h6 {color: ${theme.colors.golden}}`)}
`;

export const Typography: React.FC<TypographyProps> = styled(({ ...props }: TypographyProps) => (
  <BaseTypography {...props} />
))`
  margin: 0;
`;
