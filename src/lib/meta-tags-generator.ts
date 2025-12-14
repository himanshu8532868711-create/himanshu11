/**
 * COMPREHENSIVE META TAG GENERATOR FOR SEO
 * 
 * This file provides all meta tag generation functions including:
 * - Basic Meta Tags (title, description, keywords, viewport, charset)
 * - Open Graph Tags (og:type, og:title, og:description, og:url, og:image, og:image:alt, og:site_name)
 * - Twitter Card Tags (card type, twitter:title, twitter:description, twitter:image, twitter:handle)
 * - Canonical URLs
 * - Indexing Directives (index/follow, noindex)
 */

/**
 * ==================== BASIC META TAGS ====================
 * Standard HTML meta tags for search engines and browsers
 */
export interface BasicMetaTags {
  title: string;
  description: string;
  keywords?: string[];
  viewport?: string;
  charset?: string;
}

export function generateBasicMetaTags(options: BasicMetaTags) {
  return {
    title: options.title,
    'meta-description': options.description,
    'meta-keywords': options.keywords?.join(', ') || '',
    'meta-viewport': options.viewport || 'width=device-width, initial-scale=1.0',
    'meta-charset': options.charset || 'UTF-8',
  };
}

/**
 * ==================== OPEN GRAPH TAGS ====================
 * Meta tags for social media sharing (Facebook, LinkedIn, WhatsApp, etc.)
 * og:type, og:title, og:description, og:url, og:image, og:image:alt, og:site_name
 */
export interface OpenGraphTags {
  type: 'website' | 'article' | 'product' | 'video' | 'music' | 'book' | string;
  title: string;
  description: string;
  url: string;
  image: string;
  imageAlt?: string;
  siteName: string;
  locale?: string;
  width?: number;
  height?: number;
}

export function generateOpenGraphTags(options: OpenGraphTags) {
  return {
    'og:type': options.type,
    'og:title': options.title,
    'og:description': options.description,
    'og:url': options.url,
    'og:image': options.image,
    'og:image:alt': options.imageAlt || options.title,
    'og:site_name': options.siteName,
    ...(options.locale && { 'og:locale': options.locale }),
    ...(options.width && { 'og:image:width': options.width.toString() }),
    ...(options.height && { 'og:image:height': options.height.toString() }),
  };
}

/**
 * ==================== TWITTER CARD TAGS ====================
 * Meta tags for Twitter sharing
 * card type, twitter:title, twitter:description, twitter:image, twitter:handle
 */
export interface TwitterCardTags {
  cardType: 'summary' | 'summary_large_image' | 'app' | 'player';
  title: string;
  description: string;
  image: string;
  handle: string; // Twitter handle without @
  creator?: string; // Twitter creator handle
}

export function generateTwitterCardTags(options: TwitterCardTags) {
  return {
    'twitter:card': options.cardType,
    'twitter:title': options.title,
    'twitter:description': options.description,
    'twitter:image': options.image,
    'twitter:site': `@${options.handle.replace('@', '')}`,
    ...(options.creator && {
      'twitter:creator': `@${options.creator.replace('@', '')}`,
    }),
  };
}

/**
 * ==================== CANONICAL URL ====================
 * Prevents duplicate content issues in SEO
 * Points to the preferred version of a page
 */
export function generateCanonicalTag(url: string) {
  return {
    canonical: url,
  };
}

/**
 * ==================== INDEXING DIRECTIVES ====================
 * Controls which pages search engines index
 * index/follow toggle and noindex examples
 */
export type RobotsDirective = 
  | 'index, follow'      // Index page and follow links (default for public pages)
  | 'noindex, follow'    // Don't index page but follow links
  | 'index, nofollow'    // Index page but don't follow links
  | 'noindex, nofollow'; // Don't index or follow

export function generateIndexingTags(directive: RobotsDirective) {
  return {
    'robots': directive,
  };
}

/**
 * ==================== COMBINED META TAGS GENERATOR ====================
 * Generates all meta tags in one object
 */
export interface CompleteMetaTagsOptions {
  // Basic tags
  title: string;
  description: string;
  keywords?: string[];
  viewport?: string;
  charset?: string;

  // Open Graph
  ogType?: 'website' | 'article' | 'product' | 'video' | string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl: string;
  ogImage: string;
  ogImageAlt?: string;
  ogSiteName: string;
  ogLocale?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;

  // Twitter Card
  twitterCardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterHandle: string;
  twitterCreator?: string;

  // Canonical & Indexing
  canonicalUrl: string;
  robotsDirective?: RobotsDirective;
}

