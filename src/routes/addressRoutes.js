import { Router } from "express";

import AddressController from '../app/controllers/AddressController';

const addressRoutes = new Router();

addressRoutes.post("/address", AddressController.store);

addressRoutes.get("/address", AddressController.findAllAddress);

addressRoutes.delete("/address/:id", AddressController.deleteById);

addressRoutes.put("/address/:id", AddressController.updateAddress);

export default addressRoutes;

