import { Router } from "express";
import SessionController from "../app/controllers/SessionController";

const sessionRoutes = new Router();

// //Sessão JWT login
sessionRoutes.post("/session", SessionController.store);

export default sessionRoutes;
