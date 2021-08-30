/* eslint-disable brace-style */
import AuthenticateWrapper from 'components/Authentication/AuthenticateWrapper';
import OptionsButton from 'components/Authentication/OptionsButton';
import Button from 'components/Button';
import Email from 'components/Form/Input/Email';
import { Box } from 'components/Grid';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { verifyEmailExistence } from 'store/actions/auth-email';
import { closeSignupModal } from 'store/actions/userInteractions';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import Logger from 'utilities/helpers/logger';
import toast from 'utilities/helpers/toast';
import { ACTIVATE_DEVICE_TYPE } from '../../../../utilities/constants';

function LoginForm({ changeView, userState, updateUserState, deviceType, isSmartDevice }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const formTitleTV = 'To activate LiSTNR on your TV either login or create an account below';
  const formSubTitleTV = 'Once you have logged in or created an account, you will then be asked to enter the activation code displayed on your TV screen';
  const formTitleSmartDevices = 'To activate LiSTNR on your smart device either login or create an account below';
  const formSubTitleSmartDevices = 'Once you have logged in or created an account, you can start using LiSTNR on your smart device';
  const formTitleWeb = 'Login or Sign Up';
  // eslint-disable-next-line max-len
  const formSubTitleWeb = 'Discover premium Australian and International podcasts, exclusive music channels and shows, live radio streams and keep up to date with local and international news and information.';

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

  const activeEmailField = () => {
    addToDataLayer({
      event: gtm.onboarding1LoginSreenEnterEmail,
      pageType: page.login,
    });
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      updateUserState({ ...userState, email: values.email_address });
      const emailExist = await dispatch(
        verifyEmailExistence(values.email_address)
      );

      // email exists
      if (emailExist[0]) {
        // user has an email account
        if (emailExist[1].includes('password')) {
          changeView('enterPassword');
        }
        // user has a facebook account
        else if (emailExist[1].includes('facebook.com')) {
          toast(
            'This email address is already registered with Facebook. Please Continue with Facebook'
          );
        }
        // user has a google account
        else if (emailExist[1].includes('google.com')) {
          toast(
            'This email address is already registered with Google. Please Continue with Google'
          );
        }
      }
      // email does not exist
      else {
        changeView('step1');
      }
    } catch (e) {
      Logger.error(e);
    }
  };

  return (
    <StyledEmailForm>
      <Form
        onSubmit={onSubmit}
        initialValues={{ email_address: userState.email }}
        keepDirtyOnReinitialize
        render={({ handleSubmit, submitting, invalid, ...props }) => {
          const SkipButton = (
            <Button
              as="a"
              variant="secondary"
              minWidthMobile="0"
              minWidthDesktop="0"
              maxWidthMobile="80px"
              maxWidthDesktop="80px"
              text="Skip"
              link={{ as: '/', href: { pathname: '/' } }}
              onClick={() => addToDataLayer({
                vent: gtm.onboarding1LoginSreenEnterEmailSkip,
                pageType: page.emailSignup,
              })}
              style={{ color: 'black', backgroundColor: 'white' }}
            />
          );
          const ContinueButton = (
            <Button
              variant="primary"
              disabled={submitting || loading}
              submitting={submitting || loading}
              text="Continue"
              maxWidthDesktop="100%"
              onClick={() => addToDataLayer({ event: gtm.loginPageEmailBtnClicked })}
            />
          );
          return (
            <form onSubmit={handleSubmit}>
              <AuthenticateWrapper
                heroImages={{
                  mobile: '/images/login-hero.png',
                  tablet: '/images/login-hero.png',
                  desktop: '/images/login-hero.png',
                }}
                heroText="Hello"
                button={<OptionsButton option1={isSmartDevice ? null : SkipButton} option2={ContinueButton} />}
                isSmartDevice={isSmartDevice}
              >
                <Box pb={isSmartDevice ? '150px' : spacing.xl}>
                  <StyledHeader>
                    {deviceType === ACTIVATE_DEVICE_TYPE.tv && <Header as="h1" variant="l" mb="l" text={formTitleTV} />}
                    {deviceType === ACTIVATE_DEVICE_TYPE.smartDevices && <Header as="h1" variant="l" mb="l" text={formTitleSmartDevices} />}
                    {deviceType === ACTIVATE_DEVICE_TYPE.web && <Header as="h1" variant="l" mb="l" text={formTitleWeb} data-test="login-header" />}
                  </StyledHeader>
                  {deviceType === ACTIVATE_DEVICE_TYPE.tv && (
                    <Paragraph variant="l" mb="l" transparent text={formSubTitleTV} />
                  )}
                  {deviceType === ACTIVATE_DEVICE_TYPE.smartDevices && (
                    <Paragraph variant="l" mb="l" transparent text={formSubTitleSmartDevices} />
                  )}
                  {deviceType === ACTIVATE_DEVICE_TYPE.web && (
                    <Paragraph variant="l" mb="l" transparent text={formSubTitleWeb} />
                  )}
                  <div
                    onClick={activeEmailField}
                    onKeyPress={activeEmailField}
                  >
                    <Email
                      name="email_address"
                      label="Enter your email address"
                      {...props}
                      ref={focusRef}
                    />
                  </div>
                  <TermsAndConditions>
                    <Paragraph variant="s" text="By pressing ‘Continue’ you agree to hear from LiSTNR and agree to our&nbsp;" transparent />
                    <a
                      href={process.env.NEXT_PUBLIC_TERMS_OF_SERVICE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Paragraph variant="s" text="Terms and Conditions" underline />
                    </a>
                    <Paragraph variant="s" text=",&nbsp;" transparent />
                    <a
                      href={process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Paragraph variant="s" text="Privacy Policy" underline />
                    </a>
                    <Paragraph variant="s" text="&nbsp;and&nbsp;" transparent />
                    <a
                      href={process.env.NEXT_PUBLIC_INFORMATION_COLLECTION_STATEMENT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Paragraph variant="s" text="Information Collection Statement." underline />
                    </a>
                  </TermsAndConditions>
                </Box>
              </AuthenticateWrapper>
            </form>
          );
        }

        }
      />
    </StyledEmailForm>
  );
}

const StyledEmailForm = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  & form {
    height: 100%;
  }
`;

const StyledHeader = styled.div`
  color: ${props => props.theme.whiteColor};
`;

const TermsAndConditions = styled.div`
  text-align: left;
  & > a,
  p {
    display: inline-block;
  }

  & a {
    text-decoration: none;
    color: ${props => props.theme.primaryText};

    &:visited {
      color: ${props => props.theme.primaryText};
    }

    &:hover {
      color: ${props => props.theme.primary};
    }
  }
`;

LoginForm.propTypes = {
  userState: PropTypes.objectOf(PropTypes.any).isRequired,
  updateUserState: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  deviceType: PropTypes.string,
  isSmartDevice: PropTypes.bool,
};

LoginForm.defaultProps = {
  deviceType: ACTIVATE_DEVICE_TYPE.web,
  isSmartDevice: false,
};

export default LoginForm;
