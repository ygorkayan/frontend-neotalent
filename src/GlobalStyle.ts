import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

 :root {
    --color-gray: #f2f6fa;
    --color-white: #ffffff;

    --font-family: 'Roboto', sans-serif;
    
    --border-radius: 8px;
    --border-color: #504f4f;
    
    --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    --default-padding: 20px;
    --small-padding: 10px;
 }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-family);
    background-color: var(--color-gray);
  }

`;
