import Sequelize from "sequelize";
import databaseConfig from "../config/database"; //importar credenciais
import User from "../app/models/User";
import AdminModel from "../app/models/AdminModel";

const users = [User];
const admins = [AdminModel];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig); //aqui eu tenho a conexão com DB

    users.map((model) => model.init(this.connection));
    admins.map((model) => model.init(this.connection));
  }
}

export default new Database();


