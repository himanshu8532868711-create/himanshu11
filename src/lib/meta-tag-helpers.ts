/**
 * META TAG HELPERS FOR API RESPONSES
 * 
 * These helper functions make it easy to create API responses
 * with complete meta tag information
 */

import {
  generateAllMetaTags,
  CompleteMetaTagsOptions,
  RobotsDirective,
} from './meta-tags-generator';

const BASE_URL = 'https://Aadhyadigitalsolution.com';
const SITE_NAME = 'Aadhya Digital Solution';

/**
 * Helper function to create meta tags for blog posts
 */
export function createBlogPostMetaTags(post: any) {
  return generateAllMetaTags({
    title: `${post.title} - ${SITE_NAME}`,
    description: post.excerpt,
    keywords: [post.category, 'blog', 'article', 'digital marketing'],
    viewport: 'width=device-width, initial-scale=1.0',
    charset: 'UTF-8',

    // Open Graph
    ogType: 'article',
    ogTitle: post.title,
    ogDescription: post.excerpt,
    ogUrl: `${BASE_URL}/blog/${post.slug}`,
    ogImage: post.thumbnailUrl,
    ogImageAlt: post.title,
    ogSiteName: SITE_NAME,
    ogLocale: 'en_US',
    ogImageWidth: 1200,
    ogImageHeight: 630,

    // Twitter Card
    twitterCardType: 'summary_large_image',
    twitterTitle: post.title,
    twitterDescription: post.excerpt,
    twitterImage: post.thumbnailUrl,
    twitterHandle: 'aadhyadigital',
    twitterCreator: post.authorName,

    // Canonical & Indexing
    canonicalUrl: `${BASE_URL}/blog/${post.slug}`,
    robotsDirective: 'index, follow',
  });
}

/**
 * Helper function to create meta tags for portfolio items
 */
export function createPortfolioMetaTags(item: any) {
  return generateAllMetaTags({
    title: `${item.title} - Portfolio - ${SITE_NAME}`,
    description: item.description,
    keywords: [item.category, 'portfolio', 'project', 'case study', ...item.tags],
    viewport: 'width=device-width, initial-scale=1.0',
    charset: 'UTF-8',

    // Open Graph
    ogType: 'website',
    ogTitle: item.title,
    ogDescription: item.description,
    ogUrl: `${BASE_URL}/portfolio#${item.id}`,
    ogImage: item.imageUrl,
    ogImageAlt: item.title,
    ogSiteName: SITE_NAME,
    ogLocale: 'en_US',
    ogImageWidth: 1200,
    ogImageHeight: 630,

    // Twitter Card
    twitterCardType: 'summary_large_image',
    twitterTitle: item.title,
    twitterDescription: item.description,
    twitterImage: item.imageUrl,
    twitterHandle: 'aadhyadigital',

    // Canonical & Indexing
    canonicalUrl: `${BASE_URL}/portfolio`,
    robotsDirective: 'index, follow',
  });
}

/**
 * Helper function to create meta tags for services
 */
export function createServiceMetaTags(service: any) {
  return generateAllMetaTags({
    title: `${service.categoryTitle} - ${SITE_NAME}`,
    description: service.categoryDescription,
    keywords: [service.categoryTitle, 'service', 'digital marketing', 'web development'],
    viewport: 'width=device-width, initial-scale=1.0',
    charset: 'UTF-8',

    // Open Graph
    ogType: 'website',
    ogTitle: service.categoryTitle,
    ogDescription: service.categoryDescription,
    ogUrl: `${BASE_URL}/services`,
    ogImage: `${BASE_URL}/services-cover.jpg`,
    ogImageAlt: service.categoryTitle,
    ogSiteName: SITE_NAME,
    ogLocale: 'en_US',
    ogImageWidth: 1200,
    ogImageHeight: 630,

    // Twitter Card
    twitterCardType: 'summary_large_image',
    twitterTitle: service.categoryTitle,
    twitterDescription: service.categoryDescription,
    twitterImage: `${BASE_URL}/services-cover.jpg`,
    twitterHandle: 'aadhyadigital',

    // Canonical & Indexing
    canonicalUrl: `${BASE_URL}/services`,
    robotsDirective: 'index, follow',
  });
}

/**
 * Helper function to create meta tags for team members
 */
export function createTeamMetaTags(member: any) {
  return generateAllMetaTags({
    title: `${member.name} - ${member.role} - ${SITE_NAME}`,
    description: member.bio,
    keywords: [member.role, 'team', 'professional', 'expert'],
    viewport: 'width=device-width, initial-scale=1.0',
    charset: 'UTF-8',

    // Open Graph
    ogType: 'website',
    ogTitle: member.name,
    ogDescription: member.bio,
    ogUrl: `${BASE_URL}/team`,
    ogImage: member.imageUrl,
    ogImageAlt: member.name,
    ogSiteName: SITE_NAME,
    ogLocale: 'en_US',
    ogImageWidth: 1200,
    ogImageHeight: 630,

    // Twitter Card
    twitterCardType: 'summary_large_image',
    twitterTitle: member.name,
    twitterDescription: member.bio,
    twitterImage: member.imageUrl,
    twitterHandle: 'aadhyadigital',

    // Canonical & Indexing
    canonicalUrl: `${BASE_URL}/team`,
    robotsDirective: 'index, follow',
  });
}

