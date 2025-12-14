/**
 * ============================================================
 * COMPLETE SEO META TAGS DOCUMENTATION
 * ============================================================
 * 
 * This file provides comprehensive documentation and examples
 * for all meta tags used in the backend SEO implementation.
 */

/**
 * ============================================================
 * 1. BASIC META TAGS
 * ============================================================
 * 
 * Essential HTML meta tags for search engines and browsers.
 */

export const BASIC_META_TAGS_DOCUMENTATION = {
  charSet: {
    name: 'Character Set',
    tag: '<meta charset="UTF-8">',
    purpose: 'Specifies the character encoding for the HTML document',
    seoValue: 'Important for proper text rendering and SEO',
    example: 'UTF-8',
    alternatives: ['ISO-8859-1', 'UTF-16'],
  },

  viewport: {
    name: 'Viewport Meta Tag',
    tag: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    purpose: 'Controls layout on mobile browsers',
    seoValue: 'Critical for mobile SEO and responsive design',
    example: 'width=device-width, initial-scale=1.0',
    properties: {
      'width': 'Controls viewport width',
      'initial-scale': 'Initial zoom level (1.0 = 100%)',
      'minimum-scale': 'Minimum zoom allowed',
      'maximum-scale': 'Maximum zoom allowed',
      'user-scalable': 'Whether user can zoom',
    },
  },

  title: {
    name: 'Meta Title',
    tag: '<meta name="title" content="Your Page Title">',
    purpose: 'Defines the title of the HTML page',
    seoValue: 'Very important for SEO - appears in browser tab and search results',
    bestPractices: [
      'Keep between 50-60 characters',
      'Include primary keyword',
      'Make it compelling and clickable',
      'Unique for each page',
      'Brand name at the end is optional',
    ],
    example: 'Best Digital Marketing Strategies 2025 - Aadhya Digital Solution',
    characterLimit: '50-60 characters (70 max before truncation)',
  },

  description: {
    name: 'Meta Description',
    tag: '<meta name="description" content="Your page description">',
    purpose: 'Provides a summary of the page content',
    seoValue: 'Appears under title in search results - affects CTR (Click-Through Rate)',
    bestPractices: [
      'Keep between 150-160 characters',
      'Include primary and secondary keywords naturally',
      'Write compelling copy to encourage clicks',
      'Unique for each page',
      'Include call-to-action when relevant',
    ],
    example: 'Learn the top digital marketing strategies for 2025 including SEO, social media, and content marketing tips.',
    characterLimit: '150-160 characters (meta description is typically 160 chars in search)',
  },

  keywords: {
    name: 'Meta Keywords',
    tag: '<meta name="keywords" content="keyword1, keyword2, keyword3">',
    purpose: 'Lists relevant keywords for the page content',
    seoValue: 'Less important now, but still useful for organization',
    bestPractices: [
      'Include 5-10 relevant keywords',
      'Separate with commas',
      'Include variations and long-tail keywords',
      'Focus on relevance over quantity',
    ],
    example: 'digital marketing, marketing strategies, SEO, 2025, social media',
    note: 'Google largely ignores this tag but Bing may use it',
  },
};

/**
 * ============================================================
 * 2. OPEN GRAPH TAGS
 * ============================================================
 * 
 * Meta tags for social media sharing (Facebook, LinkedIn, etc.)
 * Format: <meta property="og:*" content="...">
 */

