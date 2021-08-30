import React, { useState, useEffect, useRef } from 'react';
import get from 'lodash/get';
import styled from 'styled-components';
import useDebounce from 'utilities/helpers/useDebounce';
import { getAutoComplete } from 'utilities/api/graphql/search/queryMethods';
import screen from 'styles/helpers/media';
import { useRouter } from 'next/router';
import nameRoutes from 'common/named-routes';
import SearchSuggestions from './components/SearchSuggestions';
import Icon from './assets/search-icon.svg';

const SearchWrapper = styled.div`
  width: 100%;
  ${screen.sm} {
    margin-left: auto;
    align-self: center;
    position: relative;
    max-width: 340px;
  }
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-radius: 25px;
  border: solid 1px rgba(255, 255, 255, 0.31);
  background-color: ${props => (props.focusmode ? props.theme.light : 'rgba(255, 255, 255, 0.13)')};
  padding: 0px 7px 0 10px;
  ${screen.sm} {
    height: 46px;
    padding: 0px 10px 0 14px;
  }
`;

const Input = styled.input`
  background-color: transparent;
  width: 80%;
  color: ${props => (props.focusMode ? props.theme.light : props.theme.dark)};
  appearance: none;
  border: 0;
  font-size: 16px;
  caret-color: ${props => props.theme.primary};
  &::placeholder {
    color: ${props => props.theme.light};
    opacity: 0.5;
  }
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
  &:hover,
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background-color: transparent;
  border: none;
`;

const SearchLogo = styled(Icon)`
  fill: ${props => (props.focusMode ? props.theme.dark : props.theme.light)};
  ${screen.md} {
    width: 22px;
    height: 22px;
  }
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [focusMode, setFocusMode] = useState(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const textInput = useRef(null);
  const suggestionsBox = useRef(null);

  const router = useRouter();

  const handleChange = (val) => {
    setSearchTerm(val);
    setFocusMode(!!val);
  };

  const handleClick = (e) => {
    const focus = e.target === textInput.current;
    setFocusMode(focus || searchTerm);
    // setTimeout here because we need a very short delay so that the link in SearchSuggestions can fire.
    // I've stuck with it because it's better than watching Next's router.
    setTimeout(() => {
      setSuggestionsVisible(e.target === suggestionsBox.current || focus);
    }, 200);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const getSuggestions = async () => {
    const res = await getAutoComplete(searchTerm);
    const suggestions = get(res, 'searchSuggestions', []);
    setSearchResults(suggestions);
    setSuggestionsVisible(true);
  };

  useEffect(() => {
    // Need to handle focus events for input and suggestions
    document.addEventListener('mousedown', handleClick);
    if (searchTerm) {
      getSuggestions();
    } else {
      setSearchResults([]);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [debouncedSearchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: `${nameRoutes.external.search}`,
      query: { q: searchTerm },
    });
  };

  return (
    <SearchWrapper>
      <SearchForm focusmode={focusMode} onSubmit={handleSubmit}>
        <Input
          ref={textInput}
          placeholder="Search catalogue"
          value={searchTerm}
          onChange={e => handleChange(e.target.value)}
        />
        <SearchButton>
          <SearchLogo focusMode={focusMode} />
        </SearchButton>
      </SearchForm>
      {searchResults.length > 0 && suggestionsVisible && (
        <SearchSuggestions
          ref={suggestionsBox}
          searchResults={searchResults}
          searchTerm={searchTerm}
        />
      )}
    </SearchWrapper>
  );
};

export default SearchBar;
