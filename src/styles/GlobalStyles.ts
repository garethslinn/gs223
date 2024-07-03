
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Source Sans 3';
    src: url('/fonts/SourceSans3-VariableFont_wght.ttf') format('truetype');
    font-weight: 100 900;
    font-style: normal;
  }

  @font-face {
    font-family: 'Source Sans 3';
    src: url('/fonts/SourceSans3-Italic-VariableFont_wght.ttf') format('truetype');
    font-weight: 100 900;
    font-style: italic;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
  }

  body {
    font-family: 'Source Sans 3', arial, sans-serif;
    max-width: 75rem;
    margin: 0 auto;
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: 680px) {
      padding: 2rem 1rem;
    }
  }
`;

export default GlobalStyles;
