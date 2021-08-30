import Footer from 'components/Footer';
import useRouterServer from 'utilities/helpers/useRouterServer';
import { Container } from 'components/Grid';
import Page from 'components/Layout/Page';
import get from 'lodash/get';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getGenreBySlug } from 'utilities/api/graphql/genres/queryMethods';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import usePrevious from 'utilities/helpers/usePrevious';
import { LISTNR_META } from 'utilities/constants';
import nameRoutes from 'common/named-routes';
import BackgroundImage from './components/BackgroundImage';
import GenreContainer from './components/GenreContainer';

const StyledContainer = styled(Container)`
  padding: 0;

  ${screen.sm} {
    padding: 12px;
  }
`;

function Genre({ genreContents }) {
  const [order, setOrder] = useState('desc');
  const [genre, setGenre] = useState(genreContents);

  const previousOrder = usePrevious(order);

  useEffect(() => {
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.genrePage,
    });
  }, []);

  const {
    slug,
    name,
    colour,
    description,
    images,
    stations,
  } = genre || {};

  const getData = async () => {
    setGenre(get(await getGenreBySlug([slug], order), 'genres[0]', null));
  };

  useEffect(() => {
    if (previousOrder && previousOrder !== order) {
      getData();
    }
  }, [order]);

  if (!genre) {
    useRouterServer(nameRoutes.external.error404);
    return null;
  }

  return (
    <Page withNavDesktopOnly withAudio withNav fullWidthBg={BackgroundImage} backgroundImage={images?.squareLarge} backgroundColor={colour}>
      <StyledContainer>
        <div>
          <Head>
            <title>{`${genre.name} Podcasts | ${LISTNR_META.brandName}`}</title>
            <meta name="title" content={`${genre.name} Podcasts | ${LISTNR_META.brandName}`} />
            {/* eslint-disable no-nested-ternary */}
            <meta
              name="description"
              content={
                genre.stations.length >= 3
                  ? (`${LISTNR_META.brandName} - ${genre.name} Podcasts - incl.
                            ${stations.slice(0, 1).map(station => station.name)}, ${stations.slice(1, 2).map(show => show.name)}
                            and ${stations.slice(2, 3).map(podcast => podcast.name)}.`)
                  : stations.length === 2
                    ? (`${LISTNR_META.brandName} - ${name} Podcasts - incl.
                              ${stations.slice(0, 1).map(show => show.name)} and ${stations.slice(1, 2).map(show => show.name)}.`)
                    : (`${LISTNR_META.brandName} - ${name} Podcasts - incl. ${stations.map(show => show.name)}.`)
              }
            />
          </Head>
          <GenreContainer slug={slug} stations={stations} name={name} description={description} setOrder={setOrder} />
        </div>
        <Footer />
      </StyledContainer>
    </Page>
  );
}

Genre.getInitialProps = async ({ query: { slug } }, order = '') => {
  const genreContents = get(await getGenreBySlug([slug.toLowerCase()], order), 'genres[0]', null);
  return {
    genreContents,
  };
};

Genre.propTypes = {
  genreContents: PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string,
    colour: PropTypes.string,
    images: PropTypes.shape({
      backgroundLarge: PropTypes.string,
    }),
    shows: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      slug: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      backgroundColour: PropTypes.string,
      images: PropTypes.shape({
        logo: PropTypes.string,
      }),
    })),
  }),
};

Genre.defaultProps = {
  genreContents: {},
};

export default Genre;

