import { Router } from "express";
import CategoryController from "../app/controllers/CategoryController";

const categoryRoutes = new Router();

//POST-CREATE
categoryRoutes.post("/category", CategoryController.store);

//PUT-UPDATE
categoryRoutes.put("/categories/:category", CategoryController.update);

//GET-SEARCH BY CATEGORY
categoryRoutes.get("/categories/:category", CategoryController.show);

//GET ALL CATEGORIES
categoryRoutes.get("/categories", CategoryController.index);

//DELETE BY CATEGORY
categoryRoutes.delete("/categories/:category", CategoryController.delete);

//DELETE ALL CATEGORIES
categoryRoutes.delete("/category/:categories", CategoryController.deleteAll);


export default categoryRoutes;