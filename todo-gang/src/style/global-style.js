import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f8f8f8;
    }
    h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
    }
    p {
        margin: 0;
        padding: 0;
    }
    button {
        border: none;
    }
    input {
        outline: none;
    }  
    ul, li {
        list-style: none;
    }

`;
export default GlobalStyle;
