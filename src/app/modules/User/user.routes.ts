import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
    "/create-admin", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), userController.createAdmin);

export const userRoutes = router;
