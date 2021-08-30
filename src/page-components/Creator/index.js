import Footer from 'components/Footer';
import useRouterServer from 'utilities/helpers/useRouterServer';
import { Container } from 'components/Grid';
import Page from 'components/Layout/Page';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { getCreator } from 'utilities/api/graphql/creators/queryMethods';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

import nameRoutes from 'common/named-routes';
import BackgroundImage from './components/BackgroundImage';
import ShowContainer from './components/ShowContainer';

function Creator({ creatorContents }) {
  useEffect(() => {
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.creatorPage,
    });
  }, []);

  const {
    name,
    image,
    shows,
  } = creatorContents || {};

  const fullWidthBg = BackgroundImage;
  const creatorImage = image?.url;

  if (isEmpty(creatorContents) || !name) {
    useRouterServer(nameRoutes.external.error404);
    return null;
  }

  return (
    <Page withNavDesktopOnly withAudio fullWidthBg={fullWidthBg} creatorImage={creatorImage} backgroundImageUrl={creatorImage}>
      <Container>
        <div>
          <ShowContainer shows={shows} name={name} />
        </div>
        <Footer />
      </Container>
    </Page>
  );
}

Creator.getInitialProps = async ({ query: { slug } }) => {
  const creatorContents = get(await getCreator(slug.toLowerCase()), 'creator', null);
  return {
    creatorContents,
  };
};

Creator.propTypes = {
  creatorContents: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string,
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
  }).isRequired,
};

export default Creator;

