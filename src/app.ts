import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";

const app: Application = express();

app.use(cors());

app.get("/test", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is working....!",
  });
});

export default app;
