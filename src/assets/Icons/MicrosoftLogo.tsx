/* eslint-disable @next/next/no-img-element */
import { IconProps } from "~/types";

export const MicrosoftLogo: React.FC<IconProps> = ({ ...props }) => {
  return (
    <img {...props} src='/static/img/socials/xboxLogo.png' width={40} height={30} alt='Xbox Live' />
  );
};
