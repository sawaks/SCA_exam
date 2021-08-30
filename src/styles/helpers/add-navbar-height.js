import screen from 'styles/helpers/media';
import { css } from 'styled-components';

function addNavbarHeight(property, propertyValues) {
  return css`
    ${property}: ${propertyValues[0] + 49}px;
    ${screen.md} {
      ${property}: ${propertyValues[1] + 114}px;
    }
    ${screen.lg} {
      ${property}: ${propertyValues[2] + 138}px;
    }
  `;
}

export default addNavbarHeight;
