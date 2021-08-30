export default (req, res) => {
  const allowRobots = process.env.ALLOW_ROBOTS;
  const response = `User-agent: *
${allowRobots ? 'Allow: /' : 'Disallow: /'}

Sitemap: ${process.env.NEXT_PUBLIC_SITE_DOMAIN}sitemap.xml
`;

  res.statusCode = 200;
  res.send(response);
};
