import express from 'express';
import UserController from '../controllers/user.js';


const router = express.Router();

router.get('/', (req, res) => {
  UserController.getUser(req, res);
});

router.post('/signup', (req, res) => {
  UserController.createUser(req, res);
});

router.put('/update', (req, res) => {
  UserController.updateUser(req, res);
});

router.delete('/delete', (req, res) => {
  UserController.deleteUser(req, res);
});

router.post('/login', (req, res) => {
  UserController.login(req, res);
})

export default router;