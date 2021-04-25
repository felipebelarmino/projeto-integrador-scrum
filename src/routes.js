import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FileController"
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();
const upload = multer(multerConfig);

//routes.post("/session", SessionController.store);
//routes.use(authMiddleware);
routes.post("/files", upload.single("file"), FileController.store);

export default routes;
