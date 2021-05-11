import { Router } from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import SessionController from "../app/controllers/SessionController";
import FileController from "../app/controllers/FileController";
import ProviderController from "../app/controllers/ProviderController";
import authMiddleware from "../app/middlewares/auth";
import UserController from "../app/controllers/UserController";

const userRoutes = new Router();
const upload = multer(multerConfig);

//Criar um user
userRoutes.post("/user", UserController.store);

//Fazer login
userRoutes.post("/session", SessionController.store);

//Autenticar
// userRoutes.use(authMiddleware);

//Listar todos os providers
userRoutes.get("/providers", ProviderController.index);

//Alterar usuario para avatar_id
userRoutes.put("/user/avatar", UserController.updateUser);

//Alterar usuário buscando pelo id no params
userRoutes.put("/user/update/:id", UserController.updateUser);

//Fazer upload de uma imagem para o avatar
userRoutes.post("/files", upload.single("file"), FileController.store);

//Exibir todos users
userRoutes.get("/users", UserController.findAllUsers);

//Encontrar user por id
userRoutes.get("/user/:id", UserController.findOneUserById);

//Encontrar user por login
userRoutes.get("/user-login", UserController.findOneUserByLogin);

//Excluir USer
userRoutes.delete("/user/:id", UserController.deleteUser);

export default userRoutes;
