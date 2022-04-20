/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */

import { useContext } from "react";
import { PopupContext } from "~/context";
import { UserContext } from "~/context";

export const ComponentWithAuthorization = (action, type) => {
  const { user } = useContext(UserContext);
  const {
    emailNotVerified: { handleToggle }
  } = useContext(PopupContext);

  if (type !== "emailVerified" && !user.emailVerified) {
    // get verified popup
    handleToggle();
  } else {
    action();
  }

  return <></>;
};
