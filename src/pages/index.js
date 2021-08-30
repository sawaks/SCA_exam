import Home from 'page-components/Home';
import { getPromotedCategories } from '../utilities/api/graphql/categories/queryMethods';
import { getPromotedStations } from '../utilities/api/graphql/stations/queryMethods';
import { getPage } from '../utilities/api/graphql/page/queryMethods';

export const getServerSideProps = async () => {
  const [promotedCategories, promotedStations, { page: { contentBlocks } }] = await Promise.all([
    getPromotedCategories(),
    getPromotedStations(),
    getPage('download-block'),
  ]);

  return {
    props: {
      promotedCategories: promotedCategories?.promotedCategories,
      promotedStations: promotedStations?.promotedStations,
      downloadAppBanner: contentBlocks[0]?.blockData,
    },
  };
};

export default Home;
