import { Request, Response } from 'express';
import { Admin, Doctor, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";
import { fileUploader } from '../../../helpars/fileUploader';

const createAdmin = async (req: Request): Promise<Admin> => {
  const file = req.file as IFile | undefined; // Ensure file is properly typed

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData
    });

    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin
    });

    return createdAdminData;
  });

  return result;
};

const createDoctor = async (req: Request): Promise<Doctor> => {

  const file = req.file as IFile;

  if (file) {
      const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
      req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12)

  const userData = {
      email: req.body.doctor.email,
      password: hashedPassword,
      role: UserRole.DOCTOR
  }

  const result = await prisma.$transaction(async (transactionClient) => {
      await transactionClient.user.create({
          data: userData
      });

      const createdDoctorData = await transactionClient.doctor.create({
          data: req.body.doctor
      });

      return createdDoctorData;
  });

  return result;
};

export const userService = {
  createAdmin,
  createDoctor
};
