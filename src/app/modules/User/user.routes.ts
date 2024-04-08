import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../../helpars/fileUploader";

const router = express.Router();

router.post(
    "/create-admin", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), fileUploader.upload.single('file'), userController.createAdmin);

export const userRoutes = router;
