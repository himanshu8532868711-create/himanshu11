import { NextResponse } from 'next/server';

export const BASE_URL = 'https://Aadhyadigitalsolution.com';
export const SITE_NAME = 'Aadhya Digital Solution';
export const SITE_DESCRIPTION = 'Professional digital marketing and web development agency providing comprehensive solutions for businesses.';
export const DEFAULT_LANGUAGE = 'en-US';

export interface SEOMetaTags {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  language?: string;
  alternateVersions?: Array<{
    language: string;
    url: string;
  }>;
  keywords?: string[];
}

/**
 * SEO-optimized response headers
 * Improves search engine crawling and indexing
 */
export function createSEOHeaders(options: {
  cacheControl?: string;
  contentType?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  language?: string;
} = {}) {
  const headers = new Headers();
  
  // Set content type
  headers.set('Content-Type', options.contentType || 'application/json');
  
  // Cache control for better SEO (public API data can be cached)
  headers.set(
    'Cache-Control',
    options.cacheControl || 'public, max-age=3600, s-maxage=86400'
  );
  
  // X-Robots-Tag for search engines
  if (options.noIndex) {
    headers.set('X-Robots-Tag', 'noindex, follow');
  } else if (options.noFollow) {
    headers.set('X-Robots-Tag', 'index, nofollow');
  } else {
    headers.set('X-Robots-Tag', 'index, follow');
  }
  
  // Content language header
  headers.set('Content-Language', options.language || DEFAULT_LANGUAGE);
  
  // Security headers
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Vary header for proper caching based on Accept-Language
  headers.set('Vary', 'Accept-Language, Accept-Encoding');
  
  return headers;
}

/**
 * Generates JSON-LD structured data for rich snippets
 */
export function generateBlogPostSchema(post: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnailUrl,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.authorName,
    },
    keywords: post.category,
    url: `${BASE_URL}/blog/${post.slug}`,
  };
}

/**
 * Generates JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Aadhya Digital Solution',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.jpg`,
    description:
      'Digital marketing and web development agency providing comprehensive solutions',
    sameAs: [
      'https://www.facebook.com/aadhyadigital',
      'https://www.twitter.com/aadhyadigital',
      'https://www.linkedin.com/company/aadhya-digital-solution',
      'https://www.instagram.com/aadhyadigital',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'contact@aadhyadigitalsolution.com',
      availableLanguage: 'en-US',
    },
  };
}

/**
 * Generates JSON-LD structured data for Service
 */
export function generateServiceSchema(service: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.categoryTitle,
    description: service.categoryDescription,
    provider: {
      '@type': 'Organization',
      name: 'Aadhya Digital Solution',
      url: BASE_URL,
    },
    url: `${BASE_URL}/services`,
  };
}

/**
 * Generates JSON-LD structured data for LocalBusiness
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Aadhya Digital Solution',
    image: `${BASE_URL}/logo.jpg`,
    description:
      'Professional digital marketing and web development services',
    url: BASE_URL,
    telephone: '+91-XXXXXXXXXX',
    email: 'contact@aadhyadigitalsolution.com',
  };
}

/**
 * Generates XML sitemap entry
 */
export function generateSitemapEntry(url: string, options: {
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
} = {}) {
  return {
    url,
    lastModified: options.lastModified || new Date(),
    changeFrequency: options.changeFrequency || 'weekly',
    priority: options.priority || 0.5,
  };
}

/**
 * Creates SEO-optimized JSON response
 */
export function createSEOJsonResponse(
  data: any,
  options: {
    cacheControl?: string;
    noIndex?: boolean;
    noFollow?: boolean;
    schema?: any;
  } = {}
) {
  const response = new NextResponse(
    JSON.stringify(
      options.schema
        ? {
            data,
            '@context': options.schema['@context'],
            '@type': options.schema['@type'],
          }
        : data
    ),
    {
      status: 200,
      headers: createSEOHeaders({
        cacheControl: options.cacheControl,
        noIndex: options.noIndex,
        noFollow: options.noFollow,
      }),
    }
  );

  return response;
}

/**
 * Generate canonical URL to avoid duplicate content issues
 */
export function getCanonicalUrl(path: string): string {
  return `${BASE_URL}${path}`;
}

/**
 * Generate meta tags object for API responses
 */
export function generateMetaTags(options: SEOMetaTags): SEOMetaTags {
  return {
    title: options.title,
    description: options.description,
    image: options.image || `${BASE_URL}/logo.jpg`,
    url: options.url,
    type: options.type || 'website',
    author: options.author,
    publishedDate: options.publishedDate,
    modifiedDate: options.modifiedDate,
    language: options.language || DEFAULT_LANGUAGE,
    alternateVersions: options.alternateVersions || [],
    keywords: options.keywords || [],
  };
}

/**
 * Generate Open Graph meta tags for social media
 */
