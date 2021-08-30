import Browse, { fetchData } from 'page-components/Browse';

export async function getServerSideProps() {
  const {
    heroContents,
    promotedStations,
  } = await fetchData();
  return {
    props: {
      heroContents,
      promotedStations,
    }, // will be passed to the page component as props
  };
}

export default Browse;
