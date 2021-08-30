import React from 'react';
import { Box } from 'components/Grid';
import Link from 'next/link';
import routes from 'common/named-routes';
import Slider from 'components/Slider';
import addToDataLayer from 'utilities/helpers/dataLayer';
import gtm from 'utilities/GTM/gtmTags';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import CategoryCard from 'components/Card/CategoryCard';

const PodcastCategories = ({ podcastCategories }) => (
  <Slider
    slidesToScroll={2}
    title="View by Category"
  >
    {podcastCategories.map((category, i) => (
      <Box key={category.slug} px="6px">
        <Link
          href={`${routes.external.category}/${category.slug}`}
        >
          <a>
            <CategoryCard
              bg={get(category, 'colour', '')}
              heading={get(category, 'name', '')}
              image={get(category, 'images.bannerSmall.url', '')}
              onClick={() => addToDataLayer({
                event: gtm.onBrowsePageCategoryTitle,
                carouselCardIndex: i,
                carouselName: 'Podcast Categories',
                carouselCardName: category.name,
              })}
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
