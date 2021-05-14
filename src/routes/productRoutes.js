import { Router } from "express";
import ProductController from "../app/controllers/ProductController";

const productRoutes = new Router();

//Cadastrar produto
productRoutes.post("/product", ProductController.store);

//Listar todos os produtos com ou sem filtro (query) específico
//Exemplo: http://localhost:porta/product?name=nome-do-produto
productRoutes.get("/product", ProductController.findAllProducts);

// Obter produto por id
productRoutes.get("/product/:id", ProductController.findProductById);

// Obter array de produtos por lista de ids
productRoutes.post("/productsById", ProductController.findAllProductsByIds);

//Listar produtos por nome (QUERY)
//http://localhost:porta/product?name=nome-do-produto
// productRoutes.get("/product/:name", ProductController.findProductsByName);

//Alterar produto
productRoutes.put("/product/:id", ProductController.updateProduct);

//Excluír produto
productRoutes.delete("/product/:id", ProductController.deleteProduct);

export default productRoutes;