export function generateAllMetaTags(options: CompleteMetaTagsOptions) {
  const basicTags = generateBasicMetaTags({
    title: options.title,
    description: options.description,
    keywords: options.keywords,
    viewport: options.viewport,
    charset: options.charset,
  });

  const ogTags = generateOpenGraphTags({
    type: options.ogType || 'website',
    title: options.ogTitle || options.title,
    description: options.ogDescription || options.description,
    url: options.ogUrl,
    image: options.ogImage,
    imageAlt: options.ogImageAlt,
    siteName: options.ogSiteName,
    locale: options.ogLocale,
    width: options.ogImageWidth,
    height: options.ogImageHeight,
  });

  const twitterTags = generateTwitterCardTags({
    cardType: options.twitterCardType || 'summary_large_image',
    title: options.twitterTitle || options.title,
    description: options.twitterDescription || options.description,
    image: options.twitterImage || options.ogImage,
    handle: options.twitterHandle,
    creator: options.twitterCreator,
  });

  const canonicalTag = generateCanonicalTag(options.canonicalUrl);

  const indexingTags = generateIndexingTags(
    options.robotsDirective || 'index, follow'
  );

  return {
    basic: basicTags,
    openGraph: ogTags,
    twitterCard: twitterTags,
    canonical: canonicalTag,
    indexing: indexingTags,
  };
}

/**
 * ==================== EXAMPLE IMPLEMENTATIONS ====================
 * Real-world examples of how to use these functions
 */

// ===== EXAMPLE 1: BLOG POST META TAGS =====
export const blogPostMetaTagsExample = {
  title: 'Best Digital Marketing Strategies 2025 - Aadhya Digital Solution',
  description: 'Learn the top digital marketing strategies for 2025 including SEO, social media, and content marketing tips.',
  keywords: ['digital marketing', 'marketing strategies', 'SEO', '2025', 'social media'],
  viewport: 'width=device-width, initial-scale=1.0',
  charset: 'UTF-8',

  // Open Graph
  ogType: 'article',
  ogTitle: 'Best Digital Marketing Strategies 2025',
  ogDescription: 'Comprehensive guide to digital marketing strategies for 2025',
  ogUrl: 'https://Aadhyadigitalsolution.com/blog/marketing-strategies-2025',
  ogImage: 'https://Aadhyadigitalsolution.com/images/blog/marketing-strategies.jpg',
  ogImageAlt: 'Digital Marketing Strategies 2025 Cover Image',
  ogSiteName: 'Aadhya Digital Solution',
  ogLocale: 'en_US',
  ogImageWidth: 1200,
  ogImageHeight: 630,

  // Twitter Card
  twitterCardType: 'summary_large_image' as const,
  twitterTitle: 'Best Digital Marketing Strategies 2025',
  twitterDescription: 'Learn the top digital marketing strategies for 2025',
  twitterImage: 'https://Aadhyadigitalsolution.com/images/blog/marketing-strategies.jpg',
  twitterHandle: 'aadhyadigital',
  twitterCreator: 'aadhyadigital',

  // Canonical & Indexing
  canonicalUrl: 'https://Aadhyadigitalsolution.com/blog/marketing-strategies-2025',
  robotsDirective: 'index, follow' as const,
};

// ===== EXAMPLE 2: PORTFOLIO PAGE META TAGS =====
export const portfolioMetaTagsExample = {
  title: 'Our Portfolio - Web Development & Design Projects - Aadhya Digital Solution',
  description: 'Explore our portfolio of successful web development and design projects for startups and enterprises.',
  keywords: ['portfolio', 'web development', 'design projects', 'case studies', 'web design'],
  viewport: 'width=device-width, initial-scale=1.0',
  charset: 'UTF-8',

  // Open Graph
  ogType: 'website',
  ogTitle: 'Portfolio - Aadhya Digital Solution',
  ogDescription: 'View our successful web development and design projects',
  ogUrl: 'https://Aadhyadigitalsolution.com/portfolio',
  ogImage: 'https://Aadhyadigitalsolution.com/images/portfolio-cover.jpg',
  ogImageAlt: 'Our Web Development Portfolio',
  ogSiteName: 'Aadhya Digital Solution',
  ogLocale: 'en_US',
  ogImageWidth: 1200,
  ogImageHeight: 630,

  // Twitter Card
  twitterCardType: 'summary_large_image' as const,
  twitterTitle: 'Our Portfolio - Aadhya Digital Solution',
  twitterDescription: 'Check out our web development and design portfolio',
  twitterImage: 'https://Aadhyadigitalsolution.com/images/portfolio-cover.jpg',
  twitterHandle: 'aadhyadigital',
  twitterCreator: 'aadhyadigital',

  // Canonical & Indexing
  canonicalUrl: 'https://Aadhyadigitalsolution.com/portfolio',
  robotsDirective: 'index, follow' as const,
};

