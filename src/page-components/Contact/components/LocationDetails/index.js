import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from 'components/Typography/Header';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';
import { Flex, Box } from 'components/Grid';
import Map from './Map';
import Details from './Details';

const StyledOfficeInfo = styled(Flex)`
  background-color: ${props => props.theme.LEGACY_backgroundPrimary};
  padding: ${spacing.m} ${spacing.l};
  margin:  ${spacing.l} 0;
  flex-wrap: wrap;

   ${screen.md} {
    padding: ${spacing.l};
  }
`;

const StyledSection = styled.div`
  width: 100%;
  padding: ${spacing.m};
`;

const LocationDetails = ({ officeDetails }) => (
  <StyledOfficeInfo>
    {
      officeDetails && officeDetails.map(item => (
        <Box width={[1, 1, 1 / 2]} key={item.title}>
          <StyledSection smallBottomPadding key={item.title}>
            <Header as="h2" variant="m" text={item.title} mb="s" />
            <Details details={item.address} />
            <Map src={item.mapEmbedSrc} />
          </StyledSection>
        </Box>
      ))
    }
  </StyledOfficeInfo>
);

LocationDetails.propTypes = {
  officeDetails: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default LocationDetails;
