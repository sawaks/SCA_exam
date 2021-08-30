import More from 'page-components/StationsMore';
import { getRelatedStationsBySlug } from 'utilities/api/graphql/stations/queryMethods';

export async function getServerSideProps({ query }) {
  const { station: slug } = query;
  const { station } = await getRelatedStationsBySlug(slug);

  return { props: { station },
  };
}

export default More;
