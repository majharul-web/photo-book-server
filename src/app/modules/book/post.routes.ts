import express from 'express';
import { PostController } from './post.controller';

const router = express.Router();

router.post('/create-post', PostController.createPost);

router.patch('/:id', PostController.updatePost);
router.patch('/review/:id', PostController.reviewPost);
router.patch('/like/:id', PostController.LikePost);

router.get('/:id', PostController.getSinglePost);
router.delete('/:id', PostController.deleteSinglePost);
router.get('/', PostController.getAllPosts);

export const postRoutes = router;
