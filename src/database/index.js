import Sequelize from "sequelize";
import databaseConfig from "../config/database"; //importar credenciais
import User from "../app/models/User";
import AdminModel from "../app/models/AdminModel";
import Produto from "../app/models/Product";
import Store from "../app/models/StoreModel";
import CategoryModel from "../app/models/CategoryModel";

const models = [User, AdminModel, Store, Produto, CategoryModel];

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
