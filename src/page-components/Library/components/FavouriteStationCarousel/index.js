import ShowCard from 'components/Card/ShowCard';
import Slider from 'components/Slider';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { getStations } from 'utilities/api/graphql/stations/queryMethods';
import spacing from 'styles/helpers/spacing';

import styled from 'styled-components';
import screen from 'styles/helpers/media';
import isEmpty from 'lodash/isEmpty';

function FavouriteStationCarousel() {
  const [stations, setStations] = useState(null);
  const firebaseFavStations = useSelector(({ profile, userSessionInfo }) => (profile.userId ? userSessionInfo.favouriteStations : null), shallowEqual);

  useEffect(() => {
    const fetchStation = async () => {
      const result = !isEmpty(firebaseFavStations) && await getStations(Object.keys(firebaseFavStations));
      const stationList = result?.stations;
      setStations(stationList);
    };
    fetchStation();
  }, [firebaseFavStations]);

  if (!stations) {
    return null;
  }

  return (
    <CarouselWrapper>
      <Slider title="Favourited Stations">
        {stations.length > 0 && stations.map((station, i) => (
          <div key={station.name}>
            <Link
              href={`stations/${station.slug}`}
            >
              <a>
                <ShowCard
                  title={station.name}
                  subTitle={station.description}
                  imageUrl={station?.images?.logoLarge}
                  colour={station?.backgroundColour}
                  dataTest="library-favourited-station"
                  index={i}
                />
              </a>
            </Link>
          </div>
        ))}
      </Slider>
    </CarouselWrapper>
  );
}

const CarouselWrapper = styled.div`
  margin-bottom: ${spacing.l};

  ${screen.md}{
    margin-bottom: ${spacing.xl};
  }
`;

export default FavouriteStationCarousel;
