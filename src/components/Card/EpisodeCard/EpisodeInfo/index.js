import React from 'react';
import { bool, number, string, oneOf } from 'prop-types';
import { Flex, Box } from '@rebass/grid';
import spacing from 'styles/helpers/spacing';
import Paragraph from 'components/Typography/Paragraph';
import NewIcon from 'components/Icons/newTag.svg';
import ExplicitIcon from 'components/Icons/explicitTag.svg';
import ClockIcon from 'components/Icons/clock.svg';
import { formatSecondsToTime } from 'utilities/helpers/dateTime';
import getEpisodeNumber from 'utilities/helpers/episodeNumber';

function EpisodeInfo({ variant, isNew, isExplicit, durationSeconds, episode, season, publishedDate }) {
  return (
    <Flex justifyContent="flex-start" alignItems="center">
      {isNew && <Box mt={[spacing.xs]} mr={spacing.s}><NewIcon /></Box> }
      {isExplicit && <Box mt={['2px']} mr={spacing.m}><ExplicitIcon /></Box>}
      <ClockIcon />
      <Box ml={spacing.xs} mr={[spacing.s, spacing.m, (variant === 'long' ? spacing.l : spacing.m)]}>
        <Paragraph variant="s" opacity={0.4} text={formatSecondsToTime(durationSeconds)} />
      </Box>
      {episode && <Paragraph variant="s" mr="l" opacity={0.4} text={getEpisodeNumber(episode, season)} /> }
      {variant === 'long' && <Paragraph variant="s" opacity={0.4} text={publishedDate} /> }
    </Flex>
  );
}

EpisodeInfo.propTypes = {
  variant: oneOf(['normal', 'long']).isRequired,
  isNew: bool,
  isExplicit: bool.isRequired,
  durationSeconds: number.isRequired,
  season: number,
  publishedDate: string.isRequired,
  episode: number,
};

EpisodeInfo.defaultProps = {
  episode: null,
  isNew: false,
  season: null,
};

export default EpisodeInfo;
