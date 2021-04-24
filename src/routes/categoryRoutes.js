import { Router } from "express";
import CategoryController from "../app/controllers/CategoryController";

const categoryRoutes = new Router();

//POST-CREATE
categoryRoutes.post("/category", CategoryController.store);
//PUT-UPDATE
categoryRoutes.put("/categories/:category", CategoryController.update);


export default categoryRoutes;