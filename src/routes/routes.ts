import {Router} from 'express';
import { welcome } from '../controllers/control.js';

export const router = Router()

router.get('/welcome',welcome)