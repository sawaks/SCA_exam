import Home from 'page-components/Home';
import { getPromotedCategories } from 'integration/graphql/categories/query-methods';
import { getPage } from 'integration/graphql/page/queryMethods';

export const getServerSideProps = async () => {
  const [promotedCategories, { page: { contentBlocks } }] = await Promise.all([
    getPromotedCategories(),
    getPage('download-block'),
  ]);

  return {
    props: {
      promotedCategories: promotedCategories?.promotedCategories,
      downloadAppBanner: contentBlocks[0]?.blockData,
    },
  };
};

export default Home;
