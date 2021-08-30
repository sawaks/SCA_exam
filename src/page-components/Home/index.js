import AppBanner from 'components/AppBanner';
import FullWidthSection from 'components/Layout/FullWidthSection';
import Page from 'components/Layout/Page';
import camelCase from 'lodash/camelCase';
import Head from 'next/head';
import { arrayOf, shape, string } from 'prop-types';
import React, { useEffect } from 'react';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import Creator from './components/Creator';
import FAQ from './components/FAQ';
import Twocolcontentblock from './components/Twocolcontentblock';
import PageHero from './components/PageHero';
import PageHeroNeeds from './components/PageHeroNeeds';

const ComponentMap = {
  twoColCopyLeft: Twocolcontentblock,
  twoColCopyRight: Twocolcontentblock,
  faqs: FAQ,
  twoColCta: AppBanner,
  squareItemCarousel: Creator,
  heroOne: PageHero,
  heroTwo: PageHeroNeeds,
  default: () => <></>,
};

const Home = ({ title, meta, contentBlocks = [] }) => {
  useEffect(() => {
    addToDataLayer({
      event: gtm.onPageLoad,
      pageType: page.homePage,
    });
  }, []);

  return (
    <Page withNav withAudio withFooter>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={meta} />
      </Head>
      {contentBlocks.map((contentBlock) => {
        const { blockData } = contentBlock;
        const componentName = camelCase(blockData.blockTemplate);
        const Component = ComponentMap[componentName] || ComponentMap.default;
        return (
          <FullWidthSection
            key={blockData.blockTemplate}
            fullWidth={'faqs' || 'twoColCopyLeft' || 'twoColCopyRight' || 'squareItemCarousel'}
          >
            <Component
              {...blockData}
              componentName={componentName}
            />
          </FullWidthSection>
        );
      })}
    </Page>
  );
};

Home.propTypes = {
  title: string.isRequired,
  meta: string.isRequired,
  contentBlocks: arrayOf(shape),
};

Home.defaultProps = {
  contentBlocks: [],
};

export default Home;
