import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { Header, Footer, CookiesConsentPopup } from "~/collections";
import { theme, GlobalStyles } from "~/styles";
import { PopupProvider, UserProvider } from "~/context";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <UserProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Head>
            <title>Ego Lounge</title>
            <meta name='description' content='Ego Lounge Competitions' />
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1.0, user-scalable=no'
            />
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <GlobalStyles />
          <PopupProvider>
            <Header />
            <Component {...pageProps} />
          </PopupProvider>
          <Footer />
          <CookiesConsentPopup />
        </ThemeProvider>
      </StyledEngineProvider>
    </UserProvider>
  );
}

export default MyApp;
