export const blogMetadata = {
  NCTSAApp: {
    name: 'NCTSAApp',
    title: 'North Carolina TSA App Project',
    description:
      'Learn about my journey making my first production app, from never having coded an app before to being deployed to hundreds of users weeks later.',
    publishedAt: Date.parse(
      'Fri Jul 11 2025 13:01:13 GMT-0400 (Eastern Daylight Time)'
    ),
    updatedAt: null as null,
    readTime: '8 min',
    image: '/images/blogs/nctsa.png',
  },
} as const;

export type BlogMetadata = (typeof blogMetadata)[keyof typeof blogMetadata];
