import { Router } from "express";
import UserController from "../app/controllers/UserController";

const userRoutes = new Router();

//Exibir todos users
userRoutes.get("/users", UserController.findAllUsers);

//Encontrar user por id
userRoutes.get("/user/:id", UserController.findOneUserById);

//Encontrar user por login
userRoutes.get("/user-login", UserController.findOneUserByLogin);

//Criar um user
userRoutes.post("/user", UserController.store);

//Alterar usuário buscando pelo id no params
userRoutes.put("/user/update/:id", UserController.updateUser);

//Excluir USer
userRoutes.delete("/user/:id", UserController.deleteUser);

export default userRoutes;