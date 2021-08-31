import Button from 'shared-components/Button';
import DropdownButton from 'shared-components/DropdownButton';
import FilterIcon from 'shared-components/Icons/filter-list.svg';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const options = [
  {
    name: 'Sort A-Z',
    key: 'asc',
  },
  {
    name: 'Sort Z-A',
    key: 'desc',
  },
];
const DropDownIcon = styled(FilterIcon)`
    width: 24px;
`;

const StyledButton = styled.div`
width: inherit;
   button {
    border :none;
    border-radius: 0px;
    background: transparent;
   }
`;

function FilterButton({ setOrder }) {
  return (
    <DropdownButton
      variant="secondary"
      text=""
      mobileText=""
      icon={<DropDownIcon />}
      id="category-filter-button"
      minWidthDesktop="40px"
      minWidthMobile="40px"
      offsetX="16px"
      offsetY="-86px"
      boxWidth="150px"
      mobileOffsetY="-86px"
      mobileOffsetX="16px"
      mobileBoxWidth="130px"
      setIconRight
    >
      {options.map(item => (
        <StyledButton key={item.key}>
          <Button
            as="button"
            variant="secondary"
            text={item.name}
            minWidthDesktop="0"
            key={item.key}
            onClick={() => setOrder(item.key)}
          />
        </StyledButton>
      ))}
    </DropdownButton>
  );
}

FilterButton.propTypes = {
  setOrder: PropTypes.func.isRequired,
};

export default FilterButton;
