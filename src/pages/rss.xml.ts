import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { posts } from '../data';

// Notes as an RSS feed, newest first.
export function GET(context: APIContext) {
  return rss({
    title: 'N.R Dhanawada - Notes',
    description: 'Thinking out loud about systems, code, and building things.',
    site: context.site!,
    trailingSlash: false, // match the site's clean URLs (/notes/slug, not /notes/slug/)
    items: [...posts]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((post) => ({
        title: post.title,
        description: post.summary,
        pubDate: new Date(`${post.date}T00:00:00+10:00`),
        link: `/notes/${post.slug}`,
        categories: post.tags,
      })),
  });
}
