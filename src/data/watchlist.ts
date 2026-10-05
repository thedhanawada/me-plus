export interface MediaEntry {
  id: number;
  type: 'movie' | 'tv';
  category: 'current' | 'waiting' | 'rewatch' | 'favorite';
  title: string;
}

export const WATCHLIST_MEDIA: MediaEntry[] = [
  // Currently Watching
  { id: 71712, type: 'tv', category: 'current', title: 'The Good Doctor' },
  { id: 124364, type: 'tv', category: 'current', title: 'FROM' },
  { id: 197067, type: 'tv', category: 'current', title: 'Extraordinary Attorney Woo' },
  { id: 87917, type: 'tv', category: 'current', title: 'For All Mankind' },
  { id: 61692, type: 'tv', category: 'current', title: 'Fresh Off the Boat' },

  // Waiting for Next Season
  { id: 125988, type: 'tv', category: 'waiting', title: 'Silo' },
  { id: 250307, type: 'tv', category: 'waiting', title: 'The Pitt' },
  { id: 95396, type: 'tv', category: 'waiting', title: 'Severance' },

  // Dinner & Lunch Rewatch Shows
  { id: 1421, type: 'tv', category: 'rewatch', title: 'Modern Family' },
  { id: 62649, type: 'tv', category: 'rewatch', title: 'Superstore' },
  { id: 1418, type: 'tv', category: 'rewatch', title: 'The Big Bang Theory' },
  { id: 49011, type: 'tv', category: 'rewatch', title: 'Mom' },
  { id: 2691, type: 'tv', category: 'rewatch', title: 'Two and a Half Men' },
  { id: 1668, type: 'tv', category: 'rewatch', title: 'Friends' },
  { id: 62320, type: 'tv', category: 'rewatch', title: 'Grace and Frankie' },
  { id: 1424, type: 'tv', category: 'rewatch', title: 'Orange Is the New Black' },
  { id: 64010, type: 'tv', category: 'rewatch', title: 'Reply 1988' },

  // Favourites
  { id: 61859, type: 'tv', category: 'favorite', title: 'The Night Manager' },
  { id: 120, type: 'movie', category: 'favorite', title: 'The Lord of the Rings: The Fellowship of the Ring' },
  { id: 121, type: 'movie', category: 'favorite', title: 'The Lord of the Rings: The Two Towers' },
  { id: 122, type: 'movie', category: 'favorite', title: 'The Lord of the Rings: The Return of the King' },
  { id: 62560, type: 'tv', category: 'favorite', title: 'Mr. Robot' },
  { id: 4607, type: 'tv', category: 'favorite', title: 'Lost' },
  { id: 1100, type: 'tv', category: 'favorite', title: 'How I Met Your Mother' },
  { id: 672, type: 'movie', category: 'favorite', title: 'Harry Potter and the Chamber of Secrets' },
  { id: 70523, type: 'tv', category: 'favorite', title: 'Dark' },
  { id: 72844, type: 'tv', category: 'favorite', title: 'The Haunting of Hill House' },
  { id: 63675, type: 'movie', category: 'favorite', title: 'Mozhi' },
  { id: 26910, type: 'movie', category: 'favorite', title: 'Anbe Sivam' },
  { id: 7508, type: 'movie', category: 'favorite', title: 'Taare Zameen Par' },
  { id: 268660, type: 'movie', category: 'favorite', title: 'Bangalore Days' },
  { id: 550, type: 'movie', category: 'favorite', title: 'Fight Club' },
  { id: 198277, type: 'movie', category: 'favorite', title: 'Begin Again' },
  { id: 438631, type: 'movie', category: 'favorite', title: 'Dune' },
  { id: 693134, type: 'movie', category: 'favorite', title: 'Dune: Part Two' },
  { id: 1233413, type: 'movie', category: 'favorite', title: 'Sinners' },
  { id: 157336, type: 'movie', category: 'favorite', title: 'Interstellar' },
  { id: 46648, type: 'tv', category: 'favorite', title: 'True Detective' },
  { id: 71578, type: 'tv', category: 'favorite', title: 'Atypical' },
];

export const WATCHLIST_SECTIONS = [
  { key: 'current', title: 'Currently Watching' },
  { key: 'rewatch', title: 'Dinner & Lunch Rewatch Shows' },
  { key: 'waiting', title: 'Waiting for Next Season' },
  { key: 'favorite', title: 'Favourites' },
] as const;
