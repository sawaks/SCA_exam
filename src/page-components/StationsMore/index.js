import React from 'react';
import Page from 'components/Layout/Page';
import { Container } from 'components/Grid';
import Section from 'components/Section';
import { arrayOf, shape, string } from 'prop-types';
import Header from 'components/Typography/Header';
import Divider from 'components/Divider';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';
import GetAllStationsList from './components/GetAllStationsList';
import GetMetroAndAllStationsList from './components/GetMetroAndAllStationsList';

const HeaderWrapper = styled.div`
  margin: ${spacing.l} 0 ${spacing.m} 0;

  ${screen.sm} {
    margin: 0;
  }
`;

const StationsMore = ({ station }) => {
  const { allRelatedStations, stationType } = station;
  const { title: pageTitle, groupItems: relatedStations } = allRelatedStations;
  const metroStationsObj = relatedStations.find(item => item.title === 'Metro Stations');
  const allStationsObj = relatedStations.find(item => item.title === 'All stations A-Z');

  return (
    <Page withNav withAudio withFooter>
      <Container>
        <Section>
          <HeaderWrapper>
            <Header as="h1" variant="xl" text={pageTitle} mb="l" />
          </HeaderWrapper>
          <Divider opacity={0.2} />
          {stationType === 'Digital' ? (
            <GetAllStationsList allStationsObj={allStationsObj} />
          ) : (
            <GetMetroAndAllStationsList
              allStationsObj={allStationsObj}
              metroStationsObj={metroStationsObj}
            />
          )}
        </Section>
      </Container>
    </Page>
  );
};

StationsMore.propTypes = {
  station: shape({
    stationType: string,
    allRelatedStations: shape({
      title: string,
      groupItems: arrayOf(shape({
        title: string,
        items: arrayOf(
          shape({
            name: string,
            slug: string,
            logoImageUrl: string,
            backgroundColour: string,
          })
        ),
      })),
    }),
  }).isRequired,
};

export default StationsMore;
