import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { userRoutes } from "./app/modules/User/user.routes";

const app: Application = express();

app.use(cors());

app.get("/test", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is working....!",
  });
});

app.use("/api/v1/user", userRoutes);

export default app;
