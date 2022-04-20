/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect } from "react";
import { IGame } from "~/types";

type PopupProps = {
  handleToggle: () => void;
  handleClose: () => void;
  handleOpen: () => void;
  toggled: boolean;
  keepOpened: boolean;
};
interface PopupContextProps {
  code: string;
  gameName: string;
  competitionAction: string;
  simpleCompetitionId?: string;
  simpleTargetPlayerId?: string;
  reauthenticateForm: string;
  popups: any;
  login: PopupProps;
  redirectToAccount: PopupProps;
  forgottenPassword: PopupProps;
  emailSent: PopupProps;
  createCompetition: PopupProps;
  notRegistered: PopupProps;
  competitionCode: Omit<PopupProps, "handleOpen"> & { handleOpen: (code: string) => void };
  username: PopupProps;
  emailNotVerified: PopupProps;
  cookiesConsent: PopupProps;
  simple: Omit<PopupProps, "handleOpen"> & {
    handleOpen: (
      action: string,
      simpleCompetitionId?: string,
      simpleTargetPlayerId?: string
    ) => void;
  };
  reauthenticate: Omit<PopupProps, "handleOpen"> & {
    handleOpen: (form: "password" | "email") => void;
  };
  gameLink: Omit<PopupProps, "handleOpen"> & {
    handleOpen: (gameName: IGame["shorthand"]) => void;
  };
}

const defaultPopupProps = {
  handleToggle: () => {},
  handleClose: () => {},
  handleOpen: () => {},
  toggled: false,
  keepOpened: false
};

const defaultPopupState = {
  code: "",
  gameName: "",
  competitionAction: "",
  simpleCompetitionId: "",
  reauthenticateForm: "",
  popups: {},
  login: defaultPopupProps,
  simple: defaultPopupProps,
  forgottenPassword: defaultPopupProps,
  emailSent: defaultPopupProps,
  createCompetition: defaultPopupProps,
  competitionCode: defaultPopupProps,
  username: defaultPopupProps,
  emailNotVerified: defaultPopupProps,
  notRegistered: defaultPopupProps,
  reauthenticate: defaultPopupProps,
  gameLink: defaultPopupProps,
  cookiesConsent: defaultPopupProps,
  redirectToAccount: defaultPopupProps
};

export const PopupContext = createContext<PopupContextProps>(defaultPopupState);

const closeAllPopups = popups => {
  Object.keys(popups).forEach(popupKeyName => popups[popupKeyName].handleClose());
};

const anyOpenedPopup = popups => {
  let isOpened = false;
  Object.keys(popups).forEach(popup => {
    if (popups[popup].toggled) {
      isOpened = true;
    }
  });

  return isOpened;
};

