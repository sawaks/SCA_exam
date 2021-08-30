import { css } from 'styled-components';
import screen from 'styles/helpers/media';
import zIndex from 'styles/helpers/zIndex';

const ReactModalCSS = () => css`
  .ReactModal__Body--open {
    overflow: hidden;
  }

  .signup-portal {
    width: 100vw;
    margin: 0;
    border-radius: 4px;
    position: fixed;
    ${screen.sm} {
      position: absolute;
      bottom: unset;
    }
    ${screen.md} {
      width: 75vw;
      max-width: 550px;
    }
    outline: none;
  }

  .portal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-content:center;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    z-index: ${zIndex.modal};
  }

  .portal-overlay-after-open {
    opacity: 1;
  }

  .portal-overlay-before-close {
    opacity: 0;
  }
`;

export default ReactModalCSS;
