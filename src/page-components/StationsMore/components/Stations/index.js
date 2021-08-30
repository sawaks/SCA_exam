import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import Station from './Station';

const StationsContainer = styled.div`
  margin-top: ${spacing.l};
`;

const Stations = ({ stationData }) => (
  <StationsContainer>
    {stationData && stationData.map(stationItem => <Station key={stationItem.slug} stationItem={stationItem} />)}
  </StationsContainer>
);

export default Stations;

Stations.propTypes = {
  stationData: arrayOf(shape({
    name: string,
    slug: string,
    logoImageUrl: string,
    backgroundColour: string,
  })).isRequired,
};