// ===== EXAMPLE 3: SERVICES PAGE META TAGS =====
export const servicesMetaTagsExample = {
  title: 'Digital Marketing Services - Web Development & Design - Aadhya Digital Solution',
  description: 'Professional digital marketing, web development, and design services. SEO, PPC, social media, and branding solutions.',
  keywords: ['digital marketing', 'web development', 'web design', 'SEO', 'PPC', 'services'],
  viewport: 'width=device-width, initial-scale=1.0',
  charset: 'UTF-8',

  // Open Graph
  ogType: 'website',
  ogTitle: 'Services - Aadhya Digital Solution',
  ogDescription: 'Digital marketing and web development services',
  ogUrl: 'https://Aadhyadigitalsolution.com/services',
  ogImage: 'https://Aadhyadigitalsolution.com/images/services-cover.jpg',
  ogImageAlt: 'Our Digital Marketing Services',
  ogSiteName: 'Aadhya Digital Solution',
  ogLocale: 'en_US',
  ogImageWidth: 1200,
  ogImageHeight: 630,

  // Twitter Card
  twitterCardType: 'summary_large_image' as const,
  twitterTitle: 'Digital Marketing Services - Aadhya Digital Solution',
  twitterDescription: 'Professional digital marketing and web development services',
  twitterImage: 'https://Aadhyadigitalsolution.com/images/services-cover.jpg',
  twitterHandle: 'aadhyadigital',
  twitterCreator: 'aadhyadigital',

  // Canonical & Indexing
  canonicalUrl: 'https://Aadhyadigitalsolution.com/services',
  robotsDirective: 'index, follow' as const,
};

// ===== EXAMPLE 4: PRIVATE/NOINDEX PAGE =====
export const privatePageMetaTagsExample = {
  title: 'Contact Submissions - Admin',
  description: 'Internal page - not for public indexing',
  keywords: ['admin', 'internal'],
  viewport: 'width=device-width, initial-scale=1.0',
  charset: 'UTF-8',

  // Open Graph (minimal)
  ogType: 'website',
  ogTitle: 'Contact Submissions',
  ogDescription: 'Internal page',
  ogUrl: 'https://Aadhyadigitalsolution.com/api/invoices',
  ogImage: 'https://Aadhyadigitalsolution.com/logo.jpg',
  ogSiteName: 'Aadhya Digital Solution',

  // Twitter Card
  twitterCardType: 'summary' as const,
  twitterTitle: 'Contact Submissions',
  twitterDescription: 'Internal page',
  twitterImage: 'https://Aadhyadigitalsolution.com/logo.jpg',
  twitterHandle: 'aadhyadigital',

  // Canonical & Indexing - NOINDEX for private pages
  canonicalUrl: 'https://Aadhyadigitalsolution.com/api/invoices',
  robotsDirective: 'noindex, follow' as const, // Don't index this page
};

/**
 * ==================== IMPLEMENTATION GUIDE ====================
 * 
 * BASIC META TAGS:
 * ----------------
 * <meta charset="UTF-8">
 * <meta name="viewport" content="width=device-width, initial-scale=1.0">
 * <meta name="title" content="Your Page Title">
 * <meta name="description" content="Your page description">
 * <meta name="keywords" content="keyword1, keyword2, keyword3">
 * 
 * OPEN GRAPH TAGS:
 * ----------------
 * <meta property="og:type" content="website">
 * <meta property="og:title" content="Your Title">
 * <meta property="og:description" content="Your description">
 * <meta property="og:url" content="https://example.com">
 * <meta property="og:image" content="https://example.com/image.jpg">
 * <meta property="og:image:alt" content="Image alt text">
 * <meta property="og:site_name" content="Your Site Name">
 * 
 * TWITTER CARD TAGS:
 * ------------------
 * <meta name="twitter:card" content="summary_large_image">
 * <meta name="twitter:title" content="Your Title">
 * <meta name="twitter:description" content="Your description">
 * <meta name="twitter:image" content="https://example.com/image.jpg">
 * <meta name="twitter:site" content="@yourtwitterhandle">
 * <meta name="twitter:creator" content="@creatorhandle">
 * 
 * CANONICAL URL:
 * ---------------
 * <link rel="canonical" href="https://example.com">
 * 
 * INDEXING DIRECTIVES:
 * --------------------
 * <meta name="robots" content="index, follow">        // Index and follow (default)
 * <meta name="robots" content="noindex, follow">     // Don't index
 * <meta name="robots" content="index, nofollow">    // Index but don't follow
 * <meta name="robots" content="noindex, nofollow">  // Don't index or follow
 */

/**
 * ==================== QUICK REFERENCE ====================
 * 
 * OG:TYPE Values:
 * - website: General website pages
 * - article: Blog posts, news articles
 * - product: Product pages
 * - video: Video content
 * - music: Music content
 * - book: Book content
 * 
 * TWITTER:CARD Values:
 * - summary: Small card with text
 * - summary_large_image: Large image card (RECOMMENDED)
 * - app: Mobile app card
 * - player: Video/media player card
 * 
 * ROBOTS DIRECTIVE Values:
 * - index, follow: Index page and follow links (RECOMMENDED for public pages)
 * - noindex, follow: Don't index page but follow links (for private pages)
 * - index, nofollow: Index page but don't follow links
 * - noindex, nofollow: Don't index or follow (completely hidden)
 * 
 * IMAGE DIMENSIONS:
 * - Facebook: 1200x630px (recommended)
 * - Twitter: 1200x675px (recommended)
 * - LinkedIn: 1200x627px (recommended)
 * - Minimum: 200x200px for all platforms
 */
