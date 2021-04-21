import Sequelize from "sequelize";
import databaseConfig from "../config/database"; //importar credenciais
import User from "../app/models/User";
import AdminModel from "../app/models/AdminModel";
import Produto from "../app/models/Produto";

const users = [User];
const admins = [AdminModel];
const produto = [Produto];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig); //aqui eu tenho a conexão com DB

    users.map((model) => model.init(this.connection));
    admins.map((model) => model.init(this.connection));
    produto.map((model) => model.init(this.connection));
  }
}

export default new Database();


