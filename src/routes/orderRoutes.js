import { Router } from "express";
import OrderController from "../app/controllers/OrderController";

const orderRoutes = new Router();

//Criar cadastro do pedido
orderRoutes.post("/user/:id/order", OrderController.store);

//Exibir todos os pedidos
orderRoutes.get("/user/:id/orders", OrderController.index);

export default orderRoutes;
