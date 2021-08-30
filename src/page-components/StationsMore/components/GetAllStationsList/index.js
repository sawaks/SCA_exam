import React from 'react';

import { Flex, Column, Box } from 'components/Grid';

import { arrayOf, shape, string } from 'prop-types';
import Header from 'components/Typography/Header';
import Divider from 'components/Divider';
import { Desktop, Mobile } from 'components/Screen';
import Stations from '../Stations';

const GetAllStationsList = ({ allStationsObj }) => {
  const allStationsTitle = allStationsObj?.title;
  const allStations = allStationsObj?.items;
  const averageStations = Math.floor(allStations.length / 2);
  const leftColListnr = allStations.slice(0, averageStations);
  const rightColListnr = allStations.slice(averageStations);

  return (
    <>
      <Header as="h2" variant="m" text={allStationsTitle} mt="l" mb="m" />
      <Desktop>
        <Flex flexWrap="wrap">
          <Column width={0.5}>
            <Box>
              <Divider opacity={0.2} />
              <Stations stationData={leftColListnr} />
            </Box>
          </Column>
          <Column width={0.5}>
            <Divider opacity={0.2} />
            <Stations stationData={rightColListnr} />
          </Column>
        </Flex>
      </Desktop>
      <Mobile>
        <Divider opacity={0.2} />
        <Stations stationData={allStations} />
      </Mobile>
    </>
  );
};

GetAllStationsList.propTypes = {
  allStationsObj: shape({
    title: string,
    items: arrayOf(
      shape({
        name: string,
        slug: string,
        logoImageUrl: string,
        backgroundColour: string,
      })
    ),
  }).isRequired,
};

export default GetAllStationsList;
