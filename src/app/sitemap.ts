import { MetadataRoute } from 'next';
import { db } from '@/db';
import { blogPosts, portfolioItems } from '@/db/schema';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://Aadhyadigitalsolution.com';
  const currentDate = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ];

  // Dynamic blog posts
  try {
    const posts = await db.select().from(blogPosts);
    const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
    staticPages.push(...blogEntries);
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Dynamic portfolio items
  try {
    const items = await db.select().from(portfolioItems);
    const portfolioEntries: MetadataRoute.Sitemap = items.map((item) => ({
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
    staticPages.push(...portfolioEntries);
  } catch (error) {
    console.error('Error fetching portfolio items for sitemap:', error);
  }

  return staticPages;
}
