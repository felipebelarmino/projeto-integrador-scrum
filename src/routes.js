import { Router } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import AdminController from "./app/controllers/AdminController";

const routes = new Router();

//----------------------------------------------------------------
//GET UserController
//----------------------------------------------------------------
//Exibir todos users
routes.get("/users/all", UserController.findAllUsers);

//Encontrar user por id
routes.get("/user/:id", UserController.findOneUserById)

//Encontrar user por login
routes.get("/user-by-login", UserController.findOneUserByLogin)


//----------------------------------------------------------------
//POST UserController
//----------------------------------------------------------------
//Criar um user
routes.post("/user", UserController.store);

//Sessão JWT
routes.post("/session", SessionController.store);


//----------------------------------------------------------------
//GET AdminController
//----------------------------------------------------------------
//Exibir todos os admins
routes.get("/admin/all", AdminController.findAllAdmins)

//Encontrar admin por id
routes.get("/admin/:id", AdminController.findOneAdminById)

//Encontrar admin por login
routes.get("/admin", AdminController.findOneAdminByLogin)

//----------------------------------------------------------------
//POST AdminController
//----------------------------------------------------------------
//Criar admin
routes.post("/admin", AdminController.store);

//----------------------------------------------------------------
export default routes;
