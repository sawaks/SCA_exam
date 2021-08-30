import { Box } from '@rebass/grid';
import AuthenticateWrapper from 'components/Authentication/AuthenticateWrapper';
import Button from 'components/Button';
import OptionsButton from 'components/Authentication/OptionsButton';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import { useRouter } from 'next/router';
import Divider from 'components/Divider';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import Logger from 'utilities/helpers/logger';
import namedRoutes from 'common/named-routes';
import UserSelection from './components/UserSelection';

function VerifyEmail({ changeView, isSmartDevice }) {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const { email } = useSelector(state => state.profile, shallowEqual);
  const redirectUrl = useSelector(state => (state.userInteractions.redirectUrl));

  const loginRedirect = redirectUrl || namedRoutes.internal.myFeed;

  const handleBackToLogin = () => {
    addToDataLayer({
      event: gtm.verifyEmailBackToLoginBtnClicked,
      pageType: page.login,
    });
    changeView('login');
  };

  const handleVerifyLater = async () => {
    addToDataLayer({
      event: gtm.verifyEmailSkipBtnClicked,
      pageType: page.login,
    });
    try {
      router.push(`${loginRedirect}`);
    } catch (e) {
      Logger.error(e);
    }
  };

  const BackToLoginButton = (
    <Button
      variant="quinary"
      as="a"
      text="back to login"
      onClick={handleBackToLogin}
      padding="0 12px"
    />
  );

  const VerifyLaterButton = (
    <Button
      variant="primary"
      text="I'll verify later"
      onClick={handleVerifyLater}
      padding="0 12px"
    />
  );

  return (
    <VerifyContainer>
      <AuthenticateWrapper
        heroImages={{
          mobile: '/images/verify-hero.png',
          tablet: '/images/verify-hero.png',
          desktop: '/images/verify-hero.png',
        }}
        heroText="Hello"
        isSmartDevice={isSmartDevice}
        button={<OptionsButton option1={BackToLoginButton} option2={VerifyLaterButton} buttonWidth="equal" />}
      >
        <Box mb={spacing.xxl} width={1}>
          <Header variant="l" as="h1" text="Looks like you still need to verify your email address to validate your account." mb="l" />
          <Paragraph variant="l" fontWeight="600">{email}</Paragraph>
          <Paragraph variant="l" mb="l" transparent>
            Please check your inbox and hit the verify link. Can’t find it? Check your spam folder for an email from no-reply@listnr.com or hit the link below to resend.
          </Paragraph>
          <Divider opacity={0.15} />
          <UserSelection iconType="email" title="Resend verfication email" clickAction="verificationEmail" sending={sending} setSending={setSending} changeView={changeView} />
          <UserSelection iconType="support" title="Contact us for support" clickAction={namedRoutes.internal.contactUs} />
          <UserSelection iconType="faq" title="FAQ’s" clickAction={namedRoutes.internal.faq} />
        </Box>
      </AuthenticateWrapper>
    </VerifyContainer>
  );
}

const VerifyContainer = styled.div`
  min-height: 100vh;
`;

VerifyEmail.propTypes = {
  changeView: PropTypes.func.isRequired,
  isSmartDevice: PropTypes.bool,
};

VerifyEmail.defaultProps = {
  isSmartDevice: false,
};

export default VerifyEmail;
