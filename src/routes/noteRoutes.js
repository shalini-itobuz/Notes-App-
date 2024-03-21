import express from 'express';
import  mynoteController from "../controllers/noteController.js"

const router = express.Router();

router.post('/notes', mynoteController.createNote);
router.get('/get-all-notes', mynoteController.getAllNotes);
router.get('/get-notes-by-id/:id', mynoteController.getNoteById);
router.put('/update-notes/:id', mynoteController.updateNote);
router.delete('/delete-notes/:id',mynoteController.deleteNote);

router.get('/notes/search/:title',mynoteController.titleSearch);
router.get('/notes/last-three',mynoteController.lastThreeNotes);

export default router;
