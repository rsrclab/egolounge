import React from "react";
import { IconProps } from "~/types";

export interface ISocialMediaAccount {
  platform: "Twitch" | "Discord" | "Steam" | "Facebook" | "Twitter" | "Microsoft";
  linked: boolean;
  Logo: React.FC<IconProps>;
  userSocial: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}
