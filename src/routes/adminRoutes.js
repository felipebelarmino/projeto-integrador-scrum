import { Router } from "express";
import AdminController from "../app/controllers/AdminController";

const adminRoutes = new Router();

//Exibir todos os admins
adminRoutes.get("/admin/all", AdminController.findAllAdmins);

//Encontrar admin por id
adminRoutes.get("/admin/:id", AdminController.findOneAdminById);

//Encontrar admin por login
adminRoutes.get("/admin", AdminController.findOneAdminByLogin);

//Criar admin
adminRoutes.post("/admin", AdminController.store);

//Alterar admin por id
adminRoutes.put("/admin/:id", AdminController.updateAdmin);


export default adminRoutes;
