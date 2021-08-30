import ShowCard from 'components/Card/ShowCard';
import Divider from 'components/Divider';
import Section from 'components/Section';
import Header from 'components/Typography/Header';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import { Flex } from 'components/Grid';
import Link from 'next/link';
import routes from 'common/named-routes';

const StationResults = ({ stations }) => (
  <>
    <Section>
      <HeaderWrapper>
        <Header as="h2" marginBottom="l">
          Stations
        </Header>
      </HeaderWrapper>
      <DivWrapper>
        <Divider />
      </DivWrapper>
      <Flex flexWrap="wrap">
        {stations.map(station => (
          <Link href={`${routes.external.stations}/${station.slug}`} key={station.slug} passHref>
            <ShowCard
              title={station?.name}
              subTitle={station?.description}
              imageUrl={station?.images?.logoLarge}
              colour={station?.backgroundColour}
            />
          </Link>
        ))}
      </Flex>
    </Section>
  </>
);

const HeaderWrapper = styled.div`
  margin: ${spacing.l} 0 ${spacing.m} 0;
  ${screen.md} {
    margin: ${spacing.xl} 0 ${spacing.m} 0;
  }
`;

const DivWrapper = styled.div`
  margin: ${spacing.m} 0;
`;

StationResults.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StationResults;

