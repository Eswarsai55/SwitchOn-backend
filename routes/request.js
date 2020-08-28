import express from 'express';
import RequestController from '../controllers/request.js';


const router = express.Router();

router.get('/', (req, res) => {
  RequestController.getRequests(req, res);
});

router.post('/create', (req, res) => {
  RequestController.createRequest(req, res);
});

router.put('/update', (req, res) => {
  RequestController.updateRequest(req, res);
});


export default router;