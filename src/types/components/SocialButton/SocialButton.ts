export interface SocialButtonProps {
  Icon: any;
  backgroundColor?: string;
  href?: string;
  providerConfig: { provider: any; providerExtraArg?: string };
  isCustomProvider?: boolean;
}
