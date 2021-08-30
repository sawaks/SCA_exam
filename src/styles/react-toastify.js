import { css } from 'styled-components';
import rgba from 'styles/helpers/rgba';

const ToastCSS = theme => css`
  .Toastify__toast-container {
    z-index: 9999;
    position: fixed;
    padding: 12px;
    width: 400px;
    box-sizing: border-box;
    color: #fff; 
  }
  .Toastify__toast-container--top-left {
    top: 0;
    left: 0; 
  }
  .Toastify__toast-container--top-center {
    top: 0;
    left: 50%;
    margin-left: -160px; 
  }
  .Toastify__toast-container--top-right {
    top: 0;
    right: 0; 
  }
  .Toastify__toast-container--bottom-left {
    bottom: 0;
    left: 0; 
  }
  .Toastify__toast-container--bottom-center {
    bottom: 0;
    left: 50%;
    margin-left: -160px; 
  }
  .Toastify__toast-container--bottom-right {
    bottom: 0;
    right: 0; 
  }

  @media only screen and (max-width: 480px) {
    .Toastify__toast-container {
      width: 100vw;
      padding: 0;
      left: 0;
      margin: 0; 
    }
      .Toastify__toast-container--top-left, .Toastify__toast-container--top-center, .Toastify__toast-container--top-right {
        top: 0; 
      }
      .Toastify__toast-container--bottom-left, .Toastify__toast-container--bottom-center, .Toastify__toast-container--bottom-right {
        bottom: 0; 
      }
      .Toastify__toast-container--rtl {
        right: 0;
        left: initial; 
      } }

  .Toastify__toast {
    position: relative;
    box-sizing: border-box;
    margin-bottom: 1rem;
    padding: 12px;
    box-shadow: 0 2px 2px 0 ${rgba(theme.blackColor, 0.38)};
    display: flex;
    justify-content: space-between;
    max-height: 800px;
    overflow: hidden;
    cursor: pointer;
    direction: ltr; 
    border-radius: 6px;
  }
  .Toastify__toast--rtl {
    direction: rtl; 
  }
  .Toastify__toast--default {
    background: ${theme.primary};
    color: ${theme.whiteColor}; 
  }
  .Toastify__toast--info {
    /* background: #3498db;  */
  }
  .Toastify__toast--success {
    /* background: #07bc0c;  */
  }
  .Toastify__toast--warning {
    /* background: #f1c40f;  */
  }
  .Toastify__toast--error {
    /* background: #e74c3c;  */
  }
  .Toastify__toast-body {
    margin: auto 0;
    flex: 1; 
  }

  @media only screen and (max-width: 480px) {
    .Toastify__toast {
      margin-bottom: 0; 
    } 
  }

  .Toastify__close-button {
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    background: transparent;
    outline: none;
    border: none;
    padding: 0;
    cursor: pointer;
    opacity: 0.7;
    transition: 0.3s ease;
    align-self: flex-start; 
  }
/* stylelint-disable block-no-empty */
  @keyframes Toastify__trackProgress {
  }

  .Toastify__progress-bar {
    animation: Toastify__trackProgress linear 1;
  }


  @keyframes Toastify__slideInRight {
    from {
      transform: translate3d(110%, 0, 0);
      visibility: visible; 
    }
    to {
      transform: translate3d(0, 0, 0); 
    } }

  @keyframes Toastify__slideInLeft {
    from {
      transform: translate3d(-110%, 0, 0);
      visibility: visible; 
    }
    to {
      transform: translate3d(0, 0, 0); 
    } }

  @keyframes Toastify__slideInUp {
    from {
      transform: translate3d(0, 110%, 0);
      visibility: visible; 
    }
    to {
      transform: translate3d(0, 0, 0); 
    } }

  @keyframes Toastify__slideInDown {
    from {
      transform: translate3d(0, -110%, 0);
      visibility: visible; 
    }
    to {
      transform: translate3d(0, 0, 0); 
    } }

  @keyframes Toastify__slideOutRight {
    from {
      transform: translate3d(0, 0, 0); 
    }
    to {
      visibility: hidden;
      transform: translate3d(110%, 0, 0); 
    } }

  @keyframes Toastify__slideOutLeft {
    from {
      transform: translate3d(0, 0, 0); 
    }
    to {
      visibility: hidden;
      transform: translate3d(-110%, 0, 0); 
    } }

  @keyframes Toastify__slideOutDown {
    from {
      transform: translate3d(0, 0, 0); 
    }
    to {
      visibility: hidden;
      transform: translate3d(0, 500px, 0); 
    } }

  @keyframes Toastify__slideOutUp {
    from {
      transform: translate3d(0, 0, 0); 
    }
    to {
      visibility: hidden;
      transform: translate3d(0, -500px, 0); 
    } }

  .Toastify__slide-enter--top-left, .Toastify__slide-enter--bottom-left {
    animation-name: Toastify__slideInLeft; 
  }

  .Toastify__slide-enter--top-right, .Toastify__slide-enter--bottom-right {
    animation-name: Toastify__slideInRight; 
  }

  .Toastify__slide-enter--top-center {
    animation-name: Toastify__slideInDown; 
  }

  .Toastify__slide-enter--bottom-center {
    animation-name: Toastify__slideInUp; 
  }

  .Toastify__slide-exit--top-left, .Toastify__slide-exit--bottom-left {
    animation-name: Toastify__slideOutLeft; 
  }

  .Toastify__slide-exit--top-right, .Toastify__slide-exit--bottom-right {
    animation-name: Toastify__slideOutRight; 
  }

  .Toastify__slide-exit--top-center {
    animation-name: Toastify__slideOutUp; 
  }

  .Toastify__slide-exit--bottom-center {
    animation-name: Toastify__slideOutDown; 
  }
`;

export default ToastCSS;
