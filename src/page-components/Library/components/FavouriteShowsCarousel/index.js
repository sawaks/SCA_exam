import routes from 'common/named-routes';
import ShowCard from 'components/Card/ShowCard';
import Slider from 'components/Slider';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { getShows } from 'utilities/api/graphql/shows/queryMethods';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

function FavouriteShowsCarousel() {
  const [shows, setShows] = useState(null);
  const firebaseShows = useSelector(({ profile, userSessionInfo }) => (profile.userId ? userSessionInfo.favouriteShows : null), shallowEqual);

  const sortByMostRecentEpisode = (a, b) => {
    const episodeAPublishedDate = a?.episodes?.items[0]?.publishedUtc;
    const episodeBPublishedDate = b?.episodes?.items[0]?.publishedUtc;

    if (moment(episodeAPublishedDate).isAfter(episodeBPublishedDate)) {
      return -1;
    }
    return 1;
  };

  const numberOfNewEpisodes = (episodes, lastSeen) => episodes.filter(item => moment(item.publishedUtc).isAfter(lastSeen)).length;

  const transform = (show) => {
    const getEpisodes = show?.episodes?.items;
    const lastSeen = firebaseShows?.[show.id]?.lastSeen;
    return {
      ...show,
      ...(getEpisodes && { newEpisodes: numberOfNewEpisodes(getEpisodes, lastSeen) }),
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      if (firebaseShows && !isEmpty(firebaseShows)) {
        const result = await getShows(Object.keys(firebaseShows).map(key => firebaseShows[key].id));
        const getShowResults = result?.shows;
        if (getShowResults) {
          const showsTransformed = getShowResults.sort(sortByMostRecentEpisode).map(transform);
          setShows(showsTransformed);
        }
      }
    };
    fetchData();
  }, [firebaseShows]);

  if (!shows) {
    return null;
  }

  return (
    <CarouselWrapper>
      <Slider title="Favourited Shows">
        {shows.map((show, i) => (
          <div key={show.id}>
            <Link
              href={`${routes.external.podcasts}/${show.slug}`}
            >
              <a>
                <ShowCard
                  title={show.name}
                  subTitle={show.description}
                  imageUrl={show.images.squareLarge.url}
                  count={show.showType === 'timely' ? 0 : show.newEpisodes}
                  onClick={() => addToDataLayer({
                    event: gtm.libraryFavShowClick,
                    TilePosition: i + 1,
                    Category: get(show, 'categories[0].name', null),
                    PodcastName: get(show, 'name', null),
                  })}
                  index={i}
                  dataTest="library-show"
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
  max-height: 310px;

  ${screen.sm}{
    margin-bottom: 50px;
  }

  ${screen.md}{
    margin-bottom: 162px;
  }
`;

export default FavouriteShowsCarousel;
