import routes from 'common/named-routes';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import ShowCard from 'components/Card/ShowCard';
import { Container, Flex } from 'components/Grid';
import Slider from 'components/Slider';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import styled from 'styled-components';

const RelatedShowsWrapper = styled(Flex)`
  max-height: 320px;
`;

function RelatedPodcasts({ podcasts }) {
  if (!podcasts || podcasts?.length === 0) return null;

  return (
    <RelatedShowsWrapper>
      <Container>
        <Slider title="More like this" slidesToScroll={2}>
          {podcasts?.map((podcast, i) => (
            <div key={podcast.slug}>
              <Link href={`${routes.external.podcasts}/${podcast.slug}`} passHref>
                <Flex width={['171px', '171px', '272px']}>
                  <ShowCard
                    title={podcast.name}
                    subTitle={podcast.teaser || podcast.description}
                    imageUrl={podcast.images.squareLarge.url}
                    tags={podcast.playlistCategories}
                    onClick={() => addToDataLayer({
                      event: gtm.onEpisodesListingCarouselClick,
                      carouselCardIndex: i,
                      carouselName: 'More like this',
                      carouselCardName: podcast.name,
                    })}
                  />
                </Flex>
              </Link>
            </div>
          ))}
        </Slider>
      </Container>
    </RelatedShowsWrapper>
  );
}

RelatedPodcasts.propTypes = {
  podcasts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RelatedPodcasts;
