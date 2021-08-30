import Paragraph from 'components/Typography/Paragraph';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import { Box, Flex } from '@rebass/grid';
import Header from 'components/Typography/Header';
import AuthenticateWrapper from 'components/Authentication/AuthenticateWrapper';
import screen from 'styles/helpers/media';
import get from 'lodash/get';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { useSelector, useDispatch } from 'react-redux';
import { addFavouriteStations } from 'store/actions/favourite';
import { useRouter } from 'next/router';
import { getOnboardStations } from 'utilities/api/graphql/stations/queryMethods';
import StepsButton from '../StepsButton';
import * as nameRoutes from '../../../../common/named-routes';

function StationsSelection({ changeView, userState, updateUserState }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [stations, setStations] = useState([]);

  const uid = useSelector(state => (state.profile.userId));
  const postcode = useSelector(state => (state.profile.postcode));

  useEffect(() => {
    const fetchData = async () => {
      const genreSlugs = userState.genres.map(item => item.slug);
      const results = get(await getOnboardStations(genreSlugs), 'onboardStations', []);
      setStations(results);
    };
    fetchData();
  }, []);

  const handleStationClick = (stationSlug, isSelected) => {
    if (!isSelected) {
      updateUserState({
        ...userState,
        stations: [...userState.stations, stationSlug],
      });
      return;
    }
    updateUserState({ ...userState, stations: [...userState.stations.filter(item => item !== stationSlug)] });
  };

  const handleNextClick = async () => {
    addToDataLayer({
      event: gtm.onboarding5SetUpFavouriteStations,
      stationName: userState.stations,
      pageType: page.emailSignup,
    });

    if (uid && postcode) {
      if (userState.stations.length) {
        await dispatch(addFavouriteStations(uid, postcode, userState.stations));
      }
      router.push(`${nameRoutes.internal.myFeed}`);
    } else {
      changeView('step6');
    }
  };

  const previousScreen = () => {
    changeView('step4');
  };

  return (
    <AuthenticateWrapper
      withHero={false}
      fixedButton
      button={(
        <StepsButton
          step="03"
          onNextClick={handleNextClick}
          onGoBackClick={previousScreen}
        />
      )}
    >
      <Box width={1}>
        <Box mt={[spacing.l, 0]} mb={spacing.s}>
          <Header variant="l" as="h1" text="Favourite stations to customise your experience" />
        </Box>
        <Box mb={[spacing.xl, spacing.l]}>
          <Paragraph variant="l" text="Add more, or remove favourites at any time." transparent />
        </Box>
        <Flex flexWrap="wrap" mb={spacing.xl}>
          {
            stations.map((station, index) => {
              const stationImage = get(station, 'logoImageUrl', null);
              const isSelected = userState.stations.find(element => element === station.slug);
              return (
                <Container index={index} key={station.slug}>
                  <StyledFlex
                    alignItems="center"
                    p={spacing.m}
                    mb={spacing.m}
                    selected={isSelected}
                    onClick={() => handleStationClick(station.slug, isSelected)}
                    imageUrl={stationImage}
                  >
                    {!stationImage && station.name}
                  </StyledFlex>
                  <StyledText
                    alignItems="center"
                    p={spacing.m}
                    mb={spacing.m}
                    selected={isSelected}
                    onClick={() => handleStationClick(station.slug, isSelected)}
                  >
                    <span>{stationImage && station.name}</span>
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
  filter: ${props => (props.selected ? 'grayscale(0%)' : 'grayscale(100%)')};
  opacity: ${props => (props.selected ? 1 : 0.3)};
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
  display: ${props => (props.selected ? 'none' : 'flex')};
  align-items: center;
`;

StationsSelection.propTypes = {
  userState: PropTypes.objectOf(PropTypes.any).isRequired,
  updateUserState: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
};

export default StationsSelection;
