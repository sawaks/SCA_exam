/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import routes from 'common/named-routes';
import { Flex } from 'components/Grid';
import Link from 'next/link';
import Slider from 'components/Slider';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import isEmpty from 'lodash/isEmpty';
import { getYouMighLike } from 'utilities/api/graphql/shows/queryMethods';
import ShowCard from 'components/Card/ShowCard';
import Loading from 'components/Loading';

function YouMightLikeSlider({ title }) {
  const [loading, setLoading] = useState(true);
  const [youMightLikeShowsData, setYouMightLikeShowsData] = useState([]);
  const favouriteShows = useSelector(state => state.userSessionInfo.favouriteShows, shallowEqual);

  useEffect(() => {
    const getData = async () => {
      const favShowsArray = Object.keys(favouriteShows).map(key => favouriteShows[key].id);
      const returnedData = await getYouMighLike(favShowsArray);
      const { youMightLikeShows } = returnedData;
      setYouMightLikeShowsData(youMightLikeShows);
      setLoading(false);
    };
    if (!isEmpty(favouriteShows)) getData();
  }, [favouriteShows]);

  return (
    <>
      {youMightLikeShowsData && youMightLikeShowsData?.length !== 0
      && (
        <Loading
          loading={loading}
          render={() => (
            <CarouselWrapper>
              <Slider title={title}>
                {youMightLikeShowsData?.map((podcast, i) => (
                  <div key={podcast.slug}>
                    <Link href={`${routes.external.podcasts}/${podcast.slug}`}>
                      <Flex width={['171px', '171px', '272px']}>
                        <ShowCard
                          title={podcast.name}
                          subTitle={podcast.teaser || podcast.description}
                          imageUrl={podcast.images.squareLarge.url}
                          tags={podcast.playlistCategories}
                          index={i}
                          dataTest="library-suggestion"
                        />
                      </Flex>
                    </Link>
                  </div>
                ))}
              </Slider>
            </CarouselWrapper>
          )}
        />
      )
    }
    </>
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

YouMightLikeSlider.propTypes = {
  title: PropTypes.string.isRequired,
};

export default YouMightLikeSlider;
