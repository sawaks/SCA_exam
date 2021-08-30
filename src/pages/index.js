import Home from 'page-components/Home';
import { getPage } from 'utilities/api/graphql/page/queryMethods';

export const getServerSideProps = async () => {
  const { page } = await getPage('home');
  return {
    props: {
      title: page.title,
      meta: page.meta,
      contentBlocks: page.contentBlocks,
    },
  };
};

export default Home;
