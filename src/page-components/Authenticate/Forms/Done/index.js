import { Box } from '@rebass/grid';
import AuthenticateWrapper from 'components/Authentication/AuthenticateWrapper';
import Header from 'components/Typography/Header';
import StepsButton from 'page-components/Authenticate/Forms/StepsButton';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

function Done({ changeView, userState, isSmartDevice }) {
  const previousScreen = () => {
    addToDataLayer({ event: gtm.emailGoBackBtnClicked });
    changeView('login');
  };

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
        button={(
          <StepsButton
            withBackButton={false}
            submitText="Back To Login"
            onNextClick={previousScreen}
          />
        )}
      >
        <Box mb={spacing.xxl} width={1}>
          <Header variant="l" as="h1" text={`Thanks, we’ve sent an email to ${userState.email} with a link to reset your password.`} mb="l" />
        </Box>
      </AuthenticateWrapper>
    </DoneContainer>
  );
}

const DoneContainer = styled.div`
  height: calc(100vh - 50px)
`;

Done.propTypes = {
  changeView: PropTypes.func.isRequired,
  userState: PropTypes.objectOf(PropTypes.any).isRequired,
  isSmartDevice: PropTypes.bool,
};

Done.defaultProps = {
  isSmartDevice: false,
};

export default Done;
