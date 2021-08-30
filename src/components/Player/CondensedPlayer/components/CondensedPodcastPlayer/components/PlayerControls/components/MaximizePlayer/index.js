import React from 'react';
import { useDispatch } from 'react-redux';
import { playerOverlayUpdateVisible } from 'store/actions/player-overlay';
import spacing from 'styles/helpers/spacing';
import styled from 'styled-components';
import UpArrowIcon from 'components/Icons/open-player.svg';

const StyledOpenPlayerIcon = styled.button`
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 32px;
  margin: 0 ${spacing.l};

  & path {
    fill: ${props => props.theme.light};
  }

  &:focus {
    outline: none;
  }
`;

function MaximizePlayer() {
  const dispatch = useDispatch();

  const handleMaximisePlayerClick = (event) => {
    event.stopPropagation();
    dispatch(playerOverlayUpdateVisible(true));
  };

  return (
    <StyledOpenPlayerIcon onClick={handleMaximisePlayerClick} title="Maximize player">
      <UpArrowIcon />
    </StyledOpenPlayerIcon>
  );
}

export default MaximizePlayer;
