import Sequelize from "sequelize";
import databaseConfig from "../config/database"; //importar credenciais
import User from "../app/models/User";
import FileModel from "../app/models/FileModel";
import AdminModel from "../app/models/AdminModel";
import Product from "../app/models/Product";
import Store from "../app/models/StoreModel";
import CategoryModel from "../app/models/CategoryModel";
import AddressModel from "../app/models/AddressModel";
import Order from "../app/models/Order";
import OrderProduct from "../app/models/OrderProduct";

const models = [User, AdminModel, Store, Product, CategoryModel, FileModel, AddressModel, Order, OrderProduct];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));

    AddressModel.associate(this.connection.models);
    Product.associate(this.connection.models); 
    Order.associate(this.connection.models);
    //CategoryModel.associate(this.connection.models);      
  }
}

export default new Database();
