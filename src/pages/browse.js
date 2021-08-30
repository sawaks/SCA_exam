import Browse, { fetchData } from 'page-components/Browse';

export async function getServerSideProps() {
  const {
    promotedCategories,
    promotedStations,
    downloadAppBanner,
  } = await fetchData();
  return {
    props: {
      promotedCategories,
      promotedStations,
      downloadAppBanner,
    }, // will be passed to the page component as props
  };
}

export default Browse;
