import Sequelize from "sequelize";
import databaseConfig from "../config/database"; //importar credenciais
import User from "../app/models/User";
import AdminModel from "../app/models/AdminModel";
import Produto from "../app/models/Produto";
import Store from "../app/models/StoreModel";

const models = [User, AdminModel, Store, Produto];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));    
  }
}

export default new Database();
