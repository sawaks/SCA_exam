import React from 'react';
import Slider from 'components/Slider';
import addToDataLayer from 'utilities/helpers/dataLayer';
import gtm from 'utilities/GTM/gtmTags';
import PropTypes from 'prop-types';
import PlaylistCard from 'components/Card/PlaylistCard';

const CuratedPlaylist = ({ curatedPlaylists }) => (
  <Slider
    title="Hand picked curated collections by our team"
    cardSize="l"
    gtmViewAllEvent={gtm.curatedPlaylistsViewAll}
  >
    {curatedPlaylists.map((playlist, i) => (
      <PlaylistCard
        key={playlist.name}
        playlist={playlist}
        onClick={() => addToDataLayer({
          event: gtm.curatedPlaylistsClick,
          carouselCardIndex: i,
          carouselName: 'Curated Playlists',
          carouselCardName: playlist.name,
        })}
      />
    ))
  }
  </Slider>
);

CuratedPlaylist.propTypes = {
  curatedPlaylists: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default CuratedPlaylist;
