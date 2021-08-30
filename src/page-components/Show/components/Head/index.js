import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const HeadTag = ({ isEpisodePage, isPlaylistPage, isShowPage, targetEpisode, showContents }) => {
  const {
    slug,
    name,
    description,
    images: { squareSmall, squareLarge },
    rssFeedUrl,
    playlistSlug,
  } = showContents;

  const ogImage = squareLarge || squareSmall;
  const pageTitle = `${name} | LiSTNR`;
  const pageDescription = `LiSTNR - ${name} - All episodes, all seasons, listen now`;
  const siteDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

  if (isEpisodePage && targetEpisode) {
    return (
      <Head>
        <title>{targetEpisode.title}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${pageTitle} - ${targetEpisode.title}`} />
        <meta name="twitter:description" content={targetEpisode.description} />
        <meta name="twitter:image" content={targetEpisode.imageUrl} />
        <meta name="twitter:site" content={siteName} />
        <meta property="og:title" content={`${pageTitle} - ${targetEpisode.title}`} />
        <meta property="og:description" content={targetEpisode.description} />
        <meta property="og:image" content={targetEpisode.imageUrl} />
        <meta property="og:type" content="website" />
        {isShowPage && <meta property="og:url" content={`${siteDomain}/podcasts/${slug}/${targetEpisode.slug}`} />}
        {isPlaylistPage && <meta property="og:url" content={`${siteDomain}/playlists/${playlistSlug}/${targetEpisode.slug}`} />}
        <meta property="fb:app_id" content={facebookAppId} />
        <meta property="og:siteName" content={siteName} />
      </Head>
    );
  }

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={name} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content={siteName} />
      <meta property="og:title" content={name} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      {isShowPage && <meta property="og:url" content={`${siteDomain}/podcasts/${slug}`} />}
      {isPlaylistPage && <meta property="og:url" content={`${siteDomain}/playlists/${playlistSlug}`} />}
      <meta property="fb:app_id" content={facebookAppId} />
      <meta property="og:siteName" content={siteName} />
      {isShowPage && <link type="application/rss+xml" rel="alternate" title={name} href={rssFeedUrl} />}
    </Head>
  );
};

HeadTag.propTypes = {
  showContents: PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    playlistSlug: PropTypes.string,
    rssFeedUrl: PropTypes.string,
    images: PropTypes.shape({
      squareSmall: PropTypes.shape({ url: PropTypes.string }),
      squareLarge: PropTypes.shape({ url: PropTypes.string }),
    }),
  }).isRequired,
  targetEpisode: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    slug: PropTypes.string,
  }),
  isEpisodePage: PropTypes.bool,
  isPlaylistPage: PropTypes.bool,
  isShowPage: PropTypes.bool,
};

HeadTag.defaultProps = {
  targetEpisode: null,
  isEpisodePage: false,
  isPlaylistPage: false,
  isShowPage: true,
};

export default HeadTag;
