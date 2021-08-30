import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

/**
 * FixContentBlock
 * @description A helper function to fixed the style position of the children when the player overlay is visible.
 * This ensure the wrapper component is not scrollable when the user scrolls the player overlay.
 * Used on station and catchup pages.
 * @param {nodes} children
 * @param {boolean} visible
 */
const FixContentBlock = styled.div`
  ${props => props.playerOverlayVisible && css`
      overflow: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
  `}
`;

FixContentBlock.propTypes = {
  children: PropTypes.node.isRequired,
  playerOverlayVisible: PropTypes.bool.isRequired,
};

export default FixContentBlock;