/**
 * Helper function to create meta tags for testimonials
 */
export function createTestimonialMetaTags(testimonial: any) {
  return generateAllMetaTags({
    title: `Testimonial - ${testimonial.clientName} - ${SITE_NAME}`,
    description: testimonial.quote,
    keywords: ['testimonial', 'review', 'success story', 'client feedback'],
    viewport: 'width=device-width, initial-scale=1.0',
    charset: 'UTF-8',

    // Open Graph
    ogType: 'website',
    ogTitle: `Testimonial - ${testimonial.clientName}`,
    ogDescription: testimonial.quote,
    ogUrl: `${BASE_URL}/testimonials`,
    ogImage: testimonial.clientImageUrl,
    ogImageAlt: testimonial.clientName,
    ogSiteName: SITE_NAME,
    ogLocale: 'en_US',
    ogImageWidth: 1200,
    ogImageHeight: 630,

    // Twitter Card
    twitterCardType: 'summary',
    twitterTitle: `${testimonial.clientName} - ${testimonial.clientRole}`,
    twitterDescription: testimonial.quote,
    twitterImage: testimonial.clientImageUrl,
    twitterHandle: 'aadhyadigital',

    // Canonical & Indexing
    canonicalUrl: `${BASE_URL}/testimonials`,
    robotsDirective: 'index, follow',
  });
}

/**
 * Helper function for private/admin pages (should not be indexed)
 */
export function createPrivatePageMetaTags(
  title: string,
  description: string,
  url: string
) {
  return generateAllMetaTags({
    title,
    description,
    keywords: ['private', 'admin', 'internal'],
    viewport: 'width=device-width, initial-scale=1.0',
    charset: 'UTF-8',

    // Open Graph (minimal for private pages)
    ogType: 'website',
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogImage: `${BASE_URL}/logo.jpg`,
    ogSiteName: SITE_NAME,

    // Twitter Card (minimal for private pages)
    twitterCardType: 'summary',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: `${BASE_URL}/logo.jpg`,
    twitterHandle: 'aadhyadigital',

    // Canonical & Indexing - NOINDEX for private pages
    canonicalUrl: url,
    robotsDirective: 'noindex, follow', // Don't index this page
  });
}

/**
 * Generic function for custom meta tags
 */
export function createCustomMetaTags(options: CompleteMetaTagsOptions) {
  return generateAllMetaTags(options);
}

/**
 * Create JSON response with meta tags
 */
export function createMetaTaggedResponse(data: any, metaTags: any) {
  return {
    data,
    _meta: metaTags,
  };
}

/**
 * META TAG USAGE EXAMPLES IN API ROUTES
 * 
 * Example 1: Blog Route
 * ---------------------
 * const post = await db.select().from(blogPosts).where(...);
 * const metaTags = createBlogPostMetaTags(post[0]);
 * const response = new NextResponse(
 *   JSON.stringify(createMetaTaggedResponse(post[0], metaTags)),
 *   { status: 200, headers: seoHeaders }
 * );
 * 
 * Example 2: Portfolio Route
 * --------------------------
 * const items = await db.select().from(portfolioItems);
 * const response = new NextResponse(
 *   JSON.stringify({
 *     data: items,
 *     _meta: generateAllMetaTags({
 *       title: 'Portfolio - Aadhya Digital Solution',
 *       description: 'View our web development projects',
 *       keywords: ['portfolio', 'projects', 'web development'],
 *       viewport: 'width=device-width, initial-scale=1.0',
 *       charset: 'UTF-8',
 *       ogType: 'website',
 *       ogTitle: 'Portfolio',
 *       ogDescription: 'Our web development projects',
 *       ogUrl: 'https://Aadhyadigitalsolution.com/portfolio',
 *       ogImage: 'https://Aadhyadigitalsolution.com/portfolio-cover.jpg',
 *       ogImageAlt: 'Portfolio Cover',
 *       ogSiteName: 'Aadhya Digital Solution',
 *       twitterCardType: 'summary_large_image',
 *       twitterTitle: 'Portfolio',
 *       twitterDescription: 'Our web development projects',
 *       twitterImage: 'https://Aadhyadigitalsolution.com/portfolio-cover.jpg',
 *       twitterHandle: 'aadhyadigital',
 *       canonicalUrl: 'https://Aadhyadigitalsolution.com/portfolio',
 *       robotsDirective: 'index, follow',
 *     }),
 *   }),
 *   { status: 200, headers: seoHeaders }
 * );
 */
