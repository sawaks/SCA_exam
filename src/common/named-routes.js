
// Required for sitemap
const staticRoutes = {
  advertise: '/advertise-with-us',
  appLink: '/.well-known/apple-app-site-association',
  browse: '/browse',
  category: '/category',
  complaints: '/complaints',
  contactUs: '/contact-us',
  creator: '/creator',
  faq: '/faq',
  genre: '/genre',
  library: '/library',
  locations: '/location-details',
  login: '/login',
  myFeed: '/my-feed',
  newsletter: '/newsletter-signup',
  playlists: '/playlists',
  podcasts: '/podcasts',
  profile: '/profile',
  root: '/',
  search: '/search',
  sitemap: '/sitemap',
  stations: '/stations',
  submitIdea: '/submit-idea',
  deviceActivate: '/activate',
  error404: '/404',
};

// Routes that are not required in the site map should be included here.
const external = {
  ...staticRoutes,
};

const internal = {
  // dont use the word 'advertise' as Ad-blocker will block the file.
  advertise: '/sell-with-us',
  browse: '/browse',
  category: '/category',
  complaints: '/complaints',
  contactUs: '/contact-us',
  creator: '/creator',
  episodePlayer: '/player/episode',
  faq: '/faq',
  genre: '/genre',
  library: '/library',
  locations: '/location-details',
  login: '/login',
  myFeed: '/my-feed',
  newsletter: '/newsletter',
  playlistsPlayer: '/player/playlists',
  podcasts: '/podcasts',
  profile: '/profile',
  root: '/',
  search: '/search',
  show: '/show',
  stations: '/stations',
  submitIdea: '/submit-idea',
  deviceActivate: '/activate',
  error404: '/404',
};

module.exports = {
  external,
  internal,
  staticRoutes,
};

