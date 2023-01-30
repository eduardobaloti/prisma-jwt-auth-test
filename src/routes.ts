import { Router } from 'express'
import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';
import { AuthMiddleware } from './middleware/auth';

export const router = Router();
const userController = new UserController

const authController = new AuthController


router.get('/', async(req, res) => {
    return res.json({sarver: "server"})
})


router.get('/show', AuthMiddleware, userController.show)
router.post("/create", userController.store)
router.post("/auth", authController.auth)