import {Router} from 'express';
import MainControllers from '../controllers/control.js';
import "cookie-parser"

export const router = Router()

router.get('/welcome',MainControllers.welcome);
router.get('/login',MainControllers.loginGet)
router.post('/login',MainControllers.loginPost);
router.get('/signup',MainControllers.signUpGet)
router.post('/signup',MainControllers.signUpPost)