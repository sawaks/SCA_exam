import Paragraph from 'components/Typography/Paragraph';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import { getAllCategories } from 'utilities/api/graphql/categories/queryMethods';
import { Box, Flex } from '@rebass/grid';
import Header from 'components/Typography/Header';
import AuthenticateWrapper from 'components/Authentication/AuthenticateWrapper';
import screen from 'styles/helpers/media';
import get from 'lodash/get';
import shuffle from 'lodash/shuffle';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import StepsButton from '../StepsButton';

function ShowsSelection({ changeView, userState, updateUserState }) {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categories = get(await getAllCategories(), 'categories', []);
      const selectedShows = [];
      userState.categories.forEach((category) => {
        selectedShows.push(...(get(categories.find(item => item.id === category.id), 'shows')));
      });

      const tier1Shows = selectedShows.filter(show => show.tier === 1);
      const randomizedShows = shuffle(tier1Shows);
      setShows(randomizedShows);
    };
    fetchData();
  }, []);

  const handleShowClick = async (show) => {
    if (!userState.shows.find(item => item.id === show.id)) {
      updateUserState({
        ...userState,
        shows: [
          ...userState.shows,
          {
            id: show.id,
            slug: show.slug,
            name: show.name,
            showType: show.showType,
          },
        ],
      });
      return;
    }
    updateUserState({ ...userState, shows: [...userState.shows.filter(item => item.id !== show.id)] });
  };

  const handleNextClick = () => {
    addToDataLayer({
      event: gtm.onboarding4ShowSetUpFavouriteShows,
      podcastName: userState.shows.map(item => item.name),
      pageType: page.emailSignup,
    });
    changeView('step4');
  };

  const previousScreen = () => {
    changeView('step2');
  };

  return (
    <AuthenticateWrapper
      withHero={false}
      button={(
        <StepsButton
          step="02"
          onNextClick={handleNextClick}
          onGoBackClick={previousScreen}
        />
      )}
    >
      <Box width={1}>
        <Box mt={[spacing.l, 0]} mb={spacing.s}>
          <Header variant="l" as="h1" text="Favourite some podcasts to customise your experience" />
        </Box>
        <Box mb={[spacing.xl, spacing.l]}>
          <Paragraph variant="l" text="You can add more, or remove favourites at any time." transparent />
        </Box>
        <Flex flexWrap="wrap" mb={spacing.xl}>
          {
            shows.map((show, i) => {
              const showImage = get(show, 'images.squareLarge.url');
              return (
                <Container index={i} key={show.slug}>
                  <StyledFlex
                    alignItems="center"
                    p={spacing.m}
                    mb={spacing.m}
                    selected={!userState.shows.find(item => item.id === show.id)}
                    onClick={() => handleShowClick(show)}
                    imageUrl={showImage}
                  >
                    {!showImage && show.name}
                  </StyledFlex>
                  <StyledText
                    alignItems="center"
                    p={spacing.m}
                    mb={spacing.m}
                    selected={!userState.shows.find(item => item.id === show.id)}
                    onClick={() => handleShowClick(show)}
                  >
                    <span>{showImage && show.name}</span>
                  </StyledText>
                </Container>
              );
            })
          }
        </Flex>
      </Box>
    </AuthenticateWrapper>
  );
}

const Container = styled(Flex)`
  position: relative;
  height: calc( 50vw - 20px);
  width: calc( 50vw - 20px);
  margin-right: ${props => ((props.index + 1) % 2 === 0 ? 0 : spacing.m)};
  margin-bottom: ${spacing.m};
  ${screen.sm} {
    width: 159px;
    height: 160px;
    margin-right: ${props => ((props.index + 1) % 3 === 0 ? 0 : spacing.m)};
  }
`;

const StyledFlex = styled(Flex)`
  cursor: pointer;
  border-radius: 12px;
  border: solid 1px rgba(255, 255, 255, 0.16);
  background-color: ${props => props.theme.backgroundLight};
  background-size: cover;
  filter: ${props => (props.selected ? 'grayscale(100%)' : 'grayscale(0%)')};
  opacity: ${props => (props.selected ? 0.3 : 1)};
  background-repeat: no-repeat;
  background-image: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'none')};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledText = styled(Flex)`
  font-family: dunbar-tall, sans-serif;
  font-size: 14px;
  font-weight: bold;
  opacity: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 ${spacing.m};
  display: ${props => (props.selected ? 'flex' : 'none')};
  align-items: center;
`;

ShowsSelection.propTypes = {
  userState: PropTypes.objectOf(PropTypes.any).isRequired,
  updateUserState: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
};

export default ShowsSelection;
