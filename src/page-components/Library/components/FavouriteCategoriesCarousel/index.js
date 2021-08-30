import routes from 'common/named-routes';
import CategoryCard from 'components/Card/CategoryCard';
import { Box } from 'components/Grid';
import Slider from 'components/Slider';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import spacing from 'styles/helpers/spacing';
import { getCategories } from 'utilities/api/graphql/categories/queryMethods';
import addToDataLayer from 'utilities/helpers/dataLayer';
import gtm from 'utilities/GTM/gtmTags';

function FavouriteCategoriesCarousel() {
  const [categories, setCategories] = useState(null);
  const firebaseCategories = useSelector(({ profile, userSessionInfo }) => (profile.userId ? userSessionInfo.favouriteCategories : null), shallowEqual);

  useEffect(() => {
    const fetchData = async () => {
      if (firebaseCategories && firebaseCategories.length > 0) {
        const result = await getCategories(firebaseCategories.map(item => item.slug), 'desc');
        setCategories(result?.categories);
      }
    };
    fetchData();
  }, [firebaseCategories]);

  if (!categories) {
    return null;
  }

  return (
    (categories.length > 0
      && (
      <Slider title="Favourited Categories">
        {categories.map((category, index) => (
          <Box key={category.slug} px={spacing.s}>
            <Link
              href={`${routes.external.category}/${category.slug}`}
            >
              <a>
                <CategoryCard
                  bg={category?.colour}
                  heading={category?.name}
                  image={category?.images?.squareMedium?.url}
                  onClick={() => addToDataLayer({
                    event: gtm.libraryFavCategoryClick,
                    TilePosition: index + 1,
                    Category: category?.name,
                  })}
                  data-test="library-categories"
                />
              </a>
            </Link>
          </Box>
        ))}
      </Slider>
      ))
  );
}

export default FavouriteCategoriesCarousel;
