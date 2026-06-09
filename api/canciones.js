const { kv } = require('@vercel/kv');

const STORAGE_KEY = 'matrimonio:canciones';

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const items = toArray(await kv.get(STORAGE_KEY));
      return res.status(200).json(items);
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const title = typeof body?.title === 'string' ? body.title.trim() : '';
      const artist = typeof body?.artist === 'string' ? body.artist.trim() : '';

      if (!title || !artist) {
        return res.status(400).json({ error: 'Cancion y artista obligatorios.' });
      }

      const stamp = new Date().toISOString();
      const item = {
        id: typeof body?.id === 'string' && body.id ? body.id : `${Date.now()}`,
        title,
        artist,
        createdAt: typeof body?.createdAt === 'string' && body.createdAt ? body.createdAt : stamp
      };

      const items = toArray(await kv.get(STORAGE_KEY));
      items.unshift(item);
      await kv.set(STORAGE_KEY, items);
      return res.status(201).json(item);
    }

    if (req.method === 'DELETE') {
      const id = typeof req.query?.id === 'string' ? req.query.id : '';
      if (!id) {
        return res.status(400).json({ error: 'ID obligatorio.' });
      }

      const items = toArray(await kv.get(STORAGE_KEY));
      const filtered = items.filter((entry) => entry && entry.id !== id);
      await kv.set(STORAGE_KEY, filtered);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET,POST,DELETE');
    return res.status(405).json({ error: 'Metodo no permitido.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error interno.';
    return res.status(500).json({ error: message });
  }
};
