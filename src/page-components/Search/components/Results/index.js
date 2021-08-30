import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import addToDataLayer from 'utilities/helpers/dataLayer';
import gtm from 'utilities/GTM/gtmTags';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';
import Divider from 'components/Divider';
import Paragraph from 'components/Typography/Paragraph';
import { getSearchResults } from 'utilities/api/graphql/search/queryMethods';
import PodcastResults from '../PodcastResults';
import EpisodeResults from '../EpisodeResults';
import StationResults from '../StationResults';

const Results = () => {
  const [results, setResults] = useState();
  const [search, setSearch] = useState();
  const router = useRouter();

  const getResults = async (term) => {
    const result = get(await getSearchResults(term), 'search', []) || [];
    addToDataLayer({
      event: gtm.searchTapSearchBox,
      term,
    });
    setResults(result);
  };

  useEffect(() => {
    const term = router.query.q || '';
    setSearch(term);
    getResults(term);
  }, [router]);

  const shows = get(results, 'shows', []);
  const episodes = get(results, 'episodes', []);
  const stations = get(results, 'stations', []);
  const numberOfResults = shows.length + episodes.length + stations.length;
  const headingText = `${numberOfResults} results for "${search}"`;
  return (
    <>
      <HeaderWrapper>
        {results && <Paragraph as="h1" variant="h4" style={{ lineHeight: 1.2 }} text={headingText} />}
        {results && results.length < 1 && (
        <Paragraph variant="xl2">
          Sorry, we couldn&apos;t find any results for your search
          <span role="img" aria-label="cry emoji" style={{ marginLeft: '0.5em' }}>😢</span>
        </Paragraph>
        )}
      </HeaderWrapper>
      <DivWrapper>
        <Divider />
      </DivWrapper>
      {shows.length > 0 && <PodcastResults podcasts={shows} />}
      {episodes.length > 0 && <EpisodeResults episodes={episodes} />}
      {stations.length > 0 && <StationResults stations={stations} />}
    </>
  );
};

const HeaderWrapper = styled.div`
  opacity: 0.7;
`;

const DivWrapper = styled.div`
  margin: ${spacing.m} 0 ${spacing.l} 0;
  ${screen.md} {
    margin: ${spacing.l} 0 ${spacing.xl} 0;
  }
`;

export default Results;
