import { Flex } from '@rebass/grid';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paragraph from 'components/Typography/Paragraph';
import InfoIcon from 'components/Icons/info2.svg';
import CloseIcon from 'components/Icons/close.svg';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';

const StyledMusicPopup = styled(Flex)`
  position: absolute;
  top: -66px;
  width: 330px;
  border-radius: 8px;
  padding: ${spacing.m} ${spacing.m};
  background: ${props => props.theme.backgroundLight};
  color: ${props => props.theme.light};
  display: ${props => (props.visible ? 'flex' : 'none')};
  cursor: default;
  
  ${screen.md} {
    width: 360px;
  }
`;

const InfoIconWrapper = styled.div`
  text-align: center;
  margin: 3px 12px 6px 0;
`;

const StyledCloseIcon = styled(CloseIcon)`
  width: 18px;
  height: 18px;
  fill: ${props => props.theme.whiteColor};
  cursor: pointer;
`;

function MusicPopup({ onCloseClick, visible }) {
  return (
    <StyledMusicPopup alignItems="flex-start" visible={visible}>
      <InfoIconWrapper>
        <InfoIcon />
      </InfoIconWrapper>
      <Paragraph variant="m" transparent text="Podcasts that contain music have skipping disabled due to commercial reasons" lineHeight={1.25} />
      <StyledCloseIcon onClick={onCloseClick} />
    </StyledMusicPopup>
  );
}

MusicPopup.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

MusicPopup.defaultProps = {
  visible: false,
};

export default MusicPopup;
