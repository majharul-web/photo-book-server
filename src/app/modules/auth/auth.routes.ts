import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { UserValidation } from '../user/user.validation';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  AuthController.signUp
);

router.post(
  '/signin',
  validateRequest(AuthValidation.userLoginZodSchema),
  AuthController.signIn
);

export const AuthRoutes = router;
