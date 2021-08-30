export const OS_TYPE = {
  MAC_OS: 'Mac-OS',
  IOS: 'iOS',
  ANDROID: 'Android',
  WINDOWS: 'Windows',
  LINUX: 'Linux',
};

export const LISTNR_META = {
  brandName: 'LiSTNR',
  pages: {
    advertise: {
      title: 'Advertise With Us | LiSTNR',
      description: 'LiSTNR has the best podcasts across many top genres, advertise with us.',
    },
    authenticate: {
      title: 'Login to LiSTNR | LiSTNR',
      description: 'LiSTNR - Login - Save your favourites and sync with the LiSTNR app.',
    },
    browse: {
      title: 'Browse Podcasts | LiSTNR',
      description: 'Browse the best LiSTNR has to offer including Previews and Top Episodes',
    },
    contactUs: {
      title: 'Contact Us | LiSTNR',
      description: 'LiSTNR - Get in touch, submit a podcast idea or find our location details',
    },
    emailManagement: {
      title: 'LiSTNR',
      description: 'LiSTNR',
    },
    faq: {
      title: 'FAQ | LiSTNR',
      description: 'FAQ | LiSTNR',
    },
    library: {
      title: 'My Library | LiSTNR',
      description: 'LiSTNR - Library - Your favourites all in one place and synced with the LiSTNR app.',
    },
    locations: {
      title: 'Contact Us | LiSTNR',
      description: 'LiSTNR - Get in touch, submit a podcast idea or find our location details',
    },
    myFeed: {
      title: 'My Feed | LiSTNR',
      description: 'My Feed | LiSTNR',
    },
    newsletter: {
      title: 'Newsletter Signup | LiSTNR',
      description: 'LiSTNR has the best podcasts across many top genres, sign up to our newsletter for updates on upcoming podcasts and more.',
    },
    profile: {
      title: 'Profile Page | LiSTNR',
      description: 'LiSTNR - Profile description',
    },
    search: {
      title: 'Search LiSTNR | LiSTNR',
      description: 'LiSTNR - Search for a title, name or podcast or browse all podcasts and categories',
    },
    submitIdea: {
      title: 'Contact Us | LiSTNR',
      description: 'LiSTNR - Get in touch, submit a podcast idea or find our location details',
    },
  },
};

export const PLAYER_OVERLAY_TYPE = {
  PODCAST: 'podcast',
  LIVE_STREAM: 'liveStream',
  LIVE_SHOW: 'liveShow',
};

export const CONTENT_TYPE = {
  MUSIC: 'music',
};

export const EPISODES_SORT_TYPE = {
  SERIAL: 'serial',
  EPISODIC: 'episodic',
  TIMELY: 'timely',
};

export const EPISODES_SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const EPISODES_TYPE_ORDER_PAIRING = {
  [EPISODES_SORT_TYPE.SERIAL]: EPISODES_SORT_ORDER.ASC,
  [EPISODES_SORT_TYPE.EPISODIC]: EPISODES_SORT_ORDER.DESC,
  [EPISODES_SORT_TYPE.TIMELY]: EPISODES_SORT_ORDER.DESC,
};

export const EPISODES_SORT_KEY = ['latest', 'oldest', 'downloaded', 'unplayed'];

// Order is important please do not change it.
export const EPISODES_SORT_OPTIONS = [
  {
    key: 'latest',
    name: 'View Latest',
    value: 'desc',
    sortTypes: [EPISODES_SORT_TYPE.EPISODIC, EPISODES_SORT_TYPE.TIMELY],
  },
  {
    key: 'oldest',
    name: 'View Oldest',
    value: 'asc',
    sortTypes: [EPISODES_SORT_TYPE.SERIAL],
  },

  // In addition above two options, AIM added 'downloaded' and 'unplayed' options in the mobile app but they won't be available in the web app.
  // When user choose 'downloaded' or 'unplayed' option from the mobile, We always label them as 'View Latest' and sort the episodes as DESC(latest to oldest) order in the web app.
  {
    key: 'downloaded',
    name: 'View Latest',
    value: 'desc',
    sortTypes: [EPISODES_SORT_TYPE.EPISODIC, EPISODES_SORT_TYPE.TIMELY],
  },
  {
    key: 'unplayed',
    name: 'View Latest',
    value: 'desc',
    sortTypes: [EPISODES_SORT_TYPE.EPISODIC, EPISODES_SORT_TYPE.TIMELY],
  },
];

export const EPISODE_ORIGIN = {
  default: 'default',
  myPlaylist: 'myPlaylist',
  curatedPlaylist: 'curatedPlaylist',
  topFeed: 'topFeed',
  bottomFeed: 'bottomFeed',
};

export const LIVE_STREAM_ORIGIN = {
  default: 'default',
  moreStationsList: 'moreStationsList',
  myFeed: 'myFeed',
};

// These are the splits form Split.IO
export const FEATURE_NAMES = {
  commentingEnabled: 'ENABLE_COMMENTING_FEATURE',
  appleSignIn: 'PodcastOne_AppleSignIn',
};

export const FEATURE_STATES = {
  on: 'on',
  off: 'off',
};

export const ACTIVATE_DEVICE_TYPE = {
  web: 'web',
  tv: 'tv',
  smartDevices: 'smartDevices',
};

export const ACTIVATE_DEVICE_ROUTE = {
  deviceCode: '/activate',
  oauth: '/oauth',
};
