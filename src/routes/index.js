import express from 'express';
import noteRoutes from './noteRoutes.js';

const router = express.Router();

router.use(noteRoutes);

export default router;
