import { string, arrayOf } from 'prop-types';
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';
import Highlighter from 'react-highlight-words';
import nameRoutes from '../../../../common/named-routes';

const SearchSuggestions = forwardRef(({ searchResults, searchTerm }, ref) => (
  <Suggestions ref={ref}>
    {searchResults.map(suggestion => (
      <Suggestion key={suggestion}>
        <SearchLink href={`${nameRoutes.external.search}?q=${suggestion}`}>
          <StyledHighlighter
            searchWords={searchTerm.split(' ')}
            autoEscape
            textToHighlight={suggestion}
          />
        </SearchLink>
      </Suggestion>
    ))}
  </Suggestions>
));

const StyledHighlighter = styled(Highlighter)`
  mark {
    color: ${props => props.theme.primary};
    background-color: transparent;
  }
`;

const SearchLink = styled(Link)`
  cursor: pointer;
`;

const Suggestions = styled.div`
  position: absolute;
  top: 56px;
  left: ${spacing.s};
  right: ${spacing.s};
  width: calc(100% - (${spacing.s}*2));
  border-radius: 25px;
  border: solid 1px rgba(255, 255, 255, 0.3);
  background-color: ${props => props.theme.backgroundLight};
  text-transform: none;
  font-weight: normal;
  letter-spacing: normal;
  cursor: pointer;
  ${screen.sm} {
    top: 50px;
    padding: 0 20px;
    width: 100%;
    left: 0;
    right: 0;
  }
`;

const Suggestion = styled.div`
  margin: ${spacing.l} 40px ${spacing.l} 66px;
  ${screen.sm} {
    margin: ${spacing.l} 0;
  }
`;

SearchSuggestions.propTypes = {
  searchResults: arrayOf(string.isRequired).isRequired,
  searchTerm: string.isRequired,
};

SearchSuggestions.displayName = 'SearchSuggestions';

export default SearchSuggestions;
