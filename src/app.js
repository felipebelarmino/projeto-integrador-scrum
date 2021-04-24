import express from "express";
import routes from "./routes";
import storeRoutes from "./routes/storeRoutes";
import categoryRoutes from "./routes/categoryRoutes";


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
    this.server.use(routes);
    this.server.use(storeRoutes);
    this.server.use(categoryRoutes)
  }
}

export default new App().server;
