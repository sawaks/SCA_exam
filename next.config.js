const defaultMaxAge = {
  key: 'Cache-Control',
  value: 'max-age=14400', // temp set to 4 hours
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  async headers() {
    return [
      {
        source: '/',
        headers: [defaultMaxAge],
      },
      {
        source: '/:podcasts*',
        headers: [defaultMaxAge],
      },
      {
        source: '/.well-known/apple-app-site-association',
        headers: [{ key: 'content-type', value: 'application/json' }],
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/sitemap.xml', destination: '/api/sitemap' },
      { source: '/robots.txt', destination: '/api/robots' },
    ];
  },
  future: {
    excludeDefaultMomentLocales: true,
  },
  images: {
    domains: [
      'www.omnycontent.com',
      'cms-xl.podcastoneaustralia.com.au',
      'pcone-xl-img-dev.scalabs.com.au',
    ],
  },
});
