import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { getGenreBySlug } from 'utilities/api/graphql/genres/queryMethods';
import Slider from 'components/Slider';
import { Box } from 'components/Grid';
import spacing from 'styles/helpers/spacing';
import routes from 'common/named-routes';
import Link from 'next/link';
import CategoryCard from 'components/Card/CategoryCard';

const FavouriteGenresCarousel = () => {
  const [genres, setGenres] = useState(null);
  const firebaseGenres = useSelector(({ profile, userSessionInfo }) => (profile.userId ? userSessionInfo.favouriteGenres : null), shallowEqual);

  useEffect(() => {
    const fetchData = async () => {
      if (firebaseGenres && firebaseGenres.length > 0) {
        const result = await getGenreBySlug(firebaseGenres.map(item => item.slug), 'desc');
        setGenres(result.genres);
      }
    };
    fetchData();
  }, [firebaseGenres]);

  if (!genres) {
    return null;
  }

  return (
    (genres.length > 0
      && (
      <Slider title="Favourited Genres">
        {genres.map(genre => (
          <Box key={genre.slug} px={spacing.s}>
            <Link href={`${routes.external.genre}/${genre.slug}`}>
              <a>
                <CategoryCard
                  heading={genre?.name}
                  image={genre?.images?.squareLarge}
                  data-test="library-favourited-genres"
                />
              </a>
            </Link>
          </Box>
        ))}
      </Slider>
      )
    ));
};

export default FavouriteGenresCarousel;
