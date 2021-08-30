import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NewIcon from 'components/Icons/newTag.svg';
import ExplicitIcon from 'components/Icons/explicitTag.svg';
import spacing from 'styles/helpers/spacing';

const StyledIcon = styled.div`
  top: .125em;
  position: relative;

  svg {
      margin-left: ${props => (props.applyLeftMargin ? '3px' : '0')};
      margin-right: ${spacing.xs};
    }
`;

function EpisodeTags({ isEpisodeNew, isExplicitContent }) {
  return (
    <>
      {(isEpisodeNew || isExplicitContent) && (
        <StyledIcon applyLeftMargin>
          {isEpisodeNew && <NewIcon />}
          {isExplicitContent && <ExplicitIcon />}
        </StyledIcon>
      )}
    </>
  );
}

EpisodeTags.propTypes = {
  isEpisodeNew: PropTypes.bool,
  isExplicitContent: PropTypes.bool,
};

EpisodeTags.defaultProps = {
  isEpisodeNew: false,
  isExplicitContent: false,
};

export default EpisodeTags;
