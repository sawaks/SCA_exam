import Home from 'page-components/Home';
import { getPromotedCategories } from 'integration/graphql/categories/query-methods';

export const getServerSideProps = async () => {
  const [promotedCategories] = await Promise.all([
    getPromotedCategories(),
  ]);

  return {
    props: {
      promotedCategories: promotedCategories?.promotedCategories,
      downloadAppBanner: {},
    },
  };
};

export default Home;
