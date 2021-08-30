import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';
import styledReactSlick from './react-slick';
import styledReactSmoothDnd from './react-smooth-dnd';
import reactToastify from './react-toastify';
import reactModal from './react-modal';
import theme from './theme';

export default createGlobalStyle`

  ${styledNormalize};

  ${styledReactSlick};

  ${styledReactSmoothDnd};

  ${reactToastify(theme)};

  ${reactModal(theme)};

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

  /* using translate3d because IE and EDGE don't support will-change property */
  .overlay-enter {
    transform: translate3d(0, 100%, 0);
  }

  .overlay-enter-active {
    transform: translate3d(0, 0, 0);
  }
  
  .overlay-exit-active {
   opacity: 0.9;
   transform: translateY(100%);
   transition: opacity 400ms ease, transform 400ms ease;
  }
  .overlay-bg-enter {
    opacity: 0;
  }

  .overlay-bg-enter-active {
    opacity: 1;
  }

  .overlay-bg-exit-active {
    opacity: 0;
    transition: opacity 400ms ease;
  }
  
  .feed-exit {
    opacity: 1;
  }

  .feed-exit-active {
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 400ms, transform 400ms;
  }

  .headroom {
    background-color: transparent;
    transition: background-color 0.2s ease-out;
  }

  .headroom--pinned {
    background-color: ${props => props.theme.dark};
  }
`;
