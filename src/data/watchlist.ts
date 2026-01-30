import type { MediaEntry } from '../services/tmdb';

export const WATCHLIST_MEDIA: MediaEntry[] = [
  // Currently Watching
  { id: 61859, type: 'tv', category: 'current' },   // The Night Manager
  { id: 71712, type: 'tv', category: 'current' },   // The Good Doctor
  { id: 249522, type: 'tv', category: 'current' },  // The Pitt

  // Waiting for Next Season
  { id: 125988, type: 'tv', category: 'waiting' },  // Silo
  { id: 124364, type: 'tv', category: 'waiting' },  // FROM
  { id: 95396, type: 'tv', category: 'waiting' },   // Severance

  // Dinner & Lunch Rewatch Shows
  { id: 1421, type: 'tv', category: 'rewatch' },    // Modern Family
  { id: 62649, type: 'tv', category: 'rewatch' },   // Superstore
  { id: 1418, type: 'tv', category: 'rewatch' },    // TBBT
  { id: 49011, type: 'tv', category: 'rewatch' },   // Mom
  { id: 2691, type: 'tv', category: 'rewatch' },    // Two and a Half Men
  { id: 1668, type: 'tv', category: 'rewatch' },    // Friends
  { id: 62320, type: 'tv', category: 'rewatch' },   // Grace and Frankie

  // All-time Favorites
  { id: 120, type: 'movie', category: 'favorite' },   // LOTR: Fellowship
  { id: 121, type: 'movie', category: 'favorite' },   // LOTR: Two Towers
  { id: 122, type: 'movie', category: 'favorite' },   // LOTR: Return of the King
  { id: 62560, type: 'tv', category: 'favorite' },    // Mr. Robot
  { id: 4607, type: 'tv', category: 'favorite' },     // Lost
  { id: 1100, type: 'tv', category: 'favorite' },     // HIMYM
  { id: 672, type: 'movie', category: 'favorite' },   // Harry Potter Chamber of Secrets
  { id: 70523, type: 'tv', category: 'favorite' },    // Dark
  { id: 72844, type: 'tv', category: 'favorite' },    // The Haunting of Hill House
  { id: 63675, type: 'movie', category: 'favorite' },
  { id: 26910, type: 'movie', category: 'favorite' },
  { id: 7508, type: 'movie', category: 'favorite' },
  { id: 268660, type: 'movie', category: 'favorite' },
  { id: 550, type: 'movie', category: 'favorite' },   // Fight Club
  { id: 198277, type: 'movie', category: 'favorite' },// Begin Again
];

export const WATCHLIST_SECTIONS = [
  { key: 'current', title: 'Currently Watching' },
  { key: 'rewatch', title: 'Dinner & Lunch Rewatch Shows' },
  { key: 'waiting', title: 'Waiting for Next Season' },
  { key: 'favorite', title: 'All Time Favorites' },
] as const;
