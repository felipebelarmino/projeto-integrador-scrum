import { Router } from "express";
import AdminController from "../app/controllers/AdminController";
import authMiddleware from "../app/middlewares/auth";
import SessionController from "../app/controllers/SessionController";

const adminRoutes = new Router();

//Fazer login
adminRoutes.post("/admin/session", SessionController.adminStore);

//Autenticar
adminRoutes.use(authMiddleware);

//Exibir todos os admins
adminRoutes.get("/admin/all", AdminController.findAllAdmins);

//Criar admin
adminRoutes.post("/admin", AdminController.store);

//Encontrar admin por id
adminRoutes.get("/admin/:id", AdminController.findOneAdminById);

//Encontrar admin por login
adminRoutes.get("/admin", AdminController.findOneAdminByLogin);

//Alterar admin por id
adminRoutes.put("/admin/:id", AdminController.updateAdmin);


export default adminRoutes;
