import { Model, Sequelize } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
        price: Sequelize.DECIMAL,
        sku: Sequelize.STRING,
        image: Sequelize.STRING,
        available: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: "products",
      }
    );
  }
}

export default Product;
