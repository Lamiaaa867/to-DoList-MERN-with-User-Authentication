import { Router } from "express";
import * as authController from './auth.controller.js'
import { asyncHandler } from "../../utils/errorhandling.js";
import { isAuthentcated } from "../../middlewares/auth.js";
import { validationCore } from "../../middlewares/validation.js";
import { logInValidationSchema, signUpSchema} from "./authValidationSchema.js";
const router =Router();
router.post('/signup',validationCore(signUpSchema),asyncHandler(authController.signUp))
router.post('/login',validationCore(logInValidationSchema),asyncHandler(authController.logIn))

router.post('/logout',isAuthentcated,asyncHandler(authController.logOut))


export default router
