export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
}

export const posts: Post[] = [
  {
    slug: 'first-principles-in-system-design',
    title: 'First Principles in System Design',
    date: '2026-02-15',
    tags: ['architecture', 'philosophy'],
    summary: 'How breaking problems down to their fundamentals changes the way you build systems.'
  },
  {
    slug: 'why-i-open-source',
    title: 'Why I Open Source',
    date: '2026-01-20',
    tags: ['open-source', 'philosophy'],
    summary: 'Most of what I know came from other people sharing their code. This is my attempt to do the same.'
  }
];