export const OPEN_GRAPH_TAGS_DOCUMENTATION = {
  ogType: {
    name: 'OG Type',
    tag: '<meta property="og:type" content="website">',
    purpose: 'Specifies the type of content being shared',
    seoValue: 'Determines how content is displayed on social platforms',
    validValues: {
      'website': 'General websites and pages',
      'article': 'Blog posts, news articles',
      'product': 'Product pages',
      'video': 'Video content',
      'video.movie': 'Movie content',
      'video.episode': 'TV episode',
      'video.tv_show': 'TV show',
      'music.song': 'Song',
      'music.album': 'Album',
      'music.playlist': 'Playlist',
      'music.radio_station': 'Radio station',
      'book': 'Book',
    },
    example: 'website',
    bestPractices: 'Choose the type that best represents your content',
  },

  ogTitle: {
    name: 'OG Title',
    tag: '<meta property="og:title" content="Your Title">',
    purpose: 'Title displayed when content is shared on social media',
    seoValue: 'Affects social media preview and engagement',
    note: 'Can be different from page title for social optimization',
    example: 'Best Digital Marketing Strategies 2025',
    characterLimit: '100 characters recommended',
    bestPractices: [
      'Make it engaging and shareable',
      'Can include emoji for more visual appeal',
      'Keep it under 100 characters',
      'Use action words',
    ],
  },

  ogDescription: {
    name: 'OG Description',
    tag: '<meta property="og:description" content="Your description">',
    purpose: 'Description displayed when content is shared on social media',
    seoValue: 'Affects social media preview and click rates',
    example: 'Comprehensive guide to digital marketing strategies for 2025',
    characterLimit: '160 characters',
    bestPractices: [
      'Include key information',
      'Make it compelling',
      'Different from meta description is fine',
      'Include CTA if appropriate',
    ],
  },

  ogUrl: {
    name: 'OG URL',
    tag: '<meta property="og:url" content="https://example.com">',
    purpose: 'Canonical URL of the content being shared',
    seoValue: 'Helps social platforms and search engines identify unique content',
    example: 'https://Aadhyadigitalsolution.com/blog/marketing-strategies-2025',
    bestPractices: [
      'Use absolute URLs (include domain)',
      'Use HTTPS',
      'Remove tracking parameters',
      'Should be consistent',
    ],
  },

  ogImage: {
    name: 'OG Image',
    tag: '<meta property="og:image" content="https://example.com/image.jpg">',
    purpose: 'Image displayed when content is shared on social media',
    seoValue: 'Critical for social media engagement and CTR',
    example: 'https://Aadhyadigitalsolution.com/images/blog/marketing-strategies.jpg',
    recommendedDimensions: {
      'Facebook': '1200x630px',
      'LinkedIn': '1200x627px',
      'Twitter': '1200x675px',
      'Instagram': '1080x1080px (square)',
      'Minimum': '200x200px',
    },
    bestPractices: [
      'Use 1200x630px for maximum compatibility',
      'Ensure high quality and clear image',
      'Make it relevant to content',
      'Avoid text on edges (safe zone)',
      'Use absolute URLs',
    ],
  },

  ogImageAlt: {
    name: 'OG Image Alt',
    tag: '<meta property="og:image:alt" content="Image alt text">',
    purpose: 'Alternative text for the OG image',
    seoValue: 'Accessibility and SEO benefit',
    example: 'Digital Marketing Strategies 2025 Cover Image',
    bestPractices: [
      'Describe the image accurately',
      'Include relevant keywords',
      'Keep it concise (125 characters max)',
    ],
  },

  ogSiteName: {
    name: 'OG Site Name',
    tag: '<meta property="og:site_name" content="Your Site Name">',
    purpose: 'Name of your website/brand',
    seoValue: 'Helps establish brand identity on social media',
    example: 'Aadhya Digital Solution',
    bestPractices: 'Use consistent brand name across all pages',
  },

  ogImageWidth: {
    name: 'OG Image Width',
    tag: '<meta property="og:image:width" content="1200">',
    purpose: 'Width of the OG image in pixels',
    seoValue: 'Optional but helps platforms optimize display',
    example: '1200',
  },

  ogImageHeight: {
    name: 'OG Image Height',
    tag: '<meta property="og:image:height" content="630">',
    purpose: 'Height of the OG image in pixels',
    seoValue: 'Optional but helps platforms optimize display',
    example: '630',
  },

  ogLocale: {
    name: 'OG Locale',
    tag: '<meta property="og:locale" content="en_US">',
    purpose: 'Language and region of the content',
    seoValue: 'Important for multilingual sites',
    example: 'en_US',
    formats: ['en_US', 'en_GB', 'es_ES', 'fr_FR', 'de_DE', 'hi_IN'],
  },
};

/**
 * ============================================================
 * 3. TWITTER CARD TAGS
 * ============================================================
 * 
 * Meta tags specifically for Twitter sharing
 * Format: <meta name="twitter:*" content="...">
 */

