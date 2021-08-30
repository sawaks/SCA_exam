import AuthenticateWrapper from 'components/Authentication/AuthenticateWrapper';
import { Box } from 'components/Grid';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import Logo from 'components/Icons/activateSuccess.svg';
import { ACTIVATE_DEVICE_TYPE } from 'utilities/constants';
import { setLoginDeviceType } from '../../../../store/actions/userInteractions';
import { addAuthCode } from '../../../../utilities/api/firebase/oauth';

const generateUniqueCode = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,
  // eslint-disable-next-line no-bitwise
  c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
  ).toString(16)
);

const handleOAuthLogin = async (uid, redirectUri, state) => {
  if (uid) {
    const authCode = generateUniqueCode();
    await addAuthCode(uid, authCode);
    window.location.href = `${redirectUri}?state=${state}&code=${authCode}`;
  }
};

const StyledHeader = styled(Box)`
  color: ${props => props.theme.primaryText};
`;

function ActivationSuccess({ deviceType, isSmartDevice }) {
  const dispatch = useDispatch();

  const oAuthRedirectUri = useSelector(state => (state.userInteractions.oAuthRedirectUri));
  const oAuthState = useSelector(state => (state.userInteractions.oAuthState));
  const uid = useSelector(state => (state.profile.userId));

  // On umount change the device type back to web
  useEffect(() => () => {
    dispatch(setLoginDeviceType(ACTIVATE_DEVICE_TYPE.web));
  }, []);

  // redirect if its oauth (i.e smart devices)
  useEffect(() => {
    if (deviceType === ACTIVATE_DEVICE_TYPE.smartDevices) {
      // need to wait for to give a more pleasant UX experience.
      setTimeout(() => handleOAuthLogin(uid, oAuthRedirectUri, oAuthState), 3000);
    }
  }, []);

  return (
    <AuthenticateWrapper isSmartDevice={isSmartDevice}>
      <Box pb="150px">
        <StyledHeader>
          <Header as="h1" variant="l" mb="l" text="Activation Successful" />
        </StyledHeader>
        <Box py={spacing.l}>
          <Logo />
        </Box>
        {deviceType === ACTIVATE_DEVICE_TYPE.tv && <Paragraph variant="l" mb="l" transparent text="Your Account has been linked to your TV. It’s all set up and ready to go." />}
        {deviceType === ACTIVATE_DEVICE_TYPE.smartDevices && (
          <Paragraph variant="l" mb="l" transparent text="Your Account has been linked to your smart device. Please wait as we redirect you back to the smart device App" />
        )}
      </Box>
    </AuthenticateWrapper>
  );
}

ActivationSuccess.propTypes = {
  deviceType: PropTypes.string.isRequired,
  isSmartDevice: PropTypes.bool.isRequired,
};

export default ActivationSuccess;
