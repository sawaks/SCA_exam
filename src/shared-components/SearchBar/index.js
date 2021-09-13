import React, { useRef } from 'react';
import styled from 'styled-components';
import screen from 'src/styling/screen';
import Icon from 'shared-components/Icons/SearchIcon';

const SearchWrapper = styled.div`
  width: 100%;
  ${screen.mobile} {
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
  background-color: rgba(255, 255, 255, 0.13);
  padding: 0px 7px 0 10px;
  ${screen.mobile} {
    height: 46px;
    padding: 0px 10px 0 14px;
  }
`;

const Input = styled.input`
  background-color: transparent;
  width: 80%;
  color: ${props => props.theme.dark};
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
  ${screen.tablet} {
    width: 22px;
    height: 22px;
  }
`;

const SearchBar = () => {
  const textInput = useRef(null);

  return (
    <SearchWrapper>
      <SearchForm>
        <Input
          ref={textInput}
          placeholder="Search catalogue"
        />
        <SearchButton>
          <SearchLogo />
        </SearchButton>
      </SearchForm>
    </SearchWrapper>
  );
};

export default SearchBar;
