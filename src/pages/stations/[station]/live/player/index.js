import Station from 'page-components/Station';
import { getStationBySlug } from 'utilities/api/graphql/stations/queryMethods';
import { getPage } from 'utilities/api/graphql/page/queryMethods';

export async function getServerSideProps({ query }) {
  const { station: slug } = query;

  const [{ station }, { page: { contentBlocks } }] = await Promise.all([
    getStationBySlug(slug),
    getPage('download-block'),
  ]);

  return { props: { station, downloadAppBanner: contentBlocks[0]?.blockData } };
}

export default Station;
