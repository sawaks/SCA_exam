import Footer from 'components/Footer';
import useRouterServer from 'utilities/helpers/useRouterServer';
import { Container } from 'components/Grid';
import Page from 'components/Layout/Page';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getCategories } from 'utilities/api/graphql/categories/queryMethods';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import styled from 'styled-components';
import screen from 'styles/helpers/media';

import { LISTNR_META } from 'utilities/constants';
import nameRoutes from 'common/named-routes';
import BackgroundImage from './components/BackgroundImage';
import CategoriesContainer from './components/CategoryContainer';

const StyledContainer = styled(Container)`
  padding: 0;

  ${screen.sm} {
    padding: 12px;
  }
`;

function Category({ categoryData }) {
  const [order, setOrder] = useState('');
  const [category, setCategory] = useState(categoryData);

  useEffect(() => {
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.categoryPage,
    });
  }, []);

  const {
    id,
    slug,
    name,
    colour: backgroundColor,
    description,
    images,
    shows,
  } = category || {};

  const getData = async () => {
    if (!isEmpty(category)) {
      setCategory(get(await getCategories([slug], order), 'categories[0]', null));
    }
  };

  useEffect(() => {
    getData();
  }, [order]);

  const backgroundImage = images?.squareLarge?.url;

  if (isEmpty(category) || !category) {
    useRouterServer(nameRoutes.external.error404);
    return null;
  }

  return (
    <Page withNavDesktopOnly withAudio withNav fullWidthBg={BackgroundImage} backgroundImage={backgroundImage} backgroundColor={backgroundColor}>
      <StyledContainer>
        <div>
          <Head>
            <title>{`${category.name} Podcasts | ${LISTNR_META.brandName}`}</title>
            <meta name="title" content={`${category.name} Podcasts | ${LISTNR_META.brandName}`} />
            {/* eslint-disable no-nested-ternary */}
            <meta
              name="description"
              content={
                category.shows?.length >= 3
                  ? (`Listnr - ${category.name} Podcasts - incl.
                            ${shows.slice(0, 1).map(show => show.name)}, ${shows.slice(1, 2).map(show => show.name)}
                            and ${shows.slice(2, 3).map(podcast => podcast.name)}.`)
                  : shows?.length === 2
                    ? (`Listnr - ${name} Podcasts - incl.
                              ${shows.slice(0, 1).map(show => show.name)} and ${shows.slice(1, 2).map(show => show.name)}.`)
                    : (`Listnr - ${name} Podcasts - incl. ${shows?.map(show => show.name)}.`)
              }
            />
          </Head>
          <CategoriesContainer id={id} slug={slug} shows={shows} name={name} description={description} setOrder={setOrder} />
        </div>
        <Footer />
      </StyledContainer>
    </Page>
  );
}

Category.getInitialProps = async ({ query: { slug } }, order = '') => {
  const categoryContents = get(await getCategories([slug.toLowerCase()], order), 'categories', null);
  const categoryData = categoryContents[0];
  return {
    categoryData,
  };
};

Category.propTypes = {
  categoryData: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
    name: PropTypes.string,
    colour: PropTypes.string,
    images: PropTypes.shape({
      backgroundLarge: PropTypes.shape({ url: PropTypes.string }),
    }),
    shows: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      slug: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      images: PropTypes.shape({
        squareLarge: PropTypes.shape({ url: PropTypes.string }),
      }),
    })),
  }),
};

Category.defaultProps = {
  categoryData: {},
};

export default Category;

