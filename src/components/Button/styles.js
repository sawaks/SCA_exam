/* stylelint-disable no-descending-specificity */
import styled, { css } from 'styled-components';
import screen from 'src/styling/screen';
import rgba from 'src/styling/rgba';

// Base button styling is separated from base button component
// to enable FormIO to import it so it can override the default bootstrap button styling.
export const StyledButton = css`
  display:block;
  height: 40px;
  width: inherit;
  color: ${props => props.theme.light};
  min-width: ${props => (props.minWidthMobile ? props.minWidthMobile : '124px')};
  max-width: ${props => (props.maxWidthMobile ? props.maxWidthMobile : 'none')};
  padding: ${props => (props.icon ? '0' : props.padding)};
  margin: ${props => props.margin};
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: ${props => (props.disable ? 'default' : 'pointer')};
  text-decoration: none;
  overflow: hidden;
  transition: border-color 0.5s, background-color 0.5s;

  &:disabled {
    cursor: default;
    opacity: ${props => (props.submitting ? 1 : 0.4)};
  }

  ${screen.tablet} {
    min-width: ${props => (props.minWidthDesktop ? props.minWidthDesktop : '180px')};
    max-width: ${props => (props.maxWidthDesktop ? props.maxWidthDesktop : 'none')};
  }
`;

export const BaseButton = styled.button`
  ${StyledButton}
`;

export const PrimaryButton = css`
  border: ${props => (props.showBorder ? `1px solid ${props.theme.primary}` : 'none')};
  background-color: ${props => (props.text ? props.theme.primaryActive : props.theme.primary)};

  &:hover:not([disabled]) {
    color: ${props => props.theme.light};
    border: ${props => (props.showBorder ? `1px solid ${props.theme.primary}` : 'none')};
    background-color: ${props => (props.text ? props.theme.primary : props.theme.primaryActive)};
  }

  &:focus:not([disabled]) {
    outline:0;
  }
`;

export const SecondaryButton = css`
  border: ${props => (props.showBorder ? `1px solid ${rgba(props.theme.backgroundLight, 0.3)}` : 'none')};
  background-color: ${props => props.theme.backgroundLight};

  &:hover:not([disabled]) {
    color: ${props => props.theme.light};
    border: ${props => (props.showBorder ? `1px solid ${props.theme.light}` : 'none')};
    background-color: ${props => rgba(props.theme.backgroundLight, 0.3)};
  }

  &:focus:not([disabled]) {
    outline:0;
  }
`;

export const TertiaryButton = css`
  border-style: solid;
  border-width: 1px;
  border-color:  ${props => rgba(props.theme.light, 0.3)};
  background-color: transparent;
  color: ${props => props.theme.light};

  &:disabled {
    color: ${props => props.theme.light};
  }

  &:hover:not([disabled]) {
    color: ${props => props.theme.primaryActive};
  }

  &:focus:not([disabled]) {
    outline:0;
  }
`;

export const QuaternaryButton = css`
  border-style: solid;
  border-width: 1px;
  border-color: transparent;
  background-color: transparent;
  color: ${props => props.theme.light};
  & path {
        fill:  ${props => props.theme.light};
      }

  &:hover:not([disabled]) {
    color: ${props => props.theme.primary};
      & path {
        fill:  ${props => props.theme.primary};
      }
  }

  &:focus:not([disabled]) {
    outline:0;
  }
`;

export const QuinaryButton = css`
  color: ${props => props.theme.black};
  border: ${props => (props.showBorder ? `1px solid ${props.theme.primary}` : 'none')};
  background-color: ${props => props.theme.light};

  &:hover:not([disabled]) {
    color: ${props => props.theme.black};
    border: ${props => (props.showBorder ? `1px solid ${props.theme.primary}` : 'none')};
    background-color: ${props => rgba(props.theme.black, 0.3)};
  }

  &:focus:not([disabled]) {
    outline:0;
  }
`;

export const MonoButton = css`
  border-style: solid;
  border-width: 1px;
  border-color: transparent;
  background-color: transparent;
  color: ${props => props.theme.secondary};

  & path {
    fill:  ${props => props.theme.secondary};
  }

  &:hover:not([disabled]) {
    color: ${props => props.theme.primary};
    & path {
      fill:  ${props => props.theme.primary};
    }
  }

  &:focus:not([disabled]) {
    outline:0;
  }
`;

export const IconButton = css`
  border: none;
  background-color: transparent;
  height: 22px;
  width: 22px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${props => props.theme.light};
  & path {
    fill: ${props => props.theme.light};
  }

  &:hover:not([disabled]) {
    color: ${props => props.theme.primary};
  }

  &:focus:not([disabled]) {
    outline:0;
  }
`;
