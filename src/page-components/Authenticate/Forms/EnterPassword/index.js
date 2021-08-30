/* eslint-disable brace-style */
import namedRoutes from 'common/named-routes';
import AuthenticateWrapper from 'components/Authentication/AuthenticateWrapper';
import Button from 'components/Button';
import Password from 'components/Form/Input/Password';
import { Box } from 'components/Grid';
import Header from 'components/Typography/Header';
import Router from 'next/router';
import StepsButton from 'page-components/Authenticate/Forms/StepsButton';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithEmail } from 'store/actions/auth-email';
import { closeSignupModal } from 'store/actions/userInteractions';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import Logger from 'utilities/helpers/logger';
import toast from 'utilities/helpers/toast';
import errorCodes from 'utilities/helpers/toast/errorCodes';
import { ACTIVATE_DEVICE_TYPE } from '../../../../utilities/constants';
import Paragraph from '../../../../components/Typography/Paragraph';

function EnterPasswordForm({ changeView, deviceType, isSmartDevice }) {
  const dispatch = useDispatch();
  const [inProgress, setProgress] = useState(useSelector(state => (state.profile.inProgress)));
  const [error, setError] = useState(useSelector(state => (state.profile.error)));
  const emailValue = useSelector(state => (state.profile.email));
  const redirectUrl = useSelector(state => (state.userInteractions.redirectUrl));

  const loginRedirect = redirectUrl || namedRoutes.internal.myFeed;

  const focusRef = useRef(null);
  useEffect(() => {
    focusRef.current.focus();
  }, [focusRef]);

  useEffect(() => {
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.login,
    });
    dispatch(closeSignupModal());
  }, []);

  const validate = (values) => {
    const errors = {};

    if ((!values.password || !values.password.length) && !error) {
      errors.password = 'Please enter a password';
    }
    return errors;
  };

  const onSubmit = async (values) => {
    setProgress(true);
    addToDataLayer({ event: gtm.enterEmailPasswordSubmitBtnClicked });
    try {
      const { userId, emailVerificationFlag, hasUserOnboardedMusic } = await dispatch(loginWithEmail(emailValue, values.password, setError, setProgress));
      if (userId) addToDataLayer({ event: gtm.enterEmailPasswordSuccessful });
      if (userId && !emailVerificationFlag) {
        changeView('verifyEmail');
        return {};
      }

      if (deviceType === ACTIVATE_DEVICE_TYPE.tv) {
        changeView('activationCode');
        return {};
      }

      if (deviceType === ACTIVATE_DEVICE_TYPE.smartDevices) {
        changeView('activationSuccess');
        return {};
      }

      if (userId && emailVerificationFlag && hasUserOnboardedMusic) {
        Router.push(`${loginRedirect}`);
        toast('You have successfully logged in');
      }
      if (userId && !hasUserOnboardedMusic) {
        changeView('musicOnboarding');
        return {};
      }
      return {};
    } catch (e) {
      setError(true);
      addToDataLayer({ event: gtm.enterEmailPasswordUnSuccessful });
      Logger.error(e);
      return { password: errorCodes[e.code] ? errorCodes[e.code].text : errorCodes.default.text };
    }
  };

  const previousScreen = () => {
    addToDataLayer({ event: gtm.loginPageGoBackBtnClicked });
    changeView('login');
  };

  const resetPassword = () => {
    addToDataLayer({ event: gtm.loginPageResetPasswordBtnClicked });
    changeView('resetPassword');
  };

  return (
    <>
      <StyledPasswordForm>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          keepDirtyOnReinitialize
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <AuthenticateWrapper
                heroText="Hello"
                heroImages={{
                  mobile: '/images/login-hero.png',
                  tablet: '/images/login-hero.png',
                  desktop: '/images/login-hero.png',
                }}
                isSmartDevice={isSmartDevice}
                button={(
                  <StepsButton
                    submitText="Login"
                    disabled={submitting || inProgress}
                    submitting={submitting || inProgress}
                    onClick={() => addToDataLayer({ event: gtm.loginPagePasswordBtnClicked })}
                    onGoBackClick={previousScreen}
                  />
                  )}
              >
                <Box width="100%" pb={spacing.m}>
                  <StyledHeader>
                    <Header as="h1" variant="l" mb="l" text="Enter your Password" />
                  </StyledHeader>
                  {deviceType === ACTIVATE_DEVICE_TYPE.tv && (
                    <Paragraph variant="l" mb="l" transparent text="Once you have logged in or created an account, you will then be asked to enter the activation code displayed on your TV screen." />
                  )}
                  {deviceType === ACTIVATE_DEVICE_TYPE.smartDevices && (
                    <Paragraph variant="l" mb="l" transparent text="Once you have logged in or created an account, you can start using Listnr on your smart device" />
                  )}
                  <Password name="password" label="Password" wrongPassword={error} ref={focusRef} />
                  <Box pb={spacing.xxl} pt={spacing.m}>
                    <Button type="button" variant="secondary" showBorder text="Forgot password" onClick={resetPassword} />
                  </Box>
                </Box>

              </AuthenticateWrapper>
            </form>
          )
      }
        />
      </StyledPasswordForm>
    </>
  );
}

const StyledPasswordForm = styled.div`
  height: calc(100vh - 50px);
  & form {
    height: 100%;
  }
`;

const StyledHeader = styled.div`
  color: ${props => props.theme.whiteColor};
`;

EnterPasswordForm.propTypes = {
  changeView: PropTypes.func.isRequired,
  deviceType: PropTypes.string,
  isSmartDevice: PropTypes.bool,
};

EnterPasswordForm.defaultProps = {
  deviceType: ACTIVATE_DEVICE_TYPE.web,
  isSmartDevice: false,
};

export default EnterPasswordForm;
