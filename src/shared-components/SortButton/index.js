import Button from 'shared-components/Button';
import DropdownButton from 'shared-components/DropdownButton';
import React from 'react';
import { arrayOf, shape, string, func, oneOf } from 'prop-types';
import { DropDownIcon, StyledButton } from './styled';

function SortButton({ onOptionClick, side, options }) {
  const offsetX = side === 'left' ? '16px' : '-130px';
  return (
    <DropdownButton
      variant="secondary"
      icon={<DropDownIcon />}
      id="category-filter-button"
      minWidthDesktop="40px"
      minWidthMobile="40px"
      offsetX={offsetX}
      offsetY="-86px"
      boxWidth="150px"
      width="40px"
      setIconRight
    >
      {options.map(item => (
        <StyledButton key={item.key}>
          <Button
            as="button"
            variant="secondary"
            text={item.value}
            minWidthDesktop="0"
            key={item.key}
            onClick={() => onOptionClick(item.key)}
          />
        </StyledButton>
      ))}
    </DropdownButton>
  );
}

SortButton.propTypes = {
  onOptionClick: func.isRequired,
  side: oneOf(['left', 'right']),
  options: arrayOf(
    shape({
      key: string,
      value: string,
    }),
  ).isRequired,
};

SortButton.defaultProps = {
  side: 'left',
};

export default SortButton;
