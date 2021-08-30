import { Box, Flex } from '@rebass/grid';
import AuthenticateWrapper from 'components/Authentication/AuthenticateWrapper';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import StepsButton from 'page-components/Authenticate/Forms/StepsButton';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';

function MusicOnboarding({ changeView }) {
  const handleNextClick = () => {
    changeView('step4');
  };

  return (
    <MusicOnboardingContainer>
      <AuthenticateWrapper withHero={false}>
        <FullHeightWrapper>
          <Flex
            width={1}
            justifyContent="center"
            mt={[0, 48]}
            mb={[48]}
          >
            <img
              src="/images/music-onboarding-bg.png"
              alt="google-play"
              width={291}
              height={288}
            />
          </Flex>
          <TextAlignCentre>
            <Box width={1}>
              <Header variant="l" as="h1" text="You can now enjoy live stations on LiSTNR, let us know what you love." mb="l" />
            </Box>
            <Box mb={[spacing.xl]}>
              <Paragraph variant="l" text="We'll add this to your existing podcast favourites and use it to better customise your station experience." transparent mb="l" />
            </Box>
          </TextAlignCentre>
          <StepsButton
            withBackButton={false}
            submitText="Continue"
            onNextClick={handleNextClick}
          />
        </FullHeightWrapper>
      </AuthenticateWrapper>
    </MusicOnboardingContainer>
  );
}

const MusicOnboardingContainer = styled.div`
  height: calc(100vh - 50px);
`;

const FullHeightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const TextAlignCentre = styled.div`
  text-align: center;
`;

MusicOnboarding.propTypes = {
  changeView: PropTypes.func.isRequired,
};

export default MusicOnboarding;
