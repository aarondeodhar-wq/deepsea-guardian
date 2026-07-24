import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://deepseaguardian-six.vercel.app';
  const routes = [
    '',
    '/dashboard',
    '/map',
    '/ai-detection',
    '/biodiversity',
    '/datasets',
    '/predictive-map',
    '/digital-twin',
    '/technology',
    '/alerts',
    '/reports',
    '/how-it-works',
    '/about',
    '/contact',
    '/login',
    '/signup',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/dashboard' ? 'always' : 'weekly',
    priority: route === '' ? 1.0 : route === '/dashboard' || route === '/map' ? 0.9 : 0.8,
  }));
}
