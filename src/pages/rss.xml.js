import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'Kush Saraiya',
    description:
      'Thoughts on software design, engineering practices, career growth, and life skills.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDatetime,
      description: post.data.description,
      link: `/blog/${post.id.replace('.md', '')}/`
    }))
  });
}
