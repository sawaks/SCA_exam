import { Box, Flex } from '@rebass/grid';
import Equaliser from 'components/Equaliser';
import Header from 'components/Typography/Header';
import isEqual from 'lodash/isEqual';
import { arrayOf, shape, string } from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openLiveStreamPlayer } from 'store/actions/player-overlay';
import styled, { css } from 'styled-components';
import rgba from 'styles/helpers/rgba';
import spacing from 'styles/helpers/spacing';
import { LIVE_STREAM_ORIGIN } from 'utilities/constants';

function MoreStationsList({ relatedStations }) {
  const dispatch = useDispatch();
  const liveStreamPlaying = useSelector(state => state.liveStreamPlayer?.playing);
  const handleClick = (slug) => {
    dispatch(openLiveStreamPlayer(slug, LIVE_STREAM_ORIGIN.moreStationsList));
  };

  return (
    <>
      {relatedStations.map(station => (
        <StyledStation key={station.slug} alignItems="center" mb={spacing.l} onClick={() => handleClick(station.slug)} active={station.active}>
          <Box mr={spacing.m}>
            <StyledImage
              alt={station.name}
              src={station?.images?.logoLarge}
            />
          </Box>
          <Flex justifyContent="space-between" width={1}>
            <Header as="span" variant="s" text={station.name} />
            {station.active && <Equaliser playing={liveStreamPlaying} />}
          </Flex>
        </StyledStation>
      ))}
    </>
  );
}

const StyledStation = styled(Flex)`
  cursor: pointer;
  ${props => props.active && css`
    border-radius: 10px;
    border: solid 1px ${rgba(props.theme.light, 0.16)};
    background-color: ${props.theme.backgroundLight};
    padding: 4px 0;
    margin-right: 12px;
  `}
`;

const StyledImage = styled.img` 
  height: 46px;
  width: 46px;
  object-fit: contain;
`;

MoreStationsList.propTypes = {
  relatedStations: arrayOf(shape({
    name: string,
    slug: string,
    title: string,
    description: string,
  })).isRequired,
};

function areEqual(props, nextProps) {
  const overlayVisibilityUpdate = props.visible === nextProps.visible;
  const relatedStationsUpdate = isEqual(props.relatedStations, nextProps.relatedStations);

  return overlayVisibilityUpdate && relatedStationsUpdate;
}

export default React.memo(MoreStationsList, areEqual);
