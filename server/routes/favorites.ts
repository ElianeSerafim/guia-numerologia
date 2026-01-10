import { Router } from 'express';
import {
  createFavorite,
  getFavoritesByEmail,
  getFavoritesByMapId,
  deleteFavorite,
  updateFavorite,
  checkIfFavorited,
} from '../db';

const router = Router();

/**
 * GET /api/favorites
 * Get all favorites for a user by email
 */
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    const favorites = await getFavoritesByEmail(email);
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

/**
 * GET /api/favorites/map/:mapId
 * Get all favorites for a specific map
 */
router.get('/map/:mapId', async (req, res) => {
  try {
    const { mapId } = req.params;
    const favorites = await getFavoritesByMapId(parseInt(mapId));
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching map favorites:', error);
    res.status(500).json({ error: 'Failed to fetch map favorites' });
  }
});

/**
 * POST /api/favorites
 * Create a new favorite
 */
router.post('/', async (req, res) => {
  try {
    const { email, mapId, sectionType, sectionTitle, sectionContent, notes } = req.body;

    if (!email || !mapId || !sectionType || !sectionTitle || !sectionContent) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if already favorited
    const alreadyFavorited = await checkIfFavorited(email, mapId, sectionType);
    if (alreadyFavorited) {
      return res.status(409).json({ error: 'This section is already favorited' });
    }

    const favorite = await createFavorite({
      email,
      mapId,
      sectionType,
      sectionTitle,
      sectionContent,
      notes: notes || null,
    });

    res.status(201).json(favorite);
  } catch (error) {
    console.error('Error creating favorite:', error);
    res.status(500).json({ error: 'Failed to create favorite' });
  }
});

/**
 * PUT /api/favorites/:id
 * Update a favorite (mainly for notes)
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const favorite = await updateFavorite(parseInt(id), { notes });
    res.json(favorite);
  } catch (error) {
    console.error('Error updating favorite:', error);
    res.status(500).json({ error: 'Failed to update favorite' });
  }
});

/**
 * DELETE /api/favorites/:id
 * Delete a favorite
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteFavorite(parseInt(id));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ error: 'Failed to delete favorite' });
  }
});

export default router;
