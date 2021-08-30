import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';
import styledReactSlick from './react-slick';
import reactToastify from './react-toastify';
import theme from './theme';

export default createGlobalStyle`

  ${styledNormalize};

  ${styledReactSlick};

  ${reactToastify(theme)};

  @font-face {
    font-family: 'dunbar-tall';
    font-weight: bold;
    src: url('/fonts/Dunbar/Dunbar_Tall-Bold.woff2') format('woff2'),
    url('/fonts/Dunbar/Dunbar_Tall-Bold.woff') format('woff'),
    url('/fonts/Dunbar/Dunbar_Tall-Bold.ttf') format('ttf');
    font-display: swap;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
  }

  body {
    font-size: ${theme.bodyFontSize};
    font-family: ${theme.bodyFontFamily};
    font-weight: normal;
    color: ${theme.light};
    overflow-x: hidden;
  }

  figure {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .headroom {
    background-color: transparent;
    transition: background-color 0.2s ease-out;
  }

  .headroom--pinned {
    background-color: ${props => props.theme.dark};
  }
`;
