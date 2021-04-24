import { Router } from "express";
import CategoryController from "../app/controllers/CategoryController";

const categoryRoutes = new Router();

//POST CATEGORY
categoryRoutes.post("/category", CategoryController.store);


export default categoryRoutes;