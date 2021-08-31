import { Box, Flex } from '@rebass/grid';
import routes from 'routes';
import ShowCard from 'shared-components/Card/ShowCard';
import { Row } from 'shared-components/Grid';
import Header from 'shared-components/Typography/Header';
import Paragraph from 'shared-components/Typography/Paragraph';
import get from 'lodash/get';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'src/styling/screen';
import spacing from 'src/styling/spacing';

import FilterButton from '../FilterButton';

const StyledCategoryGrid = styled(Box)`
   background-color: ${props => props.theme.dark};
   border-radius: 26px;
   padding: ${spacing.m};

   ${screen.tablet} {
    padding: 15px;
  }

`;

const StyledBox = styled(Box)`
   max-width: 100%;

  ${screen.mobile} {
    max-width: 480px;
  }

  ${screen.laptop} {
    max-width: 800px;
  }
`;
const TextWrapper = styled.div`
   margin-bottom: 12px;

   ${screen.mobile} {
    margin-bottom: 0;
  }
`;

function CategoriesGrid({ shows, description, setOrder }) {
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
        {shows.map(show => (
          <Box width={[1 / 2, 1 / 3, 1 / 4, 1 / 5]} mb={spacing.l} key={show.slug}>
            <Link
              href={`${routes.podcasts}/${show.slug}`}
            >
              <a>
                <ShowCard
                  noMaxWidth
                  title={show.name}
                  subTitle={show.description}
                  imageUrl={get(show, 'images.squareLarge.url', null)}
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
  description: PropTypes.string,
  setOrder: PropTypes.func,
};

CategoriesGrid.defaultProps = {
  shows: [],
  description: null,
  setOrder: null,
};

export default CategoriesGrid;
