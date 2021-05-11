import express from "express";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import addressRoutes from "./routes/addressRoutes";
import orderRoutes from "./routes/orderRoutes";
import userRoutes from "./routes/userRoutes";
const cors = require('cors')
import path from "path";

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

import "./database/index";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors(corsOptions))
    this.server.use(express.json());
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
    );
  }

  routes() {
    this.server.use(
      productRoutes,
      categoryRoutes,
      addressRoutes,
      orderRoutes,
      userRoutes
    );
  }
}

export default new App().server;
