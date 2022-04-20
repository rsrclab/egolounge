import * as S from "./elements";
import { SocialButtonProps } from "~/types";
import { auth, signInWithPopupWrapper } from "../../../lib";

export const SocialButton: React.FC<SocialButtonProps> = ({
  providerConfig,
  isCustomProvider,
  Icon,
  href = "/",
  ...props
}) => {
  const handleSignInOnClick = async () => {
    if (auth.currentUser) return;
    if (isCustomProvider) {
      return providerConfig.provider();
    }
    if (providerConfig.providerExtraArg && providerConfig.providerExtraArg.length > 0) {
      return await signInWithPopupWrapper(providerConfig.provider, providerConfig.providerExtraArg);
    }
    return await signInWithPopupWrapper(providerConfig.provider);
  };

  return (
    <S.SocialButton {...props} onClick={handleSignInOnClick}>
      {Icon && <Icon />}
    </S.SocialButton>
  );
};
