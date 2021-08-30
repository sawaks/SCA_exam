import { Box } from '@rebass/grid';
import AuthenticateWrapper from 'components/Authentication/AuthenticateWrapper';
import Email from 'components/Form/Input/Email';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import StepsButton from 'page-components/Authenticate/Forms/StepsButton';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Form } from 'react-final-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { resetPasswordWithEmail } from 'store/actions/auth-email';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import Logger from 'utilities/helpers/logger';
import errorCodes from 'utilities/helpers/toast/errorCodes';

function ResetPassword({ changeView, userState, updateUserState, isSmartDevice }) {
  const dispatch = useDispatch();
  const { email } = useSelector(state => state.profile, shallowEqual);

  useEffect(() => {
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.resetPassword,
    });
  }, []);

  const onSubmit = async (values) => {
    addToDataLayer({ event: gtm.resetEmailPasswordSubmitBtnClicked });
    try {
      const resetPassword = await dispatch(resetPasswordWithEmail(values.email_address));
      if (resetPassword) {
        addToDataLayer({ event: gtm.resetEmailPasswordSuccessful });
        updateUserState({ ...userState, email: values.email_address });
        changeView('done');
      }
      return {};
    } catch (e) {
      addToDataLayer({ event: gtm.resetEmailPasswordUnSuccessful });
      Logger.error(e);
      return { email_address: errorCodes[e.code] ? errorCodes[e.code].text : errorCodes.default.text };
    }
  };

  const previousScreen = () => {
    addToDataLayer({ event: gtm.emailGoBackBtnClicked });
    changeView('login');
  };

  return (
    <StyledForm>
      <Form
        onSubmit={onSubmit}
        initialValues={{ email_address: email || undefined }}
        keepDirtyOnReinitialize
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <AuthenticateWrapper
              heroImages={{
                mobile: '/images/reset-hero.png',
                tablet: '/images/reset-hero.png',
                desktop: '/images/reset-hero.png',
              }}
              heroText="Okay"
              isSmartDevice={isSmartDevice}
              button={(
                <StepsButton
                  submitText="Reset"
                  disabled={submitting}
                  submitting={submitting}
                  onNextClick={() => addToDataLayer({ event: gtm.emailContinueBtnClicked })}
                  onGoBackClick={previousScreen}
                />
              )}
            >
              <Box>
                <Header variant="l" as="h1" text="Reset Password" mb="l" />
                <Paragraph variant="m" mb="l" text="Enter your email address and we will send you a link to reset your password" transparent />
                <Box mb={spacing.xxl} width={1}>
                  <Email name="email_address" label="Enter your email address" />
                </Box>
              </Box>
            </AuthenticateWrapper>
          </form>
        )}
      />
    </StyledForm>
  );
}

ResetPassword.propTypes = {
  userState: PropTypes.objectOf(PropTypes.any).isRequired,
  updateUserState: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  isSmartDevice: PropTypes.bool,

};

ResetPassword.defaultProps = {
  isSmartDevice: false,
};

const StyledForm = styled.div`
  height: calc(100vh - 50px);
  & form {
    height: 100%;
  }
`;

export default ResetPassword;
