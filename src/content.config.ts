import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    year: z.number(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    type: z.enum(['product', 'platform', 'ai-agent', 'experiment']),
    status: z.enum(['live', 'building', 'archived']),
    stack: z.array(z.string()).max(8),
    links: z
      .object({
        live: z.string().url().optional(),
        repo: z.string().url().optional(),
      })
      .default({}),
    ai: z.object({
      assist: z.number().min(0).max(100),
      tools: z.array(z.string()),
      human: z.string(),
    }),
    buildLog: z.array(
      z.object({
        step: z.string(),
        detail: z.string(),
      }),
    ),
  }),
});

export const collections = { projects };
