import { arrayOf, func, shape, string } from 'prop-types';
import { useRouter } from 'next/router';
import React from 'react';
import ShowCard from 'components/Card/ShowCard';
import Slider from 'components/Slider';
import get from 'lodash/get';

const CarouselWrapper = ({ dataTest, shows = [], handleClick }) => {
  const router = useRouter();
  return (
    <Slider
      cardSize="l"
      noDivider
    >
      { shows.length && shows.map((show, i) => {
        const imageUrl = get(show.images, 'logoLarge', null);
        const backgroundColour = get(show, 'backgroundColour', null);
        const updatePage = () => {
          router.push(show.slug);
          handleClick();
        };
        return (
          <ShowCard
            key={show?.slug}
            title={show?.name}
            subTitle={show?.description}
            imageUrl={imageUrl}
            colour={backgroundColour}
            dataTest={dataTest}
            index={i}
            onClick={updatePage}
          />
        );
      })}
    </Slider>
  );
};

CarouselWrapper.propTypes = {
  shows: arrayOf(
    shape({
      name: string,
      slug: string,
      description: string,
      colourDark: string,
      images: shape({
        squareLarge: shape({
          url: string,
        }),
      }),
    })
  ),
  handleClick: func.isRequired,
  dataTest: string,
};

CarouselWrapper.defaultProps = {
  shows: [],
  dataTest: '',
};

export default CarouselWrapper;
