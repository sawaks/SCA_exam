import { Box, Flex } from '@rebass/grid';
import routes from 'common/named-routes';
import ShowCard from 'components/Card/ShowCard';
import Divider from 'components/Divider';
import { Row } from 'components/Grid';
import Header from 'components/Typography/Header';
import get from 'lodash/get';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

const StyledShowGrid = styled(Box)`
   background-color: ${props => props.theme.dark};
   border-radius: 26px;
   padding: ${spacing.l} ${spacing.m};
   ${screen.lg} {
       padding: ${spacing.l};
    }
`;

const StyledText = styled(Box)`
   max-width: 100%;
    ${screen.md} {
      max-width: 480px;
    }

    ${screen.lg} {
      max-width: 800px;
    }
`;

function ShowGrid({ shows, name }) {
  return (
    <StyledShowGrid>
      <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <StyledText width={[1, 0.65, 0.65]}>
          <Header as="h1" text={shows.length > 1 ? `${shows.length} Podcasts` : `${shows.length} Podcast`} variant="m" />
        </StyledText>
      </Flex>
      <Box my={spacing.m}>
        <Divider />
      </Box>
      <Row flexWrap="wrap" mt={spacing.l}>
        {shows.map((show, i) => (
          <Box width={[1 / 2, 1 / 3, 1 / 4, 1 / 5]} mb={spacing.l} key={show.slug}>
            <Link
              href={`${routes.external.podcasts}/${show.slug}`}
              passHref
            >
              <ShowCard
                as="a"
                noMaxWidth
                title={show.name}
                subTitle={show.description}
                imageUrl={get(show, 'images.squareLarge.url', null)}
                onClick={() => addToDataLayer({
                  event: gtm.onCreatorPageShowBasedCarouselClick,
                  carouselCardIndex: i,
                  carouselName: name,
                  carouselCardName: show.name,
                })}
              />
            </Link>
          </Box>
        ))}
      </Row>
    </StyledShowGrid>
  );
}

ShowGrid.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string,
    images: PropTypes.shape({
      squareLarge: PropTypes.shape({
        url: PropTypes.string,
        pixelWidth: PropTypes.number,
      }),
    }),
  })),
  name: PropTypes.string,
};

ShowGrid.defaultProps = {
  shows: [],
  name: '',
};

export default ShowGrid;
