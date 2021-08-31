import screen from 'src/styling/screen';
import { css } from 'styled-components';

function addNavbarHeight(property, propertyValues) {
  return css`
    ${property}: ${propertyValues[0] + 49}px;
    ${screen.tablet} {
      ${property}: ${propertyValues[1] + 114}px;
    }
    ${screen.laptop} {
      ${property}: ${propertyValues[2] + 138}px;
    }
  `;
}

export default addNavbarHeight;
