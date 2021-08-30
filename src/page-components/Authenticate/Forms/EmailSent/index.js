import { Box } from '@rebass/grid';
import { useRouter } from 'next/router';
import AuthenticateWrapper from 'components/Authentication/AuthenticateWrapper';
import Logger from 'utilities/helpers/logger';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import Button from 'components/Button';
import Divider from 'components/Divider';
import OptionsButton from 'components/Authentication/OptionsButton';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import namedRoutes from 'common/named-routes';
import { shallowEqual, useSelector } from 'react-redux';
import UserSelection from '../VerifyEmail/components/UserSelection';

function EmailSent({ changeView, isSmartDevice }) {
  const router = useRouter();
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

  const handleHaveVerified = async () => {
    addToDataLayer({
      event: gtm.verifyEmailHaveVerifiedBtnClicked,
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

  const HaveVerifiedButton = (
    <Button
      variant="primary"
      text="I have verified"
      onClick={handleHaveVerified}
      padding="0 12px"
    />
  );

  return (
    <DoneContainer>
      <AuthenticateWrapper
        heroImages={{
          mobile: '/images/reset-hero.png',
          tablet: '/images/reset-hero.png',
          desktop: '/images/reset-hero.png',
        }}
        heroText="Done"
        isSmartDevice={isSmartDevice}
        button={<OptionsButton option1={BackToLoginButton} option2={HaveVerifiedButton} buttonWidth="equal" />}
      >
        <Box mb={spacing.xxl} width={1}>
          <Header variant="m" as="h1" text="We’ve resent the verfication email." />
          <Header variant="m" as="h1" mb="l" text="It may take a few minutes to arrive." />
          <Paragraph variant="l" fontWeight="600">{email}</Paragraph>
          <Paragraph variant="l" mb="l" transparent>
            Please check your inbox and hit the verify link.
            Can’t find it? Check your spam folder for an email from no-reply@listnr.com.
          </Paragraph>
          <Divider opacity={0.15} />
          <UserSelection iconType="support" title="Contact us for support" clickAction={namedRoutes.internal.contactUs} />
          <UserSelection iconType="faq" title="FAQ’s" clickAction={namedRoutes.internal.faq} />
        </Box>
      </AuthenticateWrapper>
    </DoneContainer>
  );
}

const DoneContainer = styled.div`
  min-height: 100vh;
`;

EmailSent.propTypes = {
  changeView: PropTypes.func.isRequired,
  isSmartDevice: PropTypes.bool,
};

EmailSent.defaultProps = {
  isSmartDevice: false,
};

export default EmailSent;
