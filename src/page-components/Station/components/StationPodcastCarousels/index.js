import { arrayOf, shape, string } from 'prop-types';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import routes from 'common/named-routes';
import ShowCard from 'components/Card/ShowCard';
import Slider from 'components/Slider';
import get from 'lodash/get';
import Link from 'next/link';
import usePrevious from 'utilities/helpers/usePrevious';
import Divider from 'components/Divider';
import Heading from 'components/Slider/Heading';
import CarouselWrapper from './components/CarouselWrapper';

const StationPodcastCarousels = ({ carouselType, title, dataTest, shows = [] }) => {
  const router = useRouter();
  const { station: slug } = router.query;
  const [integer, setInteger] = useState(0);
  const handleClick = () => {
    setInteger(integer + 1);
  };
  const updateCarousel = usePrevious(integer);
  return (
    <>
      {carouselType === 'station' ? (
        <OuterCarouselWrapper>
          <Heading
            title={title}
            viewAll={{
              href: `/stations/${slug}/more`,
              as: `/stations/${slug}/more`,
            }}
          />
          <Divider />
          {(integer === 0 || integer === updateCarousel) && (
            <CarouselWrapper
              carouselType={carouselType}
              title={title}
              dataTest={dataTest}
              shows={shows}
              handleClick={handleClick}
            />
          )
          }
        </OuterCarouselWrapper>
      )
        : (
          <Slider
            title={title}
            cardSize="l"
          >
            { shows.length && shows.map((show, i) => {
              const imageUrl = get(show.images.squareLarge, 'url', null);
              const backgroundColour = get(show, 'colourDark', null);
              return (
                <Link href={`${routes.external.podcasts}/${show.slug}`} key={show.slug}>
                  <a>
                    <ShowCard
                      title={show?.name}
                      subTitle={show?.description}
                      imageUrl={imageUrl}
                      colour={backgroundColour}
                      dataTest={dataTest}
                      index={i}
                    />
                  </a>
                </Link>
              );
            })}
          </Slider>
        )
      }
    </>
  );
};

const OuterCarouselWrapper = styled.div`
  min-height: 337px;
  ${screen.md}{
    min-height: 478px;
  }
`;

StationPodcastCarousels.propTypes = {
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
  title: string.isRequired,
  carouselType: string,
  dataTest: string,
};

StationPodcastCarousels.defaultProps = {
  shows: [],
  carouselType: '',
  dataTest: '',
};

export default StationPodcastCarousels;
