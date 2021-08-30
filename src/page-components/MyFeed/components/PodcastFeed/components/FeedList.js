import FeedCard, { feedCardPropTypes } from 'components/Card/FeedCard';
import Divider from 'components/Divider';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { arrayOf, oneOf, shape, string } from 'prop-types';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { EPISODE_ORIGIN } from 'utilities/constants';

const FeedList = ({ feed = [], activeEpId, origin, feedCategory }) => (
  <TransitionGroup component="div">
    {feed.map((episode, i) => {
      const { contentRating, description, durationSeconds, title, id, time, isCompleted, season } = episode;
      const show = get(episode, 'show', {});
      const { colourPrimary, images, name, slug } = show;
      const imageUrl = get(images, 'squareLarge.url', '');
      const category = get(show, 'categories[0].name', '');
      return (
        <CSSTransition
          timeout={500}
          classNames="feed"
          key={title}
        >
          <>
            <FeedCard
              audioUrl={episode.audioUrl}
              category={category}
              colour={colourPrimary}
              currentTimeSeconds={time}
              description={description}
              durationSeconds={durationSeconds}
              episodeId={id}
              episodeSeason={season}
              episodeSlug={episode?.slug}
              feedCategory={feedCategory}
              imageUrl={imageUrl}
              index={i}
              isActive={activeEpId === episode.id}
              isCompleted={isCompleted}
              isExplicit={contentRating === 'Explicit'}
              loading={false}
              origin={origin}
              season={episode.season}
              showId={show?.id}
              showName={name}
              showSlug={show.slug}
              slug={slug}
              title={title}
            />
            <Divider opacity={0.1} />
          </>
        </CSSTransition>
      );
    })}
  </TransitionGroup>
);

FeedList.propTypes = {
  feed: arrayOf(shape(feedCardPropTypes)),
  activeEpId: string.isRequired,
  origin: oneOf([EPISODE_ORIGIN.topFeed, EPISODE_ORIGIN.bottomFeed]).isRequired,
  feedCategory: string.isRequired,
};

FeedList.defaultProps = {
  feed: [],
};

export default React.memo(FeedList, isEqual);
