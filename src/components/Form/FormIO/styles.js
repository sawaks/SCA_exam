import styled from 'styled-components';
import theme from 'styles/theme';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import rgba from 'styles/helpers/rgba';
import { StyledButton, PrimaryButton } from 'components/Button/styles';

// Used to override default bootstrap styling and styled the form according to our style guide.
export default styled.span`
  font-size: 16px;
  font-weight: 500;
  width: inherit;

  button {
    ${StyledButton}
    ${PrimaryButton}
    font-weight: bold;
    font-size: 12px;
    ${screen.md} {
      font-size: 14px;
    }
  }

  a {
    color: ${theme.primary};
    text-decoration: none;

    &:hover {
      color: ${theme.primaryActive};
    }
  }

  p,
  span {
    color: ${rgba(theme.light, 0.7)};
    font-size: 12px;
    ${screen.md} {
      font-size: 14px;
    }
    letter-spacing: normal;
  }

  h4 {
    font-size: 14px;
    ${screen.md} {
      font-size: 18px;
    }
  }

  /* update the text area height to be auto */
  textarea {
    height: auto !important;
  }

  .btn-primary{
    color: #fff;
    background-color:  ${theme.primaryActive};
    border-color:  ${theme.primaryActive};
  }
  
  .btn-primary:disabled{
    color: #fff;
    background-color: ${theme.primaryActive};
    border-color:  ${theme.primaryActive};
  }

  .formio-form {
    background: ${theme.backgroundLight};
    padding: ${spacing.m};
    ${screen.md} {
      padding: ${spacing.l};
    }
  }

  .card {
    border: transparent;
    box-shadow: none;
    background: ${theme.backgroundLight};
    .card-header {
      background-color: transparent;
      padding: 0;
    }
    .card-title {
      background-color: transparent;
      border-bottom: ${`1px solid ${rgba(theme.light, 0.2)}`};
      /* Important, left/right padding must be zero to ensure Content Producers can add form elements outside of panels */
      padding: ${spacing.m} 0px;
      font-family: dunbar-tall, sans-serif;
      display: flex;
      color: ${theme.light};
      font-size: 16px;
      ${screen.md} {
        font-size: 18px;
        min-width: initial;
      }
    }
    .card-title:blank {
      background: lime;
    }
    .card-body {
      /* Important, left/right padding must be zero to ensure Content Producers can add form elements outside of panels */
      padding: 15px 0;
      h3,
      h4 {
        color: ${theme.light};
        margin: ${spacing.m} 0px ${spacing.l};
        font-size: inherit;
      }
    }
  }

  .border {
    border: none !important;
  }

  .alert-success {
    display: none;
  }

  .alert-danger {
    background: transparent;
    label,
    p,
    strong,
    span {
      color: ${rgba(theme.formError, 0.7)};
    }
  }

  .label-hidden, .formio-hidden {
    display: none!important;
  }

  .form-group {
    label {
      color: ${theme.light};
      font-size: 14px;
      ${screen.md} {
        font-size: 16px;
      }
    }

    .form-control {
      font-size: 14px;
      font-weight: 500;
      height: 48px;
      padding: 7px 12px;
      border-radius: 0px;
      border: transparent;
      box-shadow: none;
      border-bottom: 2px solid ${rgba(theme.light, 0.3)};
      background-color: ${rgba(theme.light, 0.06)};
      color: ${theme.light};
      ${screen.md} {
        font-size: 16px;
      }

      /* There is a current bug in 'react-formio' where it renders two dropdown boxes. One of the dropdown is hidden from view */
      select {
        visibility: hidden;
        position: absolute;
      }

      /* remove the cross from the select dropdown */
      button {
        display: none;
      }

      ::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }

      /* Fix width issue on the date picker on I0S */
      &.flatpickr-mobile {
        min-width: 100%;
        /* stylelint-disable */
        -webkit-appearance: none;
      }
    }
    
    /* color the dropdown arrow on the select box */
    .choices[data-type*='select-one']:after {
      border-color: ${rgba(theme.light, 0.7)} transparent transparent
        transparent;
    }
    .choices[data-type*='select-one'].is-open:after {
      border-color: transparent transparent ${rgba(theme.light, 0.7)}
        transparent;
    }

    /* remove the borders around the datepicker icon */
    .input-group-addon:last-child {
      box-shadow: none;
      border: transparent;
      border-bottom: 2px solid ${rgba(theme.light, 0.3)};
      background-color: ${rgba(theme.light, 0.06)};
    }

    /* remove the background colour on the item selected in the dropdown */
    .choices__list--single {
      .choices__item--selectable {
        background-color: transparent;
        padding: 5px 0px;
      }
    }
    /* colour the select dropdown */
    .choices__list {
      .choices__item--choice {
        background-color: ${theme.backgroundLight};
      }
      .is-highlighted {
        background-color: ${theme.primary};
        span {
          color: ${theme.backgroundLight};
        }
      }
    }
  }
`;