export const PopupProvider = ({ children }) => {
  const [loginPopupToggled, setLoginPopupToggled] = useState(false);
  const [forgottenPasswordPopupToggled, setForgottenPasswordPopupToggled] = useState(false);
  const [emailSentPopupToggled, setEmailSentPopupToggled] = useState(false);
  const [createCompetitionPopupToggled, setCreateCompetitionPopupToggled] = useState(false);
  const [competitionCodePopupToggled, setCompetitionCodePopupToggled] = useState(false);
  const [usernamePopupToggled, setUsernamePopupToggled] = useState(false);
  const [emailNotVerifiedPopupToggled, setEmailNotVerifiedPopupToggled] = useState(false);
  const [notRegisteredPopupToggled, setNotRegisteredPopupToggled] = useState(false);
  const [redirectToAccount, setRedirectToAccount] = useState(false);
  const [reauthenticatePopupToggled, setReauthenticatePopupToggled] = useState(false);
  const [gameLinkPopupToggled, setGameLinkPopupToggled] = useState(false);
  const [simplePopupToggled, setSimplePopupToggled] = useState(false);
  const [cookiesConsentToggled, setCookiesConsentPopupToggled] = useState(false);
  const [code, setCode] = useState("");
  const [gameName, setGameName] = useState("");
  const [competitionAction, setCompetitionAction] = useState("");
  const [simpleCompetitionId, setSimpleCompetitionId] = useState("");
  const [simpleTargetPlayerId, setSimpleTargetPlayerId] = useState("");
  const [reauthenticateForm, setReauthenticateForm] = useState("");
  const [lastOpenedPopup, setLastOpenedPopup] = useState<string>("");

  const popups = {
    login: {
      handleToggle: () => setLoginPopupToggled(prevState => !prevState),
      handleClose: () => setLoginPopupToggled(false),
      handleOpen: () => {
        setLoginPopupToggled(true);
        setLastOpenedPopup("login");
      },
      toggled: loginPopupToggled,
      keepOpened: false
    },
    simple: {
      handleToggle: () => setSimplePopupToggled(prevState => !prevState),
      handleClose: () => setSimplePopupToggled(false),
      handleOpen: (action, simpleCompetitionId, simpleTargetPlayerId) => {
        setCompetitionAction(action || "");
        simpleCompetitionId && setSimpleCompetitionId(simpleCompetitionId);
        simpleTargetPlayerId && setSimpleTargetPlayerId(simpleTargetPlayerId);
        setSimplePopupToggled(true);
        setLastOpenedPopup("simple");
      },
      toggled: simplePopupToggled,
      keepOpened: false
    },
    forgottenPassword: {
      handleToggle: () => setForgottenPasswordPopupToggled(prevState => !prevState),
      handleClose: () => setForgottenPasswordPopupToggled(false),
      handleOpen: () => {
        setForgottenPasswordPopupToggled(true);
        setLastOpenedPopup("forgottenPassword");
      },
      toggled: forgottenPasswordPopupToggled,
      keepOpened: false
    },
    emailSent: {
      handleToggle: () => setEmailSentPopupToggled(prevState => !prevState),
      handleClose: () => setEmailSentPopupToggled(false),
      handleOpen: () => {
        setEmailSentPopupToggled(true);
        setLastOpenedPopup("emailSent");
      },
      toggled: emailSentPopupToggled,
      keepOpened: false
    },
    createCompetition: {
      handleToggle: () => setCreateCompetitionPopupToggled(prevState => !prevState),
      handleClose: () => setCreateCompetitionPopupToggled(false),
      handleOpen: () => {
        setCreateCompetitionPopupToggled(true);
        setLastOpenedPopup("createCompetition");
      },
      toggled: createCompetitionPopupToggled,
      keepOpened: false
    },
    competitionCode: {
      handleToggle: () => {
        setCompetitionCodePopupToggled(prevState => !prevState);
      },
      handleClose: () => setCompetitionCodePopupToggled(false),
      handleOpen: code => {
        setCode(code || "no code");
        setCompetitionCodePopupToggled(true);
        setLastOpenedPopup("competitionCode");
      },
      toggled: competitionCodePopupToggled,
      keepOpened: false
    },
    username: {
      handleToggle: () => setUsernamePopupToggled(prevState => !prevState),
      handleClose: () => setUsernamePopupToggled(false),
      handleOpen: () => {
        setUsernamePopupToggled(true);
        setLastOpenedPopup("username");
      },
      toggled: usernamePopupToggled,
      keepOpened: false
    },
    emailNotVerified: {
      handleToggle: () => setEmailNotVerifiedPopupToggled(prevState => !prevState),
      handleClose: () => setEmailNotVerifiedPopupToggled(false),
      handleOpen: () => {
        setEmailNotVerifiedPopupToggled(true);
        setLastOpenedPopup("emailNotVerified");
      },
      toggled: emailNotVerifiedPopupToggled,
      keepOpened: false
    },
    reauthenticate: {
      handleToggle: () => setReauthenticatePopupToggled(prevState => !prevState),
      handleClose: () => setReauthenticatePopupToggled(false),
      handleOpen: form => {
        setReauthenticateForm(form);
        setReauthenticatePopupToggled(true);
        setLastOpenedPopup("reauthenticate");
      },
      toggled: reauthenticatePopupToggled,
      keepOpened: false
    },
    gameLink: {
      handleToggle: () => {
        setGameLinkPopupToggled(prevState => !prevState);
      },
      handleClose: () => setGameLinkPopupToggled(false),
      handleOpen: gameName => {
        setGameName(gameName || "no gameName");
        setGameLinkPopupToggled(true);
        setLastOpenedPopup("gameLink");
      },
      toggled: gameLinkPopupToggled,
      keepOpened: false
    },
    notRegistered: {
      handleToggle: () => {
        setNotRegisteredPopupToggled(prevState => !prevState);
      },
      handleClose: () => setNotRegisteredPopupToggled(false),
      handleOpen: () => {
        setNotRegisteredPopupToggled(true);
        setLastOpenedPopup("notRegistered");
      },
      toggled: notRegisteredPopupToggled,
      keepOpened: false
    },
    cookiesConsent: {
      handleToggle: () => {
        setCookiesConsentPopupToggled(prevState => !prevState);
      },
      handleClose: () => setCookiesConsentPopupToggled(false),
      handleOpen: () => {
        setCookiesConsentPopupToggled(true);
        setLastOpenedPopup("cookiesConsent");
      },
      toggled: cookiesConsentToggled,
      keepOpened: false
    },
    redirectToAccount: {
      handleToggle: () => {
        setRedirectToAccount(prevState => !prevState);
      },
      handleClose: () => setRedirectToAccount(false),
      handleOpen: () => {
        setRedirectToAccount(true);
        setLastOpenedPopup("redirectToAccount");
      },
      toggled: redirectToAccount,
      keepOpened: false
    }
  };

  useEffect(() => {
    closeAllPopups(popups);
  }, []);

  useEffect(() => {
    Object.keys(popups).forEach(
      popupKeyName => popupKeyName !== lastOpenedPopup && popups[popupKeyName].handleClose()
    );
  }, [lastOpenedPopup]);

  const handleClosePopupOnEscClick = e => {
    if (e.keyCode === 27) {
      closeAllPopups(popups);
    }
  };

  useEffect(() => {
    if (anyOpenedPopup(popups)) {
      document.body.style.overflowY = "hidden";
      document.body.addEventListener("keydown", handleClosePopupOnEscClick);
    } else {
      document.body.style.overflowY = "scroll";
      document.body.removeEventListener("keyDown", handleClosePopupOnEscClick);
    }
  }, [popups]);

  return (
    <PopupContext.Provider
      value={{
        code,
        gameName,
        competitionAction,
        simpleCompetitionId,
        simpleTargetPlayerId,
        reauthenticateForm,
        popups,
        login: popups.login,
        cookiesConsent: popups.cookiesConsent,
        simple: popups.simple,
        forgottenPassword: popups.forgottenPassword,
        emailSent: popups.emailSent,
        createCompetition: popups.createCompetition,
        competitionCode: popups.competitionCode,
        username: popups.username,
        emailNotVerified: popups.emailNotVerified,
        notRegistered: popups.notRegistered,
        reauthenticate: popups.reauthenticate,
        gameLink: popups.gameLink,
        redirectToAccount: popups.redirectToAccount
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};
