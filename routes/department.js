import express from 'express';
import DepartmentController from '../controllers/department.js';

const router = express.Router();

router.get('/', (req, res) => {
  DepartmentController.getDepartment(req, res);
});

router.post('/create', (req, res) => {
  DepartmentController.createDepartment(req, res);
});

router.put('/update', (req, res) => {
  DepartmentController.updateDepartment(req, res);
});

router.delete('/delete', (req, res) => {
  DepartmentController.deleteDepartment(req, res);
});

export default router;