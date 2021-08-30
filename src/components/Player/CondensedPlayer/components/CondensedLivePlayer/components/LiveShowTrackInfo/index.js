import { Box, Flex } from '@rebass/grid';
import Paragraph from 'components/Typography/Paragraph';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { playerOverlayUpdateVisible } from 'store/actions/player-overlay';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import { endLiveShow } from '../../../../../../../store/actions/live-show';

function LiveShowTrackInfo() {
  const dispatch = useDispatch();

  const showName = useSelector(({ liveShow }) => liveShow.liveShowName, shallowEqual);
  const imageUrl = useSelector(({ liveShow }) => liveShow.liveShowImage, shallowEqual);
  const liveShowInfo = useSelector(({ liveShow }) => liveShow.liveShowInfo, shallowEqual);
  const liveShowEndUTC = useSelector(state => state?.liveShow?.liveShowEndUTC, shallowEqual);

  useEffect(() => {
    const currentUtcDateTime = Date.now();
    const liveShowEndUTCTime = new Date(liveShowEndUTC).getTime();
    const timeToLive = liveShowEndUTCTime - currentUtcDateTime;
    const timerToLive = setTimeout(() => {
      dispatch(endLiveShow());
    }, timeToLive);

    return () => {
      if (timerToLive) {
        clearTimeout(timerToLive);
      }
    };
  }, []);

  const handleMaximisePlayerClick = (event) => {
    event.stopPropagation();
    dispatch(playerOverlayUpdateVisible(true));
  };

  return (
    <Box width={1}>
      <Wrapper
        flexDirection={['row', 'row', 'row-reverse']}
        justifyContent="start"
        alignItems="center"
        onClick={handleMaximisePlayerClick}
      >
        <StyledImage src={imageUrl} alt="Now playing artwork" />
        <InfoWrapperDesktop justifyContent="space-between" width={1}>
          <Paragraph as="span" fontWeight="bold" lineHeight="1.2" whiteSpace="nowrap">{showName}</Paragraph>
          <InfoDesktop>
            <StyledShowName>Now Playing</StyledShowName>
            <StyleLiveShowInfo>{` - ${liveShowInfo}`}</StyleLiveShowInfo>
          </InfoDesktop>
        </InfoWrapperDesktop>
        <InfoMobile flexDirection="column" justifyContent="center" alignItems="start">
          <Paragraph variant="m" linesToShow={1} fontWeight={500} letterSpacing="1px" text={liveShowInfo} />
          <Paragraph variant="m" linesToShow={1} text={showName} letterSpacing="1px" transparent />
        </InfoMobile>
      </Wrapper>
    </Box>
  );
}

const Wrapper = styled(Flex)`
  height: 100%;
  min-width: 0; /* Preserves flexible truncation. See: https://css-tricks.com/flexbox-truncated-text/ */
  color: ${props => props.theme.light};
  line-height: 18px;
`;

const StyledImage = styled.img`
  width: 36px;
  height: 36px;
  box-sizing: content-box;
  object-fit: cover;
  background-color: #fff;
  border-radius: 5px;
  user-select: none;
  margin-right: ${spacing.s};

  ${screen.md} {
    margin-left: ${spacing.l};
    margin-right: 0;
  }
`;

const InfoWrapperDesktop = styled(Flex)`
  display: none;

  ${screen.md} {
    display: flex; /* stylelint-disable-line value-no-vendor-prefix */
  }
`;

const InfoDesktop = styled(Flex)`
  display: none;

  ${screen.md} {
    display: -webkit-box; /* stylelint-disable-line value-no-vendor-prefix */
    width: 100%;
    justify-content: flex-end;
    white-space: pre-wrap;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: right;
  }
`;

const InfoMobile = styled(Flex)`
  ${screen.md} {
    display: none;
  }
`;

const StyledShowName = styled.span`
  line-height: 1.2;
  font-size: 14px;
  font-weight: normal;
`;

const StyleLiveShowInfo = styled.span`
  opacity: 0.6;
  font-size: 14px;
  font-weight: normal;
`;

export default LiveShowTrackInfo;
