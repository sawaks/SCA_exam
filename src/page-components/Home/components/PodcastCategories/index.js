import React from 'react';
import { Box } from 'shared-components/Grid';
import Link from 'next/link';
import routes from 'routes';
import Slider from 'shared-components/Slider';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import CategoryCard from 'shared-components/Card/CategoryCard';

const PodcastCategories = ({ podcastCategories }) => (
  <Slider
    slidesToScroll={2}
    title="Categories"
  >
    {podcastCategories.map(category => (
      <Box key={category.slug} px="6px">
        <Link
          href={`${routes.category}/${category.slug}`}
        >
          <a>
            <CategoryCard
              bg={get(category, 'colour', '')}
              heading={get(category, 'name', '')}
              image={get(category, 'images.bannerSmall.url', '')}
            />
          </a>
        </Link>
      </Box>
    ))}
  </Slider>
);

PodcastCategories.propTypes = {
  podcastCategories: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default PodcastCategories;
