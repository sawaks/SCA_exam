import { Box, Flex } from '@rebass/grid';
import routes from 'common/named-routes';
import ShowCard from 'components/Card/ShowCard';
import Divider from 'components/Divider';
import { Row } from 'components/Grid';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import get from 'lodash/get';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import FavouriteGenreButton from '../FavouriteGenreButton';
import FilterButton from '../FilterButton';

const StyledCategoryGrid = styled(Box)`
   background-color: ${props => props.theme.dark};
   border-radius: 26px;
   padding: ${spacing.m};

   ${screen.md} {
    padding: 15px;
  }

`;

const StyledBox = styled(Box)`
   max-width: 100%;

  ${screen.sm} {
    max-width: 480px;
  }

  ${screen.lg} {
    max-width: 800px;
  }
`;
const TextWrapper = styled.div`
   margin-bottom: 12px;

   ${screen.sm} {
    margin-bottom: 0;
  }
`;

function GenreGrid({ slug, stations, name, description, setOrder }) {
  return (
    <StyledCategoryGrid>
      <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <StyledBox width={[1, 0.65, 0.65]}>
          {Boolean(description) && (
          <TextWrapper>
            <Paragraph text={description} variant="l" transparent />
          </TextWrapper>
          )}
        </StyledBox>

        <Box width={[1, 0.35, 0.35]}>
          <Flex justifyContent={['center', 'flex-end', 'flex-end']} alignItems="center">
            <Box width={['100%', 'auto', 'auto']}>
              <FavouriteGenreButton slug={slug} name={name} description={description} />
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Box my={spacing.m}>
        <Divider />
      </Box>
      <Box mt={spacing.l} mb={spacing.m}>
        <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Header as="h2" text={`${stations.length} Stations`} variant="l" />
          <FilterButton setOrder={setOrder} />
        </Flex>
      </Box>
      <Row flexWrap="wrap" mt={spacing.l}>
        {stations.map((station, i) => (
          <Box width={[1 / 2, 1 / 3, 1 / 4, 1 / 5]} mb={spacing.l} key={station.slug}>
            <Link
              href={`${routes.external.stations}/${station.slug}`}
            >
              <a>
                <ShowCard
                  noMaxWidth
                  title={station.name}
                  subTitle={station.description}
                  imageUrl={get(station, 'images.logoLarge', null)}
                  colour={get(station, 'backgroundColour', null)}
                  onClick={() => addToDataLayer({
                    event: gtm.onGenrePageGenreBasedCarouselClick,
                    carouselCardIndex: i,
                    carouselName: name,
                    carouselCardName: station.name,
                  })}
                />
              </a>
            </Link>
          </Box>
        ))}
      </Row>
    </StyledCategoryGrid>
  );
}

GenreGrid.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string,
    backgroundColour: PropTypes.string,
    images: PropTypes.shape({
      logo: PropTypes.string,
    }),
  })),
  name: PropTypes.string,
  slug: PropTypes.string,
  description: PropTypes.string,
  setOrder: PropTypes.func,
};

GenreGrid.defaultProps = {
  stations: [],
  name: '',
  slug: '',
  description: null,
  setOrder: null,
};

export default GenreGrid;
