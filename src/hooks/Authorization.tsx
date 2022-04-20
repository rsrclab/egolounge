import { useContext } from "react";
import { UserContext, PopupContext } from "~/context";

export const useAuthorization = () => {
  const { user } = useContext(UserContext);
  const { emailNotVerified, notRegistered } = useContext(PopupContext);

  const actionWithVerifiedEmail = (action: () => void) => {
    if (!user.emailVerified) {
      emailNotVerified.handleToggle();
    } else {
      action();
    }
    // action();
  };

  const actionWithLoggedInState = (action: () => void) => {
    if (user.authenticated === "unauthenticated") {
      notRegistered.handleToggle();
    } else {
      action();
    }
  };

  const actionWithLoggedInAndVerified = (action: () => void) => {
    actionWithLoggedInState(() => actionWithVerifiedEmail(action));
  };

  return { actionWithVerifiedEmail, actionWithLoggedInState, actionWithLoggedInAndVerified };
};
