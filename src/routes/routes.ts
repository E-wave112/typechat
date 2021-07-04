import {Router} from 'express';
import MainControllers from '../controllers/control.js';
//import  * as cookieParser from "cookie-parser"
import cookieParser from 'cookie-parser';

export const router = Router()

router.use(cookieParser())

router.get('/welcome',MainControllers.welcome);
router.get('/login',MainControllers.loginGet)
router.post('/login',MainControllers.loginPost);
router.get('/signup',MainControllers.signUpGet)
router.post('/signup',MainControllers.signUpPost)