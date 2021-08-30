import routes from 'common/named-routes';
import ShowCard from 'components/Card/ShowCard';
import Slider from 'components/Slider';
import get from 'lodash/get';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

function CategoryCarousel({ category: { name, slug, shows } }) {
  return (
    <>
      <Slider
        title={name}
        viewAll={{
          href: `${routes.external.category}/${slug}`,
          as: `${routes.external.category}/${slug}`,
        }}
      >
        {shows.map((show, i) => {
          const imageUrl = get(show.images.squareLarge, 'url', null);
          return (
            <Link href={`${routes.external.podcasts}/${show.slug}`} key={show.id}>
              <ShowCard
                title={show?.name}
                subTitle={show?.description}
                imageUrl={imageUrl}
                colour={show?.colourDark}
                onClick={() => addToDataLayer({
                  event: gtm.onBrowsePageCategoryShow,
                  carouselCardIndex: i,
                  carouselName: name,
                  carouselCardName: show?.name,
                })}
              />
            </Link>
          );
        })}
      </Slider>
    </>
  );
}

CategoryCarousel.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default CategoryCarousel;