export const TWITTER_CARD_TAGS_DOCUMENTATION = {
  twitterCard: {
    name: 'Twitter Card Type',
    tag: '<meta name="twitter:card" content="summary_large_image">',
    purpose: 'Type of Twitter card to display when shared',
    seoValue: 'Affects how content appears on Twitter',
    validValues: {
      'summary': 'Small preview with text (text + small image)',
      'summary_large_image': 'Large image preview (RECOMMENDED - full width)',
      'app': 'Mobile app card',
      'player': 'Video/media player card',
    },
    example: 'summary_large_image',
    recommendation: 'Use summary_large_image for maximum impact',
  },

  twitterTitle: {
    name: 'Twitter Title',
    tag: '<meta name="twitter:title" content="Your Title">',
    purpose: 'Title displayed on Twitter card',
    seoValue: 'Affects engagement and click-through rate',
    example: 'Best Digital Marketing Strategies 2025',
    characterLimit: '70 characters (Twitter recommendation)',
    bestPractices: [
      'Keep it punchy and engaging',
      'Include key information',
      'Use action words',
    ],
  },

  twitterDescription: {
    name: 'Twitter Description',
    tag: '<meta name="twitter:description" content="Your description">',
    purpose: 'Description displayed on Twitter card',
    seoValue: 'Affects engagement and click-through rate',
    example: 'Learn the top digital marketing strategies for 2025',
    characterLimit: '200 characters',
    bestPractices: [
      'Be concise and compelling',
      'Include CTA',
      'Highlight value proposition',
    ],
  },

  twitterImage: {
    name: 'Twitter Image',
    tag: '<meta name="twitter:image" content="https://example.com/image.jpg">',
    purpose: 'Image displayed on Twitter card',
    seoValue: 'Critical for engagement and visibility',
    example: 'https://Aadhyadigitalsolution.com/images/blog/marketing-strategies.jpg',
    recommendedDimensions: '1200x675px or 4:3 aspect ratio',
    bestPractices: [
      'Use high-quality image',
      'Optimize for Twitter\'s 16:9 aspect ratio',
      'Make sure text is readable at small sizes',
      'Use absolute HTTPS URLs',
    ],
  },

  twitterSite: {
    name: 'Twitter Site Handle',
    tag: '<meta name="twitter:site" content="@yourbrand">',
    purpose: 'Twitter handle of the website owner',
    seoValue: 'Helps attribute content and build followers',
    example: '@aadhyadigital',
    format: '@handle (includes the @ symbol)',
    note: 'Not the same as twitter:creator',
  },

  twitterCreator: {
    name: 'Twitter Creator Handle',
    tag: '<meta name="twitter:creator" content="@author">',
    purpose: 'Twitter handle of the content creator/author',
    seoValue: 'Attributes content to individual creator',
    example: '@aadhyadigital',
    format: '@handle (includes the @ symbol)',
    optional: true,
    note: 'Can be different from twitter:site',
  },
};

/**
 * ============================================================
 * 4. CANONICAL URL
 * ============================================================
 * 
 * Prevents duplicate content issues and consolidates link authority
 */

export const CANONICAL_URL_DOCUMENTATION = {
  definition:
    'A canonical URL is the preferred version of a web page when multiple similar pages exist',

  tag: '<link rel="canonical" href="https://example.com">',

  purpose: [
    'Prevent duplicate content penalties',
    'Consolidate link authority',
    'Improve SEO rankings',
    'Help search engines understand preferred version',
  ],

  seoValue: 'Critical for SEO - prevents indexing of duplicate content',

  example: {
    original:
      'https://Aadhyadigitalsolution.com/blog/marketing-strategies-2025?utm_source=facebook&utm_medium=social',
    canonical:
      'https://Aadhyadigitalsolution.com/blog/marketing-strategies-2025',
    note: 'Remove tracking parameters for clean URLs',
  },

  bestPractices: [
    'Use absolute URLs (include domain)',
    'Use HTTPS (not HTTP)',
    'Remove query parameters like tracking codes',
    'Point to the same language version',
    'Use self-referential canonicals (page points to itself)',
    'Avoid chains of canonicals',
    'Ensure canonical page is indexable',
    'Use lowercase URLs',
    'Keep it consistent across variations',
  ],

  scenarios: {
    printable_version:
      'Printable version should canonical to regular version',
    paginated_content:
      'Each page should canonical to itself (not page 1)',
    session_ids:
      'Remove session IDs from canonical URL',
    protocol_variants:
      'Choose http or https and be consistent',
    www_variants:
      'Choose www or non-www and be consistent',
  },
};

