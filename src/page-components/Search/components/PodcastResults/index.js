import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';
import { Flex, Box } from 'components/Grid';
import Header from 'components/Typography/Header';
import Divider from 'components/Divider';
import Link from 'next/link';
import routes from 'common/named-routes';
import ShowCard from 'components/Card/ShowCard';
import addToDataLayer from 'utilities/helpers/dataLayer';
import gtm from 'utilities/GTM/gtmTags';

const PodcastResults = ({ podcasts }) => (
  <>
    <HeaderWrapper>
      <Header as="h2" marginBottom="l">
        Shows
      </Header>
    </HeaderWrapper>
    <DivWrapper>
      <Divider />
    </DivWrapper>
    <Flex flexWrap="wrap">
      {podcasts.map((podcast, i) => (
        <Box key={podcast.slug}>
          <Link href={`${routes.external.podcasts}/${podcast.slug}`}>
            <ShowCard
              as="a"
              title={podcast.name}
              subTitle={podcast.description}
              imageUrl={podcast.images.squareLarge.url}
              tags={podcast.playlistCategories}
              onClick={() => addToDataLayer({
                event: gtm.searchResultsPodcastClick,
                carouselCardIndex: i,
                carouselName: 'Search Results Podcasts',
                carouselCardName: podcast.name,
              })}
            />
          </Link>
        </Box>
      ))}
    </Flex>

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

PodcastResults.propTypes = {
  podcasts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PodcastResults;
