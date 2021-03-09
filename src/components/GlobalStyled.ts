import { createGlobalStyle } from "styled-components";
import styeldReset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${styeldReset}

    html, body, #app {
        height: 100%;
    }

    body {
        background-color: #F2F2F7;
    }

    * {
        font-size: 14px;
        font-family: "Noto Sans KR";
    }
`;

export default GlobalStyle;
