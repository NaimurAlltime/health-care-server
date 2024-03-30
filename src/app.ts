import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { userRoutes } from "./app/modules/User/user.routes";
import { AdminRoutes } from "./app/modules/Admin/admin.routes";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundRouteHandler from "./app/middlewares/notFundRouteHandler";

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is working....!",
  });
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use(notFoundRouteHandler);

export default app;
