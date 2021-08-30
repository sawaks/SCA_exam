import Button from 'components/Button';
import Paragraph from 'components/Typography/Paragraph';
import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'components/Grid';
import styled from 'styled-components';
import rgba from 'styles/helpers/rgba';
import spacing from 'styles/helpers/spacing';
import ArrowBack from 'components/Icons/arrow-back.svg';

function StepsButton({ submitText, onGoBackClick, onNextClick, step, disabled, submitting, withBackButton }) {
  return (
    <ButtonWrapper justifyContent="space-between" alignItems="center" width={1} p={spacing.s}>
      {withBackButton && (
        <StyledButton onClick={onGoBackClick}>
          <ArrowBack />
        </StyledButton>
      )}
      {step && withBackButton && <StyledParagraph variant="l" text={`Step ${step}/04`} whiteSpace="nowrap" transparent />}
      <Button
        variant="primary"
        disabled={disabled}
        submitting={submitting}
        text={submitText || (step === '04' ? 'Complete' : 'Next')}
        maxWidthMobile={withBackButton ? '150px' : ''}
        maxWidthDesktop={withBackButton ? '150px' : ''}
        onClick={onNextClick}
      />
    </ButtonWrapper>
  );
}

StepsButton.propTypes = {
  onGoBackClick: PropTypes.func,
  onNextClick: PropTypes.func,
  step: PropTypes.string,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  withBackButton: PropTypes.bool,
  submitText: PropTypes.string,
};

StepsButton.defaultProps = {
  onGoBackClick: () => {},
  onNextClick: () => {},
  step: null,
  submitting: false,
  disabled: false,
  withBackButton: true,
  submitText: '',
};

const StyledButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease, background-color 0.2s ease;
  border: solid 1px ${props => rgba(props.theme.light, 0.16)};
  background-color: ${props => props.theme.light};
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.12);
  border-radius: 50%;
  height: 40px;
  width: 40px;
  padding: 0;
  cursor: pointer;

  & use {
    fill: ${props => props.theme.dark};
  }

  &:hover,
  &:active {
    outline: none;
    background-color: ${props => rgba(props.theme.black, 0.3)};
  }

  &:focus {
    outline: none;
  }
`;

const StyledParagraph = styled(Paragraph)`
  color: ${props => props.theme.dark};
`;

const ButtonWrapper = styled(Flex)`
  height: 52px;
  border-radius: 26px;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.3);
  background-color: ${props => props.theme.light};
`;

export default StepsButton;
