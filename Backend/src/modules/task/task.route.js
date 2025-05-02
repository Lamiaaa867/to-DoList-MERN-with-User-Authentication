import { isAuthentcated } from '../../middlewares/auth.js';
import { asyncHandler } from '../../utils/errorhandling.js';
import * as tackController from './task.controller.js'
import { Router } from 'express'
const router=Router();
router.post('/addtask',isAuthentcated,asyncHandler( tackController.addTask))
router.get('/getall',isAuthentcated,asyncHandler( tackController.getAllTasks))
router.patch('/edittask/:id',isAuthentcated,asyncHandler( tackController.updateTask))
router.get('/search/:searchKey',isAuthentcated,asyncHandler( tackController.getTasksTitle))
router.delete('/deletetask/:_id',isAuthentcated,asyncHandler( tackController.deleteTask))
export default router