import { Box } from '@rebass/grid';
import namedRoutes from 'common/named-routes';
import AuthenticateWrapper from 'components/Authentication/AuthenticateWrapper';
import Loading from 'components/Loading';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import { useRouter } from 'next/router';
import StepsButton from 'page-components/Authenticate/Forms/StepsButton';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from 'store/actions/auth-email';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

function EmailVerification() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [header, setHeader] = useState('');
  const [message, setMessage] = useState('');
  const [processing, setProcessing] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [invalidStatus, setInvalidStatus] = useState(false);

  const { emailVerificationFlag } = useSelector(state => state.profile, shallowEqual);

  const handleVerifyEmail = async () => {
    try {
      await dispatch(verifyEmail(router?.query?.oobCode));
      setHeader('Your email has been verified.');
      setMessage('You can now sign in with your new account.');
    } catch (e) {
      setHeader('Try verifying your email again.');
      setMessage('Your request to verify your email has expired or the link has already been used.');
      setInvalidStatus(true);
    }
    setProcessing(false);
  };

  useEffect(() => {
    if (!emailVerificationFlag && router?.query?.mode === 'verifyEmail') {
      handleVerifyEmail();
    }
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.emailVerification,
    });
  }, []);

  const handleContinueClick = () => {
    setSubmitting(true);
    addToDataLayer({ event: gtm.verifyEmailSkipBtnClicked });
    if (emailVerificationFlag) {
      router.push(`${namedRoutes.internal.root}`);
      return;
    }
    router.push(`${namedRoutes.internal.login}`);
  };

  return (
    <VerifyContainer>
      <Loading
        loading={processing}
        render={() => (
          <AuthenticateWrapper
            heroImages={{
              mobile: '/images/verify-hero.png',
              tablet: '/images/verify-hero.png',
              desktop: '/images/verify-hero.png',
            }}
            heroText="Email Verification"
            button={(
              <StepsButton
                withBackButton={false}
                submitText="Continue"
                submitting={submitting}
                disabled={submitting}
                onNextClick={handleContinueClick}
              />
            )}
          >
            <Box mb={spacing.xxl} width={1}>
              <Header variant="l" as="h1" text={header} mb="l" />
              <Paragraph variant="l" mb="l" text={message} transparent />
              { invalidStatus && <Paragraph fontWeight={800} variant="l" mb="l" text="Click continue to re-enter your email address." transparent /> }
            </Box>
          </AuthenticateWrapper>
        )}
      />
    </VerifyContainer>
  );
}

const VerifyContainer = styled.div`
  height: calc(100vh - 50px);
`;

export default EmailVerification;
