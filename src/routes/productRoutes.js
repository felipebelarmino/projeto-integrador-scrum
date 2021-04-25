import { Router } from "express";
import ProductController from "../app/controllers/ProductController";

const productRoutes = new Router();

//Cadastrar produto
productRoutes.post("/product", ProductController.store);

//Listar todos os produtos
productRoutes.get("/products", ProductController.findAllProducts);

//Listar produtos por nome (QUERY)
//http://localhost:porta/products?name=nome-do-produto
productRoutes.get("/products-query", ProductController.findProductsByName);

//Alterar produto
productRoutes.put("/product/:id", ProductController.updateProduct);

//Excluír produto
productRoutes.delete("/product/:id", ProductController.deleteProduct);

export default productRoutes;
