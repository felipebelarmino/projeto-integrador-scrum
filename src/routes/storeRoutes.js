import { Router } from "express";
import StoreController from "../app/controllers/StoreController";

const storeRoutes = new Router();

//Criar cadastro da loja
storeRoutes.post("/stores", StoreController.store);

//Exibir todas as lojas cadastradas
storeRoutes.get("/stores", StoreController.findAll);

//Encontrar loja por cnpj
storeRoutes.get("/stores/:cnpj", StoreController.findByCnpj);

//Atualizar cadastro da loja
storeRoutes.put("/stores/:cnpj", StoreController.update);

//Excluir cadastro da loja por cnpj
storeRoutes.delete("/stores/:cnpj", StoreController.delete);

export default storeRoutes;
