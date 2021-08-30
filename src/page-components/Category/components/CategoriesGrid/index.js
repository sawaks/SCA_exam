import { Box, Flex } from '@rebass/grid';
import routes from 'common/named-routes';
import ShowCard from 'components/Card/ShowCard';
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

function CategoriesGrid({ shows, name, description, setOrder }) {
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
      </Flex>
      <Box mt={spacing.l} mb={spacing.m}>
        <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Header as="h2" text={`${shows.length} Podcasts`} variant="l" />
          <FilterButton setOrder={setOrder} />
        </Flex>
      </Box>
      <Row flexWrap="wrap" mt={spacing.l}>
        {shows.map((show, i) => (
          <Box width={[1 / 2, 1 / 3, 1 / 4, 1 / 5]} mb={spacing.l} key={show.slug}>
            <Link
              href={`${routes.external.podcasts}/${show.slug}`}
            >
              <a>
                <ShowCard
                  noMaxWidth
                  title={show.name}
                  subTitle={show.description}
                  imageUrl={get(show, 'images.squareLarge.url', null)}
                  onClick={() => addToDataLayer({
                    event: gtm.onBrowsePageCategoryBasedCarouselClick,
                    carouselCardIndex: i,
                    carouselName: name,
                    carouselCardName: show.name,
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

CategoriesGrid.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string,
    images: PropTypes.shape({
      squareMedium: PropTypes.shape({
        url: PropTypes.string,
        pixelWidth: PropTypes.number,
      }),
    }),
  })),
  name: PropTypes.string,
  description: PropTypes.string,
  setOrder: PropTypes.func,
};

CategoriesGrid.defaultProps = {
  shows: [],
  name: '',
  description: null,
  setOrder: null,
};

export default CategoriesGrid;
