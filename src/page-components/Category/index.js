import Footer from 'shared-components/Footer';
import Head from 'next/head';
import Page from 'shared-components/Layout/Page';
import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import routes from 'routes';
import screen from 'src/styling/screen';
import styled from 'styled-components';
import { Container } from 'shared-components/Grid';
import { LISTNR_META } from 'utilities/constants';
import { getCategories } from 'integration/graphql/categories/query-methods';
import CategoriesContainer from './components/CategorySection';
import useRouterServer from '../../hooks/useRouterServer';

const StyledContainer = styled(Container)`
  padding: 0;

  ${screen.mobile} {
    padding: 12px;
  }
`;

function Category({ categoryData }) {
  const {
    name,
    colour: backgroundColor,
    description,
    images,
    shows,
  } = categoryData || {};

  const backgroundImage = images?.squareLarge?.url;

  if (isEmpty(categoryData)) {
    useRouterServer(routes.error404);
    return null;
  }

  return (
    <Page withNav backgroundImage={backgroundImage} backgroundColor={backgroundColor}>
      <StyledContainer>
        <div>
          <Head>
            <title>{`${name} Podcasts | ${LISTNR_META.brandName}`}</title>
            <meta name="title" content={`${name} Podcasts | ${LISTNR_META.brandName}`} />
            <meta name="description" content={`Listnr - ${name} Podcasts.`} />
          </Head>
          <CategoriesContainer shows={shows} name={name} description={description} />
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

