import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';
import { sitemapRootRoutes } from 'common/named-routes';
import { getAllCategories } from 'utilities/api/graphql/categories/queryMethods';
import { getShows } from 'utilities/api/graphql/shows/queryMethods';
import { getAllStations } from 'utilities/api/graphql/stations/queryMethods';

async function Sitemap(req, res) {
  if (!res) return {};
  try {
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Content-Encoding', 'gzip');
    // A Transform for turning a Readable stream of either SitemapItemOptions or url strings into a Sitemap.
    // The readable stream it transforms must be in object mode.
    const sitemap = new SitemapStream({
      hostname: process.env.NEXT_PUBLIC_SITE_DOMAIN,
    });

    const pipeline = sitemap.pipe(createGzip());
    // Get timestamp
    const timeStamp = new Date().toISOString();
    // Add any static entries here
    Object.entries(sitemapRootRoutes).forEach((item) => {
      sitemap.write({
        url: item[1],
        lastmod: timeStamp,
      });
    });
    const { categories } = await getAllCategories();
    categories.forEach((category) => {
      sitemap.write({
        url: `/categories/${category.slug}`,
        lastmod: timeStamp,
      });
      return true;
    });
    const { shows } = await getShows();
    shows.forEach((show) => {
      sitemap.write({
        url: `/podcasts/${show.slug}`,
        lastmod: timeStamp,
      });
      return true;
    });
    const { stations } = await getAllStations();
    stations.forEach((station) => {
      sitemap.write({
        url: `/stations/${station.slug}`,
        lastmod: timeStamp,
      });
      return true;
    });

    sitemap.end();

    // cache the response
    // streamToPromise.then(sm => sitemap = sm)
    streamToPromise(pipeline);
    // stream the response
    pipeline.pipe(res).on('error', (e) => {
      throw e;
    });
  } catch (e) {
    res.status(500).send(e);
  }
}

export default Sitemap;
