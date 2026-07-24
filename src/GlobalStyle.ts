import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

 :root {
    --color-gray: #f2f6fa;
    --color-white: #ffffff;
    --color-blue: #0875c9;
    --color-marrow: #696d73;
    --color-black: #111216;

    --font-family: 'Roboto', sans-serif;
    
    --border-radius: 4px;
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
    min-width: 320px;
    font-family: var(--font-family);
    background-color: var(--color-white);
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }

  img,
  svg {
    max-width: 100%;
  }

`;
