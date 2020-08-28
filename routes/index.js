import express from 'express';
import departmentRoutes from './department.js';
import userRoutes from './user.js';
import requestRoutes from './request.js';

const router = express.Router();

router.use('/api/department', departmentRoutes);
router.use('/api/user', userRoutes);
router.use('/api/request', requestRoutes);


export default router;