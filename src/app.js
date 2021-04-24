import express from "express";
import routes from "./routes";
import storeRoutes from "./routes/storeRoutes";

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
  }
}

export default new App().server;
