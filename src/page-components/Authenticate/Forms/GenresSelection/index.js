import { Box, Flex } from 'components/Grid';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setMusicOnboarding } from 'utilities/api/firebase/profile';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import { getAllGenres } from 'utilities/api/graphql/genres/queryMethods';
import { addFavouriteGenres } from 'store/actions/favourite';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import Logger from 'utilities/helpers/logger';

import AuthenticateWrapper from '../../../../components/Authentication/AuthenticateWrapper';
import StepsButton from '../StepsButton';

function GenresSelection({ changeView, userState, updateUserState }) {
  const [genres, setGenres] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  const [musicSelectionComplete] = useState(useSelector(state => (state.profile.hasUserOnboardedMusic)), shallowEqual);
  const { userId } = useSelector(state => (state.profile), shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const musicGenres = get(await getAllGenres(), 'allGenres', []);
      setGenres(musicGenres);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (userState.genres.length > 0) {
      setDisableButton(false);
      return;
    }
    setDisableButton(true);
  }, [userState.genres]);

  const setMusicOnboarded = async () => {
    try {
      if (!musicSelectionComplete && userId) {
        await dispatch(setMusicOnboarding(userId));
      }
    } catch (e) {
      Logger.error(e);
    }
  };

  const handleNextClick = async () => {
    addToDataLayer({
      event: gtm.onboarding6SetupFavouriteGenre,
      genres: userState.genres.map(item => item.name),
      pageType: page.emailSignup,
    });
    try {
      if (!musicSelectionComplete && userId) {
        await dispatch(addFavouriteGenres(userId, userState.genres));
      }
    } catch (e) {
      Logger.error(e);
    }
    setMusicOnboarded();
    changeView('step5');
  };

  const previousScreen = () => {
    changeView('step3');
  };

  const handleGenreClick = (genre) => {
    if (!userState.genres.find(item => item.slug === genre.slug)) {
      updateUserState({
        ...userState,
        genres: [
          ...userState.genres,
          {
            slug: genre.slug,
            name: genre.name,
            description: genre.description,
          },
        ],
        hasUserOnboardedMusic: true,
      });
      return;
    }
    updateUserState({ ...userState, genres: [...userState.genres.filter(item => item.slug !== genre.slug)], hasUserOnboardedMusic: true });
  };

  return (
    <>
      <AuthenticateWrapper
        withHero={false}
        fixedButton
        button={(
          <StepsButton
            step="03"
            disabled={disableButton}
            onNextClick={handleNextClick}
            onGoBackClick={previousScreen}
            withBackButton={!userId}
          />
        )}
      >
        <Box width={1}>
          <Box mt={[spacing.l, 0]} mb={spacing.s}>
            <Header variant="l" as="h1" text="What music do you like to listen to?" mb="s" data-test="genre-header" />
          </Box>
          <Box mb={[spacing.xl, spacing.l]}>
            <Paragraph variant="l" text="Choose one or more genres." transparent mb="l" />
          </Box>
          <Flex flexWrap="wrap" mb={spacing.xl}>
            {
              genres?.map((genre, i) => {
                const genreImage = userState.genres.find(item => item.slug === genre.slug) ? get(genre, 'images.bannerLarge') : '';
                return (
                  <StyledBox
                    onClick={() => handleGenreClick(genre)}
                    alignItems="flex-end"
                    index={i}
                    p={spacing.m}
                    mb={spacing.m}
                    key={genre.slug}
                    imageUrl={genreImage}
                  >
                    <Header as="h3" text={genre.name} style={{ fontSize: '14px' }} />
                  </StyledBox>
                );
              })
            }
          </Flex>
        </Box>
      </AuthenticateWrapper>
    </>
  );
}

const StyledBox = styled(Flex)`
  height: 80px;
  width: calc(50vw - 20px);
  border-radius: 12px;
  cursor: pointer;
  border: solid 1px rgba(255, 255, 255, 0.16);
  background-color: ${props => props.theme.backgroundLight};
  background-image: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'none')};
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: ${props => ((props.index + 1) % 2 === 0 ? 0 : spacing.m)};

  ${screen.md} {
    width: 159px;
    margin-right: ${props => ((props.index + 1) % 3 === 0 ? 0 : spacing.m)};
  }
`;

GenresSelection.propTypes = {
  userState: PropTypes.objectOf(PropTypes.any).isRequired,
  updateUserState: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
};

export default GenresSelection;
