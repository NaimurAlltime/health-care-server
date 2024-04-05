import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
    "/create-admin", userController.createAdmin);

export const userRoutes = router;
