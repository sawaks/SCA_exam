import { Box } from '@rebass/grid';
import AuthenticateWrapper from 'components/Authentication/AuthenticateWrapper';
import Password from 'components/Form/Input/Password';
import Text from 'components/Form/Input/Text';
import Header from 'components/Typography/Header';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { Form } from 'react-final-form';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { signOutUser } from 'store/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import StepsButton from '../StepsButton';

function SignUp({ changeView, userState, updateUserState, isSmartDevice }) {
  const dispatch = useDispatch();
  const userId = useSelector(state => (state.profile.userId));

  const focusRef = useRef(null);
  useEffect(() => {
    focusRef.current.focus();
  }, [focusRef]);

  useEffect(() => {
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.emailSignup,
    });
    addToDataLayer({
      event: gtm.onboarding2AccountSetupNext,
      pageType: page.emailSignup,
    });
  }, []);

  const onSubmit = async (values) => {
    // As the user is going through new user signup ensure we dont have an signed in account.
    if (userId) {
      dispatch(signOutUser());
    }

    updateUserState({
      ...userState,
      firstName: values.first_name,
      lastName: values.last_name,
      password: values.password,
    });

    changeView('step2');
  };

  const validate = (values) => {
    const errors = {};
    if (values.password !== values.confirm_password) {
      errors.confirm_password = 'Password does not match';
    }

    return errors;
  };

  const previousScreen = () => {
    addToDataLayer({ event: gtm.emailGoBackBtnClicked });
    changeView('login');
  };

  return (
    <StyledSignupForm>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{ first_name: userState.firstName, last_name: userState.lastName }}
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
                  step="01"
                  submitting={submitting}
                  onNextClick={() => addToDataLayer({ event: gtm.emailContinueBtnClicked })}
                  onGoBackClick={previousScreen}
                />
              )}
            >
              <Box width={1}>
                <Header variant="l" as="h1" text="Enter your Name and Password" mb={isSmartDevice ? 'xl' : 'l'} data-test="details-header" />
                <Text name="first_name" label="First Name" ref={focusRef} />
                <Text name="last_name" label="Last Name" />
                <Password name="password" label="Password" />
                <Box mb={spacing.xl} width={1}>
                  <Password name="confirm_password" label="Repeat Password" />
                </Box>
              </Box>
            </AuthenticateWrapper>
          </form>
        )}
      />
    </StyledSignupForm>
  );
}

SignUp.propTypes = {
  userState: PropTypes.objectOf(PropTypes.any).isRequired,
  updateUserState: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  isSmartDevice: PropTypes.bool,
};
SignUp.defaultProps = {
  isSmartDevice: false,
};

const StyledSignupForm = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  & form {
    height: 100%;
  }
`;

export default SignUp;
