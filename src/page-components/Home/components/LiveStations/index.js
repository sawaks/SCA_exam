import routes from 'common/named-routes';
import ShowCard from 'components/Card/ShowCard';
import Slider from 'components/Slider';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

function LiveStations({ promotedStations }) {
  return (
    <>
      <Slider
        title="Live stations to try"
      >
        {promotedStations.map((station) => {
          const imageUrl = station?.images?.logoLarge;
          return (
            <Link href={`${routes.external.stations}/${station.slug}`} key={station.slug}>
              <a>
                <ShowCard
                  colour={station?.backgroundColour}
                  title={station?.name}
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

LiveStations.propTypes = {
  promotedStations: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    slug: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

export default LiveStations;