/**
 * ============================================================
 * 5. INDEXING DIRECTIVES (ROBOTS META TAG)
 * ============================================================
 * 
 * Controls which pages search engines index
 */

export const INDEXING_DIRECTIVES_DOCUMENTATION = {
  tag: '<meta name="robots" content="index, follow">',

  purpose: 'Tell search engines which pages to index and whether to follow links',

  validValues: {
    'index, follow': {
      description: 'Index this page and follow all links',
      usage: 'Public pages that should be searchable',
      example: 'Blog posts, services, portfolio',
      seoValue: 'Best for content pages - maximizes visibility',
    },

    'noindex, follow': {
      description: "Don't index this page but follow its links",
      usage: 'Pages with duplicate/thin content but good outbound links',
      example: 'Printer-friendly pages, thank you pages',
      seoValue: 'Prevents indexing while preserving link authority',
    },

    'index, nofollow': {
      description: 'Index this page but don\'t follow its links',
      usage: 'Pages that should be indexed but links are untrusted',
      example: 'Comment sections, user-generated content',
      seoValue: 'Indexes content without spreading authority',
    },

    'noindex, nofollow': {
      description: "Don't index and don't follow any links",
      usage: 'Pages that should be completely hidden from search',
      example: 'Admin pages, private areas, sensitive content',
      seoValue: 'Complete exclusion from search engines',
    },
  },

  bestPractices: [
    'Use robots.txt for site-wide rules',
    'Use meta robots tag for page-specific rules',
    'X-Robots-Tag HTTP header for API responses',
    'Be consistent with canonical URLs',
    'Test with Google Search Console',
    'Monitor indexing regularly',
  ],

  commonScenarios: {
    public_content: {
      directive: 'index, follow',
      reason: 'Want maximum visibility in search engines',
    },

    private_content: {
      directive: 'noindex, follow',
      reason: 'Keep content private but preserve link structure',
    },

    admin_area: {
      directive: 'noindex, nofollow',
      reason: 'Completely hide from search engines',
    },

    thin_content: {
      directive: 'noindex, follow',
      reason: 'Don\'t index poor content but follow outbound links',
    },

    contact_submissions: {
      directive: 'noindex, follow',
      reason: 'User data - should not be publicly searchable',
    },
  },
};

/**
 * ============================================================
 * 6. COMPLETE EXAMPLE: BLOG POST META TAGS
 * ============================================================
 */

export const COMPLETE_BLOG_EXAMPLE = {
  htmlMarkup: `
<!-- Basic Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Best Digital Marketing Strategies 2025 - Aadhya Digital Solution</title>
<meta name="description" content="Learn the top digital marketing strategies for 2025 including SEO, social media, and content marketing tips.">
<meta name="keywords" content="digital marketing, marketing strategies, SEO, 2025, social media">

<!-- Canonical URL -->
<link rel="canonical" href="https://Aadhyadigitalsolution.com/blog/marketing-strategies-2025">

<!-- Indexing Directives -->
<meta name="robots" content="index, follow">

<!-- Open Graph Tags -->
<meta property="og:type" content="article">
<meta property="og:title" content="Best Digital Marketing Strategies 2025">
<meta property="og:description" content="Comprehensive guide to digital marketing strategies for 2025">
<meta property="og:url" content="https://Aadhyadigitalsolution.com/blog/marketing-strategies-2025">
<meta property="og:image" content="https://Aadhyadigitalsolution.com/images/blog/marketing-strategies.jpg">
<meta property="og:image:alt" content="Digital Marketing Strategies 2025 Cover Image">
<meta property="og:site_name" content="Aadhya Digital Solution">
<meta property="og:locale" content="en_US">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- Twitter Card Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Best Digital Marketing Strategies 2025">
<meta name="twitter:description" content="Learn the top digital marketing strategies for 2025">
<meta name="twitter:image" content="https://Aadhyadigitalsolution.com/images/blog/marketing-strategies.jpg">
<meta name="twitter:site" content="@aadhyadigital">
<meta name="twitter:creator" content="@aadhyadigital">
  `,

  visualPreview: {
    googleSearch: {
      title: 'Best Digital Marketing Strategies 2025 - Aadhya Digital...',
      url: 'https://Aadhyadigitalsolution.com › blog › marketing-strategies-2025',
      description:
        'Learn the top digital marketing strategies for 2025 including SEO, social media, and content marketing tips.',
    },

    facebookShare: {
      title: 'Best Digital Marketing Strategies 2025',
      description: 'Comprehensive guide to digital marketing strategies for 2025',
      image: '[1200x630px image from og:image]',
      siteNames: 'Aadhya Digital Solution',
    },

    twitterShare: {
      title: 'Best Digital Marketing Strategies 2025',
      description: 'Learn the top digital marketing strategies for 2025',
      image: '[Full-width image]',
      handle: '@aadhyadigital',
    },
  },
};

