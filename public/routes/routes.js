import { Router } from 'express';
import { welcome } from '../controllers/control.js';
import "cookie-parser";
export const router = Router();
router.get('/welcome', welcome);
