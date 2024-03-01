import express from 'express';
import { forgotPassword, google, resetPassword, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);

export default router;