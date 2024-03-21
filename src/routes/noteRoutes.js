import express from 'express';
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  titleSearch,
  lastThreeNotes
} from '../controllers/noteController.js';

const router = express.Router();

router.post('/notes', createNote);
router.get('/get-all-notes', getAllNotes);
router.get('/get-notes-by-id/:id', getNoteById);
router.put('/update-notes/:id', updateNote);
router.delete('/delete-notes/:id', deleteNote);

router.get('/notes/search/:title',titleSearch);
router.get('/notes/last-three',lastThreeNotes);

export default router;
