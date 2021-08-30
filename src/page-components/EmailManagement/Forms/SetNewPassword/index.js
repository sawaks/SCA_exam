import AuthenticateWrapper from 'components/Authentication/AuthenticateWrapper';
import Password from 'components/Form/Input/Password';
import { Box } from 'components/Grid';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import { useRouter } from 'next/router';
import StepsButton from 'page-components/Authenticate/Forms/StepsButton';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { confirmPasswordReset, verifyPasswordResetCode } from 'store/actions/auth-email';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

function SetNewPassword({ changeView }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(useSelector(state => (state.profile.error)));
  const [loading, setLoading] = useState(true);
  const [inProgress, setProgress] = useState(false);

  const validate = (values) => {
    const errors = {};

    if ((!values.password || !values.password.length) && !error) {
      errors.password = 'Please enter a password';
    }
    return errors;
  };

  const onSubmit = async (values) => {
    setProgress(true);
    try {
      await dispatch(confirmPasswordReset(router?.query?.oobCode, values.password));
      changeView('passwordChanged');
    } catch (e) {
      setError(true);
    }
  };

  const verifyActionCode = async () => {
    try {
      const userEmail = await dispatch(verifyPasswordResetCode(router?.query?.oobCode));
      setEmail(userEmail);
      setLoading(false);
    } catch (e) {
      changeView('resetPasswordError');
    }
  };

  useEffect(() => {
    if (router?.query?.mode === 'resetPassword') {
      verifyActionCode();
    }
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.setNewPassword,

    });
  }, []);

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
                heroImages={{
                  mobile: '/images/reset-hero.png',
                  tablet: '/images/reset-hero.png',
                  desktop: '/images/reset-hero.png',
                }}
                heroText="Okay"
                button={(
                  <StepsButton
                    submitText="Save"
                    disabled={submitting || inProgress}
                    submitting={submitting || inProgress}
                    withBackButton={false}
                  />
                  )}
              >
                <StyledBox pb={spacing.m}>
                  {!loading && (
                    <>
                      <StyledHeader>
                        <Header as="h1" variant="l" mb="l" text="Reset your password" />
                        <Paragraph variant="l" mb="l" text={`for ${email}`} transparent />
                      </StyledHeader>
                      <Password name="password" label="New password" dontValidate wrongPassword={error} />
                    </>
                  )}
                </StyledBox>
              </AuthenticateWrapper>
            </form>
          )
      }
        />
      </StyledPasswordForm>
    </>
  );
}

const StyledBox = styled(Box)`
  min-height: 170px;
  width: 100%;
`;

const StyledPasswordForm = styled.div`
  height: calc(100vh - 50px);
  & form {
    height: 100%;
  }
`;

const StyledHeader = styled.div`
  color: ${props => props.theme.whiteColor};
`;

SetNewPassword.propTypes = {
  changeView: PropTypes.func.isRequired,
};

export default SetNewPassword;
