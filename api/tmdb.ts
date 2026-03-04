import type { VercelRequest, VercelResponse } from '@vercel/node';

const TMDB_API_BASE = 'https://api.themoviedb.org/3';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, id } = req.query;

  if (!type || !id || (type !== 'movie' && type !== 'tv')) {
    return res.status(400).json({ error: 'Invalid parameters. Required: type (movie|tv), id (number)' });
  }

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'TMDB API key not configured' });
  }

  try {
    const response = await fetch(`${TMDB_API_BASE}/${type}/${id}?api_key=${apiKey}`);

    if (!response.ok) {
      return res.status(response.status).json({ error: `TMDB API error: ${response.statusText}` });
    }

    const data = await response.json();

    // Cache for 1 hour on Vercel's CDN
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch from TMDB' });
  }
}
