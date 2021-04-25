import { Router } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import AdminController from "./app/controllers/AdminController";
import ProdutoController from "./app/controllers/ProdutoController";
import Produto from "./app/models/Produto";

const routes = new Router();

//----------------------------------------------------------------
//GET UserController
//----------------------------------------------------------------
//Exibir todos users
routes.get("/users", UserController.findAllUsers);

//Encontrar user por id
routes.get("/user/:id", UserController.findOneUserById);

//Encontrar user por login
routes.get("/user-login", UserController.findOneUserByLogin);

//----------------------------------------------------------------
//POST UserController
//----------------------------------------------------------------
//Criar um user
routes.post("/user", UserController.store);

//Sessão JWT
routes.post("/session", SessionController.store);
//----------------------------------------------------------------
//GET UserController
//----------------------------------------------------------------
//Alterar usuário buscando pelo email no body
routes.post("/user/update", UserController.updateUser);

//Alterar usuário buscando pelo id no params
routes.post("/user/update/:id", UserController.updateUser);

//----------------------------------------------------------------
//GET AdminController
//----------------------------------------------------------------
//Exibir todos os admins
routes.get("/admin/all", AdminController.findAllAdmins);

//Encontrar admin por id
routes.get("/admin/:id", AdminController.findOneAdminById);

//Encontrar admin por login
routes.get("/admin", AdminController.findOneAdminByLogin);

//----------------------------------------------------------------
//POST AdminController
//----------------------------------------------------------------
//Criar admin
routes.post("/admin", AdminController.store);

//----------------------------------------------------------------

routes.post("/produtos", ProdutoController.store);
routes.get("/produtos", ProdutoController.index);
routes.put("/produtos/:id", ProdutoController.updade);
routes.delete("/produtos/:id", ProdutoController.delete);
export default routes;
