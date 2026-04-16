import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    pubDatetime: z.string(),
    description: z.string(),
    banner: z.string().optional(),
    tags: z.array(z.string()).optional()
  })
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    talkDate: z.string(),
    description: z.string().optional(),
    youtubeId: z.string().optional(),
    event: z.string().optional(),
    tags: z.array(z.string()).optional()
  })
});

export const collections = {
  blog,
  talks
};
