

import { Router } from "express";
import * as userController from './user.controller.js'
import { asyncHandler } from "../../utils/errorhandling.js";
import { isAuthentcated } from "../../middlewares/auth.js";
import { validationCore } from "../../middlewares/validation.js";
import { validationForUpdateUserData } from "./user.validation.schema.js";

const router =Router();
router.patch('/updateuserdata', isAuthentcated,validationCore(validationForUpdateUserData),asyncHandler(userController.updateData))
router.get('/display', isAuthentcated,asyncHandler(userController.displayUserData))



export default router
