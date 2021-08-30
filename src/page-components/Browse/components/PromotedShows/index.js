import routes from 'common/named-routes';
import ShowCard from 'components/Card/ShowCard';
import Slider from 'components/Slider';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

function PromotedShows({ promotedShows }) {
  return (
    <>
      <Slider
        title="Latest Podcast Releases"
      >
        {promotedShows.map((show) => {
          const imageUrl = show?.images?.squareLarge?.url;
          return (
            <Link href={`${routes.external.podcasts}/${show.slug}`} key={show.id}>
              <a>
                <ShowCard
                  title={show?.name}
                  subTitle={show?.description}
                  imageUrl={imageUrl}
                />
              </a>
            </Link>
          );
        })}
      </Slider>
    </>
  );
}

PromotedShows.propTypes = {

  promotedShows: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

export default PromotedShows;
