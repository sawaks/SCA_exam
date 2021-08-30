import PreviewCard from 'components/Card/PreviewCard';
import Slider from 'components/Slider';
import get from 'lodash/get';
import { arrayOf, shape } from 'prop-types';
import React from 'react';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

const Previews = ({ previews }) => (
  <Slider
    title="Latest Previews"
    gtmBrowseEvent={gtm.onBrowsePageLatestPreviews}
    noDivider
  >
    {previews.map((episode, i) => (episode && episode.show && (
      <PreviewCard
        key={episode.id}
        episode={episode}
        index={i}
        colour={episode?.show?.colourDark}
        onClick={() => addToDataLayer({
          event: gtm.previewsEpisodeClick,
          tilePostion: i,
          category: get(episode, 'show.categories[0].name', ''),
          podcastName: get(episode, 'show.name', ''),
          episodeNumber: i,
        })}
      />
    )))
      }
  </Slider>
);

Previews.propTypes = {
  previews: arrayOf(shape).isRequired,
};

export default Previews;
