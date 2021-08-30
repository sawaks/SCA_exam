import React from 'react';

import { Flex, Box } from 'components/Grid';

import { arrayOf, shape, string } from 'prop-types';
import Header from 'components/Typography/Header';
import Divider from 'components/Divider';
import { Desktop, Mobile } from 'components/Screen';
import Stations from '../Stations';

const GetMetroAndAllStationsList = ({ allStationsObj, metroStationsObj }) => {
  const metroStationsTitle = metroStationsObj?.title;
  const metroStations = metroStationsObj?.items;
  const allStationsTitle = allStationsObj?.title;
  const allStations = allStationsObj?.items;

  const averageStations = Math.floor(allStations.length / 2);
  const metroStationsColumnOffset = (metroStations.length + 2) / 2 - 1;
  const leftColHitMMM = allStations.slice(
    0,
    averageStations - metroStationsColumnOffset
  );
  const rightColHitMMM = allStations.slice(
    averageStations - metroStationsColumnOffset
  );

  return (
    <>
      <Desktop>
        <Flex>
          <Box width={0.5}>
            <Box>
              <Header
                as="h2"
                variant="m"
                text={metroStationsTitle}
                mt="l"
                mb="m"
              />
              <Divider opacity={0.2} />
              <Stations stationData={metroStations} />
            </Box>
            <Box>
              <Header
                as="h2"
                variant="m"
                text={allStationsTitle}
                mt="xl"
                mb="m"
              />
              <Divider opacity={0.2} />
              <Stations stationData={leftColHitMMM} />
            </Box>
          </Box>
          <Box width={0.5}>
            <Divider opacity={0.2} />
            <Stations stationData={rightColHitMMM} />
          </Box>
        </Flex>
      </Desktop>
      <Mobile>
        <Header as="h2" variant="m" text={metroStationsTitle} mt="l" mb="m" />
        <Divider opacity={0.2} />
        <Stations stationData={metroStations} />
        <Header as="h2" variant="m" text={allStationsTitle} mt="xl" mb="m" />
        <Divider opacity={0.2} />
        <Stations stationData={allStations} />
      </Mobile>
    </>
  );
};

GetMetroAndAllStationsList.propTypes = {
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
  metroStationsObj: shape({
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

export default GetMetroAndAllStationsList;
