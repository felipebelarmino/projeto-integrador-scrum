import { Router } from "express";
import CategoryController from "../app/controllers/CategoryController";

const categoryRoutes = new Router();

//POST-CREATE
categoryRoutes.post("/category", CategoryController.store);

//PUT-UPDATE
categoryRoutes.put("/category/:id", CategoryController.update);

//GET-SEARCH BY CATEGORY
categoryRoutes.get("/category/:category", CategoryController.show);

//GET ALL CATEGORIES
categoryRoutes.get("/category", CategoryController.index);

//DELETE BY CATEGORY
categoryRoutes.delete("/category/:category", CategoryController.delete);

//DELETE ALL CATEGORIES
categoryRoutes.delete("/category/", CategoryController.deleteAll);


export default categoryRoutes;