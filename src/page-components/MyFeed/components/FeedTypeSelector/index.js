import React from 'react';
import { func, number } from 'prop-types';
import { Flex } from 'components/Grid';
import Selector from './components/Selector';

const FeedTypeSelector = ({ setSelectedOption, selectedOption }) => (
  <Flex
    width={[1, 1, 1 / 3]}
    flexDirection={['row', 'row', 'column']}
    flexWrap="wrap"
  >
    <Selector
      index={0}
      setSelectedOption={setSelectedOption}
      selectedOption={selectedOption}
      title="Daily Feed"
      description="The latest episodes from your favourites"
    />
    <Selector
      index={1}
      setSelectedOption={setSelectedOption}
      selectedOption={selectedOption}
      title="Live Stations"
      description="Live streams from your favourite stations"
    />
  </Flex>
);

FeedTypeSelector.propTypes = {
  setSelectedOption: func.isRequired,
  selectedOption: number.isRequired,
};

export default FeedTypeSelector;
