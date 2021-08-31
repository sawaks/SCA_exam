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
import styled from 'styled-components';
import screen from 'src/styling/screen';

import { LISTNR_META } from 'utilities/constants';
import routes from 'common/routes';
import CategoriesContainer from './components/CategoryContainer';

const StyledContainer = styled(Container)`
  padding: 0;

  ${screen.mobile} {
    padding: 12px;
  }
`;

function Category({ categoryData }) {
  const [order, setOrder] = useState('');
  const [category, setCategory] = useState(categoryData);

  const {
    id,
    slug,
    name,
    colour: backgroundColor,
    description,
    images,
    shows,
  } = category || {};

  useEffect(() => {
    const getData = async () => {
      if (!isEmpty(category)) {
        setCategory(get(await getCategories([slug], order), 'categories[0]', null));
      }
    };
    getData();
  }, [order]);

  const backgroundImage = images?.squareLarge?.url;

  if (isEmpty(category) || !category) {
    useRouterServer(routes.error404);
    return null;
  }

  return (
    <Page withNav backgroundImage={backgroundImage} backgroundColor={backgroundColor}>
      <StyledContainer>
        <div>
          <Head>
            <title>{`${category.name} Podcasts | ${LISTNR_META.brandName}`}</title>
            <meta name="title" content={`${category.name} Podcasts | ${LISTNR_META.brandName}`} />
            {/* eslint-disable no-nested-ternary */}
            <meta
              name="description"
              content={`Listnr - ${category.name} Podcasts.`}
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

