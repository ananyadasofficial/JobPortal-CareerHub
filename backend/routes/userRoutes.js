import express from 'express'
import { register} from '../controllers/userController.js'
import {login,logout} from "../controllers/userController.js"
import { isAuthenticated } from "../middlewares/auth.js";
import { getUser } from '../controllers/userController.js';

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser",isAuthenticated,getUser)
export default router;