import express from 'express';
import { AboutController } from './about.controller';

const router = express.Router();

router.post('/create-about', AboutController.createAbout);
router.patch('/:id', AboutController.updateAbout);
router.delete('/:id', AboutController.deleteAbout);
router.get('/', AboutController.getAbout);

export const AboutRoutes = router;
