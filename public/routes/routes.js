import { Router } from 'express';
import MainControllers from '../controllers/control.js';
//import  * as cookieParser from "cookie-parser"
const cookieParser = require('cookie-parser');
export const router = Router();
router.use(cookieParser());
router.use();
router.get('/welcome', MainControllers.welcome);
router.get('/login', MainControllers.loginGet);
router.post('/login', MainControllers.loginPost);
router.get('/signup', MainControllers.signUpGet);
router.post('/signup', MainControllers.signUpPost);
//# sourceMappingURL=routes.js.map