/**
 * ============================================================
 * 7. CHARACTER LIMITS & BEST PRACTICES
 * ============================================================
 */

export const CHARACTER_LIMITS = {
  metaTitle: {
    optimal: '50-60 characters',
    maximum: '70 characters (before truncation)',
    note: 'Google typically displays ~58 characters on desktop, ~50 on mobile',
  },

  metaDescription: {
    optimal: '150-160 characters',
    maximum: '160 characters',
    note: 'Google typically displays ~160 characters on desktop, ~120 on mobile',
  },

  ogTitle: {
    optimal: '100 characters',
    note: 'Can be longer but 100 chars recommended for consistency',
  },

  ogDescription: {
    optimal: '160 characters',
    note: 'Similar to meta description length',
  },

  twitterTitle: {
    optimal: '70 characters',
    note: 'Twitter recommendation for clarity',
  },

  twitterDescription: {
    optimal: '200 characters',
    note: 'Limited by Twitter\'s display area',
  },

  keywords: {
    optimal: '5-10 keywords',
    note: 'Less important now, focus on quality over quantity',
  },

  imageAlt: {
    optimal: '125 characters',
    note: 'Accessibility and SEO benefit',
  },
};

/**
 * ============================================================
 * 8. TESTING TOOLS
 * ============================================================
 */

export const TESTING_TOOLS = [
  {
    name: 'Google Search Console',
    purpose: 'Monitor indexing and SEO issues',
    url: 'https://search.google.com/search-console',
  },
  {
    name: 'Facebook Open Graph Debugger',
    purpose: 'Test and debug Open Graph tags',
    url: 'https://developers.facebook.com/tools/debug/og/object',
  },
  {
    name: 'Twitter Card Validator',
    purpose: 'Validate Twitter Card tags',
    url: 'https://cards-dev.twitter.com/validator',
  },
  {
    name: 'LinkedIn Post Inspector',
    purpose: 'Preview how content appears on LinkedIn',
    url: 'https://www.linkedin.com/feed/',
  },
  {
    name: 'Google PageSpeed Insights',
    purpose: 'Check Core Web Vitals and SEO score',
    url: 'https://pagespeed.web.dev/',
  },
  {
    name: 'Lighthouse (Chrome DevTools)',
    purpose: 'Audit SEO, performance, and accessibility',
    url: 'Chrome DevTools > Lighthouse',
  },
  {
    name: 'Screaming Frog SEO Spider',
    purpose: 'Crawl and audit website for SEO issues',
    url: 'https://www.screamingfrog.co.uk/',
  },
];

export default {
  BASIC_META_TAGS_DOCUMENTATION,
  OPEN_GRAPH_TAGS_DOCUMENTATION,
  TWITTER_CARD_TAGS_DOCUMENTATION,
  CANONICAL_URL_DOCUMENTATION,
  INDEXING_DIRECTIVES_DOCUMENTATION,
  COMPLETE_BLOG_EXAMPLE,
  CHARACTER_LIMITS,
  TESTING_TOOLS,
};