export function generateOpenGraphTags(metaTags: SEOMetaTags): Record<string, string> {
  return {
    'og:title': metaTags.title,
    'og:description': metaTags.description,
    'og:image': metaTags.image || `${BASE_URL}/logo.jpg`,
    'og:url': metaTags.url,
    'og:type': metaTags.type || 'website',
    'og:site_name': SITE_NAME,
    'og:locale': metaTags.language || DEFAULT_LANGUAGE,
  };
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterCardTags(metaTags: SEOMetaTags): Record<string, string> {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': metaTags.title,
    'twitter:description': metaTags.description,
    'twitter:image': metaTags.image || `${BASE_URL}/logo.jpg`,
    'twitter:site': '@aadhyadigital',
    'twitter:creator': '@aadhyadigital',
    'twitter:url': metaTags.url,
  };
}

/**
 * Generate all meta tags including Open Graph and Twitter Card
 */
export function generateAllMetaTags(
  metaTags: SEOMetaTags
): Record<string, Record<string, string>> {
  return {
    basic: {
      'charset': 'UTF-8',
      'viewport': 'width=device-width, initial-scale=1.0',
      'title': metaTags.title,
      'description': metaTags.description,
      'keywords': metaTags.keywords?.join(', ') || '',
      'author': metaTags.author || SITE_NAME,
      'language': metaTags.language || DEFAULT_LANGUAGE,
      'robots': 'index, follow',
      'canonical': metaTags.url,
    },
    openGraph: generateOpenGraphTags(metaTags),
    twitterCard: generateTwitterCardTags(metaTags),
  };
}

/**
 * Generate alternate language links
 */
export function generateAlternateLanguageLinks(
  alternateVersions: Array<{ language: string; url: string }>
): Record<string, string> {
  const links: Record<string, string> = {};
  alternateVersions.forEach((version) => {
    links[`alternate-${version.language}`] = version.url;
  });
  return links;
}

/**
 * Create SEO response with comprehensive meta tags
 */
export function createSEOResponse(
  data: any,
  metaTags: SEOMetaTags,
  options: {
    cacheControl?: string;
    noIndex?: boolean;
    noFollow?: boolean;
    includeSchema?: any;
  } = {}
) {
  const allMetaTags = generateAllMetaTags(metaTags);
  
  const response = new NextResponse(
    JSON.stringify({
      data,
      _meta: {
        title: metaTags.title,
        description: metaTags.description,
        canonical: metaTags.url,
        language: metaTags.language,
        alternateVersions: metaTags.alternateVersions,
        openGraph: allMetaTags.openGraph,
        twitterCard: allMetaTags.twitterCard,
        ...(options.includeSchema && { schema: options.includeSchema }),
      },
    }),
    {
      status: 200,
      headers: createSEOHeaders({
        cacheControl: options.cacheControl,
        noIndex: options.noIndex,
        noFollow: options.noFollow,
        language: metaTags.language,
      }),
    }
  );

  return response;
}

/**
 * Meta tags for API responses (useful for API documentation and discoverability)
 */
export const API_META_TAGS = {
  blog: {
    title: 'Blog - Aadhya Digital Solution',
    description: 'Latest blog posts and articles on digital marketing, web design, and technology trends',
    keywords: ['blog', 'articles', 'digital marketing', 'web design', 'technology', 'insights'],
    image: `${BASE_URL}/blog-cover.jpg`,
  },
  portfolio: {
    title: 'Portfolio - Aadhya Digital Solution',
    description: 'Portfolio showcasing our completed projects and case studies across web development, design, and marketing',
    keywords: ['portfolio', 'projects', 'case studies', 'web development', 'design', 'work'],
    image: `${BASE_URL}/portfolio-cover.jpg`,
  },
  services: {
    title: 'Services - Aadhya Digital Solution',
    description: 'Professional digital marketing and web development services including SEO, PPC, design, and more',
    keywords: ['services', 'digital marketing', 'web development', 'design', 'branding', 'seo'],
    image: `${BASE_URL}/services-cover.jpg`,
  },
  team: {
    title: 'Team - Aadhya Digital Solution',
    description: 'Meet our talented team of digital experts and professionals dedicated to your success',
    keywords: ['team', 'professionals', 'experts', 'staff', 'about', 'people'],
    image: `${BASE_URL}/team-cover.jpg`,
  },
  testimonials: {
    title: 'Testimonials - Aadhya Digital Solution',
    description: 'Client testimonials and success stories from our satisfied clients worldwide',
    keywords: ['testimonials', 'reviews', 'success stories', 'client feedback', 'case studies'],
    image: `${BASE_URL}/testimonials-cover.jpg`,
  },
  contact: {
    title: 'Contact Us - Aadhya Digital Solution',
    description: 'Get in touch with Aadhya Digital Solution. We are here to help with your digital needs',
    keywords: ['contact', 'contact us', 'get in touch', 'support', 'help'],
    image: `${BASE_URL}/contact-cover.jpg`,
  },
};

/**
 * Language and region configuration
 */
export const LANGUAGE_CONFIG = {
  supported: [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Español' },
    { code: 'fr-FR', name: 'Français' },
    { code: 'de-DE', name: 'Deutsch' },
    { code: 'hi-IN', name: 'हिन्दी' },
  ],
  default: 'en-US',
};

/**
 * Generate alternate language versions for hreflang tags
 */
export function generateAlternateVersions(path: string): SEOMetaTags['alternateVersions'] {
  return LANGUAGE_CONFIG.supported.map((lang) => ({
    language: lang.code,
    url: `${BASE_URL}${path}?lang=${lang.code}`,
  }));
}

