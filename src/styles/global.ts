import { createGlobalStyle } from "styled-components";
import { theme } from "~/styles";

export const GlobalStyles = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
            Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        background-color: #191919;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
                
        &::-webkit-scrollbar {
        width: 10px;
        height: 100%;
        }

        &::-webkit-scrollbar-track {
            background: ${theme.colors.black1F};
        }
        
        &::-webkit-scrollbar-thumb {
            background: ${theme.colors.darkGray};
        }

        &::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.lightGray};
        }
    }

    #hosted span {
        color: ${theme.colors.white} !important;
    }
`;
