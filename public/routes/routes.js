import { Router } from 'express';
import { loginGet, signUpGet, signUpPost, welcome } from '../controllers/control.js';
import "cookie-parser";
export const router = Router();
router.get('/welcome', welcome);
router.get('/login', loginGet);
router.get('/signup', signUpGet);
router.post('/signup', signUpPost);
//# sourceMappingURL=routes.js.map