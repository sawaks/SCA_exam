import EpisodeCard from 'components/Card/EpisodeCard';
import Slider from 'components/Slider';
import PropTypes from 'prop-types';
import React from 'react';

function ContinueListeningUI({ episodes }) {
  return (
    (episodes.length > 0
    && (
    <Slider
      title="Continue listening"
      cardSize="m"
    >
      {episodes.map((episode, i) => {
        const { id, imageUrl, title, durationSeconds, season, publishedUtc, playheadPosition, description, contentRating, showSlug, slug, showId, progress } = episode;
        return (
          (progress < 1 && (
          <EpisodeCard
            currentTimeSeconds={playheadPosition}
            data-test={`library-continue-listening-${i}`}
            description={description}
            durationSeconds={durationSeconds}
            episode={episode.episode}
            episodeId={id}
            episodeSlug={slug}
            imageUrl={imageUrl}
            index={i}
            isExplicit={contentRating === 'Explicit'}
            isNew={false}
            key={id}
            maxWidthDesktop="437px"
            maxWidthMobile="330px"
            noBorder
            publishedDate={publishedUtc}
            season={season}
            showId={showId}
            showSlug={showSlug}
            title={title}
          />
          ))
        );
      })
      }
    </Slider>
    )
    )
  );
}

ContinueListeningUI.propTypes = {
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      duration: PropTypes.number,
      episodeId: PropTypes.string,
      playHeadPosition: PropTypes.number,
      playedDateTime: PropTypes.string,
      showSlug: PropTypes.string,
      progress: PropTypes.number,
    }),
  ),
};

ContinueListeningUI.defaultProps = {
  episodes: null,
};

export default ContinueListeningUI;
