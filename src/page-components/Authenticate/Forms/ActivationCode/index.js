/* eslint-disable brace-style */
import AuthenticateWrapper from 'components/Authentication/AuthenticateWrapper';
import OptionsButton from 'components/Authentication/OptionsButton';
import Button from 'components/Button';
import { Box } from 'components/Grid';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import dynamic from 'next/dynamic';
import theme from 'styles/theme';
import { ACTIVATE_DEVICE_TYPE } from 'utilities/constants';
import { checkUserCode, saveUidInDeviceFlow } from 'utilities/api/firebase/oauth';

const ReactCodeInput = dynamic(import('react-code-input'));

const StyledHeader = styled(Box)`
  color: ${props => props.theme.primaryText};
`;

const StyledError = styled(Box)`
  color: ${props => props.theme.formError};
`;

const CodeStyles = {
  inputStyle: {
    margin: '6px',
    borderRadius: '6px',
    fontSize: '22px',
    height: '50px',
    width: '50px',
    paddingLeft: '17px',
    backgroundColor: `${theme.dark}`,
    color: `${theme.primaryText}`,
    border: '1px solid rgba(255, 255, 255, 0.36)',
    fontFamily: `${theme.headingFontFamily}`,
    userSelect: 'none',
  },
  inputStyleInvalid: {
    margin: '6px',
    borderRadius: '6px',
    fontSize: '22px',
    height: '50px',
    width: '50px',
    paddingLeft: '17px',
    backgroundColor: `${theme.dark}`,
    color: `${theme.primaryText}`,
    border: `1px solid ${theme.formError}`,
    fontFamily: `${theme.headingFontFamily}`,
    userSelect: 'none',
  },
};

function ActivationCode({ changeView, isSmartDevice }) {
  const uid = useSelector(state => (state.profile.userId));
  const [valid, setIsValid] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const handleOnChange = async (value) => {
    setInputValue(value);
    if (value.length === 6 && uid) {
      setBtnDisabled(false);
    }

    if (!valid) {
      setIsValid(true);
    }
  };

  const handleOnClick = async () => {
    if (inputValue.length === 6 && uid) {
      const storedUid = await checkUserCode(inputValue);
      if (storedUid) {
        await saveUidInDeviceFlow(inputValue, uid);
        changeView('activationSuccess');
      } else {
        setIsValid(false);
        setBtnDisabled(true);
      }
    }
  };

  const ContinueButton = (
    <Button
      variant="primary"
      disabled={btnDisabled}
      text="Submit"
      maxWidthDesktop="100%"
      onClick={() => handleOnClick()}
    />
  );

  return (
    <AuthenticateWrapper
      button={<OptionsButton option2={ContinueButton} option1={null} />}
      isSmartDevice={isSmartDevice}
    >
      <Box pb="150px">
        <StyledHeader pb={spacing.l}>
          <Header as="h1" variant="l" mb="l" text="Enter your activation code" />
        </StyledHeader>
        <Paragraph variant="l" mb="l" transparent text="Enter the code that appears on your TV screen below and press submit to activate your account" />
        <Box>
          <ReactCodeInput type="text" fields={6} value={inputValue} isValid={valid} autoFocus forceUppercase onChange={e => handleOnChange(e)} {...CodeStyles} />
        </Box>
        {!valid && (
          <StyledError py={spacing.l}>
            <Paragraph variant="l" mb="l" transparent text="The code is incorrect. Please try again." />
          </StyledError>
        )}
      </Box>
    </AuthenticateWrapper>
  );
}

ActivationCode.propTypes = {
  userState: PropTypes.objectOf(PropTypes.any).isRequired,
  updateUserState: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  deviceType: PropTypes.string,
  isSmartDevice: PropTypes.bool,
};

ActivationCode.defaultProps = {
  deviceType: ACTIVATE_DEVICE_TYPE.web,
  isSmartDevice: false,
};

export default ActivationCode;
