import React from 'react';
import { Box } from 'components/Grid';
import Link from 'next/link';
import routes from 'common/named-routes';
import Slider from 'components/Slider';
import CategoryCard from 'components/Card/CategoryCard';
import PropTypes from 'prop-types';

const PromotedGenres = ({ promotedGenres }) => (
  <Slider
    slidesToScroll={2}
    title="View stations by genre"
  >
    {promotedGenres.map(genre => (
      <Box key={genre.slug} px="6px">
        <Link
          href={`${routes.external.genre}/${genre.slug}`}
        >
          <a>
            <CategoryCard
              bg={genre?.colour}
              heading={genre?.name}
              image={genre?.images?.bannerMedium}
            />
          </a>
        </Link>
      </Box>
    ))}
  </Slider>
);

PromotedGenres.propTypes = {
  promotedGenres: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    images: PropTypes.objectOf(PropTypes.string),
    colour: PropTypes.string,
  })).isRequired,
};

export default PromotedGenres;
