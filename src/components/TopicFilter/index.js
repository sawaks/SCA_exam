import Button from 'components/Button';
import DropdownButton from 'components/DropdownButton';
import { Flex } from 'components/Grid';
import FilterIcon from 'components/Icons/filter-list.svg';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/screen';
import zIndex from 'styles/helpers/zIndex';

const StyledFilterContainer = styled(Flex)`
  width: 100%;
  position: relative;
`;

const StyledDropDown = styled(Flex)`
   position: absolute;
   top: 12px;
   right: 0;
   border-radius: 100%;
   width: 40px;
   height: 40px;
   background-color: ${props => props.theme.backgroundLight};
   z-index: ${zIndex.socialPopup};
   display: flex;
   align-items: center;
   justify-content: center;

  ${screen.tablet} {
    width: 44px;
    height: 44px;
  }

  svg {
    user-select: none;
  }
`;

const StyledButton = styled.div`
   button {
    border :none;
    border-radius: 0px;
    background: transparent;
    display:flex;
   }
`;

function TopicFilter({ children, options, onSelectionChange, dropdownButtonId }) {
  return (
    <StyledFilterContainer flexDirection="row" flexWrap="wrap">
      <StyledDropDown justifyContent="center" alignItems="center">
        <DropdownButton
          text=""
          variant="secondary"
          icon={<FilterIcon />}
          id={dropdownButtonId}
          minWidthDesktop="40px"
          minWidthMobile="40px"
          offsetX="15px"
          offsetY="-85px"
          boxWidth="150px"
          mobileBoxWidth="138px"
          mobileOffsetY="-85px"
          mobileOffsetX="18px"
        >
          {/* In addtion with 'View Latest' and 'View oldest', AIM added 'downloaded' and 'unplayed' options in the mobile app but they won't be available in the web app.
  therefore we only show first two options in the web app hence we are slicing first two options to show in the dropdown menu */}
          {options.slice(0, 2).map(item => (
            <StyledButton key={item.key}>
              <Button
                as="button"
                text={item.name}
                variant="secondary"
                minWidthDesktop="150px"
                key={item.name}
                onClick={() => onSelectionChange(item)}
              />
            </StyledButton>
          ))
          }
        </DropdownButton>
      </StyledDropDown>
      {children}
    </StyledFilterContainer>
  );
}

TopicFilter.propTypes = {
  children: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string,
    query: PropTypes.string,
  })).isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  dropdownButtonId: PropTypes.string,
};

TopicFilter.defaultProps = {
  children: null,
  dropdownButtonId: `filter-${Math.random().toString(36).substr(2, 9)}`,
};
export default TopicFilter;
