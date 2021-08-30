import React from 'react';
import ShowCard from 'components/Card/ShowCard';
import PreviewCard from 'components/Card/PreviewCard';
import EpisodeCard from 'components/Card/EpisodeCard';
import CategoryCard from 'components/Card/CategoryCard';
import PlaylistCard from 'components/Card/PlaylistCard';
import FeedCard from 'components/Card/FeedCard';
import StationCard from 'components/Card/StationCard';
import { Container, Flex } from 'components/Grid';
// eslint-disable-next-line import/no-extraneous-dependencies
import { boolean, text, withKnobs, number } from '@storybook/addon-knobs';
import image from './mocks/show.jpg';
import Card from './index';

export default {
  component: Card,
  title: 'Card',
  decorators: [withKnobs],
};

const categoryCardMock = {
  name: 'Arts',
  slug: 'arts',
  colour: '#fd791c',
  images: {
    bannerSmall: {
      url: 'https://master.bello-cms.dev.scadigital.com.au/api/assets/bf01375f-1bc6-4d27-8342-33176e89f531?width=374&height=238',
    },
  },
};

export const showCard = () => (
  <Container>
    <ShowCard
      as="a"
      title={text('Title', 'Matt and Alex all day breakfast show')}
      subTitle={text('Sub Title', 'The thing has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged')}
      imageUrl={image}
    />
  </Container>
);

export const previewCard = () => (
  <Container>
    <PreviewCard
      as="a"
      title={text('Title', 'Title of the show')}
      imageUrl={image}
      playInProgress={boolean('Play', false)}
      percentage={number('Progress (%)', 66)}
    />
  </Container>
);

export const categoryCard = () => (
  <Container>
    <CategoryCard
      as="a"
      bg={categoryCardMock.colour}
      image={categoryCardMock.images.bannerSmall.url}
      heading={text('Title', 'Podcast Category')}
    />
  </Container>
);

export const playlistCard = () => (
  <PlaylistCard
    playlist={{
      name: text('Title', 'Positivity Playlist'),
      slug: 'positivity-playlist',
      description: text('Description', 'Episodes to Listen To If You’re Feeling Overwhelmed With The World Right Now'),
      images: {
        bannerMedium: {
          url: 'https://master.bello-cms.dev.scadigital.com.au/api/assets/aee75f06-69a5-4997-a984-02f7d2cad70e?width=471&height=299',
        },
      },
    }}
  />
);

export const Episode = () => (
  <EpisodeCard
    episodeId="episodeId"
    title={text('Title', 'The Dagwood Dog Dilemma in Doolandella')}
    description={text('Description', 'ADB Magazine Launch. Matt has to apologise to Tom Tilley…AGAIN. The Dagwood Dog Dilemma in Doolandella.')}
    imageUrl="https://www.omnycontent.com/d/clips/820f09cf-2ace-4180-a92d-aa4c0008f5fb/18561c0f-707f-4cd4-83ed-aba0004c693c/a15f7864-dca5-4213-b764-abff00903710/image.jpg?size=Medium"
    variant={boolean('Long', false) ? 'long' : 'normal'}
    isNew={boolean('New Episode', true)}
    isExplicit={boolean('Explicit Content', true)}
    episode={number('Episode number', 1)}
    season={number('Season number', 2)}
    publishedDate={text('Published Date', '12 JUNE 2020')}
    playing={boolean('Playing', true)}
    durationSeconds={number('Duration (seconds)', 820)}
    currentTimeSeconds={number('Current time(seconds)', 20)}
    isCompleted={boolean('Completed', false)}
  />
);

export const feedCard = () => (
  <Flex width={[1, 1, 935]}>
    <FeedCard
      loading={false}
      showName={text('Show Name', 'Show Name')}
      title={text('Title', 'Title of the episode goes here on two lines')}
      imageUrl={image}
      category={text('Category Tag', 'category name')}
      colour={text('Colour Hex', '#4565CC')}
      isExplicit={boolean('Explicit Content', true)}
      durationSeconds={number('Duration (seconds)', 820)}
      // eslint-disable-next-line max-len
      description={text('Description', 'There is such a lot of talk going around about branding, but what exactly is your brand and how do you use it to help you reach more people and market your products or services? Your brand is the core of your marketing, the central theme around your products and services. Your brand is the core of your marketing, the central theme around your products and services.')}
      isCompleted={boolean('Completed', false)}
      currentTimeSeconds={number('Current time(seconds)', 0)}
    />
  </Flex>
);

export const stationCard = () => (
  <Flex width={[1, 1, 935]}>
    <StationCard
      stationName={text('Station Name', 'Santa Radio')}
      text={text('Now Playing', 'Now Playing')}
      songTitle={text('Song Title', 'Dire straits - Sultans of Swing')}
      songArtwork={text('Song Artwork', 'https://thisdayinmusic.com/wp-content/uploads/1949/08/45bf9baec64ca9df91edbd3b2de11158.1000x1000x1-758x758.jpg')}
      imageUrl={text('Image URL', 'https://myradio-img-prod.scalabs.com.au/api/assets/c2b105f3-2659-42b2-86d6-45a467e047c4/')}
      bgImage={text('Background Image', 'https://myradio-img-prod.scalabs.com.au/api/assets/d86965e0-ba15-49bb-abc1-06f5325c606a/')}
    />
  </Flex>
);
