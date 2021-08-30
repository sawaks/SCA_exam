import { Box } from '@rebass/grid';
import AuthenticateWrapper from 'components/Authentication/AuthenticateWrapper';
import Header from 'components/Typography/Header';
import { useRouter } from 'next/router';
import StepsButton from 'page-components/Authenticate/Forms/StepsButton';
import React from 'react';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import * as nameRoutes from '../../../../common/named-routes';
import Paragraph from '../../../../components/Typography/Paragraph';

function PasswordChanged() {
  const router = useRouter();

  const loginScreen = () => {
    router.push(nameRoutes.external.login);
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
        button={(
          <StepsButton
            withBackButton={false}
            submitText="Back To Login"
            onNextClick={loginScreen}
          />
        )}
      >
        <Box mb={spacing.xxl} width={1}>
          <Header variant="l" as="h1" text="Password changed" mb="l" />
          <Paragraph variant="l" mb="l" text="You can now sign in with your new password" transparent />
        </Box>
      </AuthenticateWrapper>
    </DoneContainer>
  );
}

const DoneContainer = styled.div`
  height: calc(100vh - 50px)
`;

export default PasswordChanged;
