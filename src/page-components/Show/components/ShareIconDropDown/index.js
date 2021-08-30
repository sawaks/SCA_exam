import { Flex } from '@rebass/grid';
import SocialDropDown from 'components/Social/SocialShareButton';
import { number, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';

const StyledIcon = styled(Flex)`
  border-radius: 100%;
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.backgroundLight};

  ${screen.md} {
    width: 44px;
    height: 44px;
  }

  svg {
    width: 18px;
    right: 11px;
    ${screen.md} {
      right: 13px;
    }
  }
`;

const ShareIconDropDown = ({ showName, episodeCount }) => (
  <>
    {episodeCount > 1 && (
      <StyledIcon justifyContent="center" alignItems="center">
        <SocialDropDown btnType="secondary" showName={showName} shareItem="show" />
      </StyledIcon>
    )}
  </>
);

ShareIconDropDown.propTypes = {
  showName: string,
  episodeCount: number,
};

ShareIconDropDown.defaultProps = {
  showName: '',
  episodeCount: 2,
};

export default ShareIconDropDown;
