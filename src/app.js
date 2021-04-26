import express from "express";
import routes from "../src/routes";
import userRoutes from "./routes/userRoutes";
import storeRoutes from "./routes/storeRoutes";
import productRoutes from "./routes/productRoutes";
import adminRoutes from "./routes/adminRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import addressRoutes from "./routes/addressRoutes";
import orderRoutes from "./routes/orderRoutes";

import "./database/index";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(
      routes,
      userRoutes,
      storeRoutes,
      productRoutes,
      adminRoutes,
      categoryRoutes,
      addressRoutes,
      orderRoutes
    );
  }
}

export default new App().server;
