import express from 'express';
import healthRoutes from './healthRoutes.js';
import contactRoutes from './contactRoutes.js';
import codingStatsRoutes from './codingStatsRoutes.js';
import projectsRoutes from './projectsRoutes.js';

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/contact', contactRoutes);
router.use('/coding-stats', codingStatsRoutes);
router.use('/projects', projectsRoutes);

export default router;
