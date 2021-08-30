import HeartAddIcon from 'components/Icons/favourite-add.svg';
import HeartIcon from 'components/Icons/favourite.svg';
import { Desktop, Mobile } from 'components/Screen';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';

import Button from '../Button';

function FavouriteButton({ onFavouriteClick, onUnfavouriteClick, isFav, isMobile, ...props }) {
  const handleClick = () => {
    if (!isFav) {
      if (onFavouriteClick) {
        onFavouriteClick();
      }
    } else if (onUnfavouriteClick) {
      onUnfavouriteClick();
    }
  };

  return (
    <StyledButton>
      <Desktop>
        <Button
          variant="secondary"
          text={isFav ? 'Favourited' : 'Add Favourite'}
          maxWidthDesktop="311px"
          minWidthDesktop="170px"
          minWidthMobile="165px"
          icon={isFav ? <HeartIcon /> : <StyledHeartAddIcon />}
          iconHighlighted={isFav}
          onClick={handleClick}
          {...props}
        />
      </Desktop>
      <Mobile>
        <Button
          variant="secondary"
          text={isFav ? 'Favourited' : 'Favourite'}
          minWidthMobile="165px"
          icon={isFav ? <HeartIcon /> : <StyledHeartAddIcon />}
          iconHighlighted={isFav}
          onClick={handleClick}
          {...props}
        />
      </Mobile>
    </StyledButton>
  );
}

// Override button height as Fav button is unique.
const StyledButton = styled.div`
  width: inherit;
  button {
    padding: 0 2px;
    ${screen.md} {
      height: 44px;
      line-height: 44px;
      border-radius: 24px;
      span {
        margin-left: ${spacing.m};
      }
    }
  }
`;

// Override icon spacing as Fav button is unique.
const StyledHeartAddIcon = styled(HeartAddIcon)`
  margin-left: 10px !important;
`;

FavouriteButton.propTypes = {
  onFavouriteClick: PropTypes.func,
  onUnfavouriteClick: PropTypes.func,
  isFav: PropTypes.bool,
  isMobile: PropTypes.bool,
};

FavouriteButton.defaultProps = {
  onUnfavouriteClick: null,
  onFavouriteClick: null,
  isFav: false,
  isMobile: false,
};

export default FavouriteButton;
