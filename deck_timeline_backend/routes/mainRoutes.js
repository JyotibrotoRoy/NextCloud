import express from 'express';
import { getRootMessage, getGanttData } from '../controllers/mainController.js';

const router = express.Router();

router.get('/', getRootMessage);
router.get('/api/deck/:boardId/gantt', getGanttData);

export default router;
