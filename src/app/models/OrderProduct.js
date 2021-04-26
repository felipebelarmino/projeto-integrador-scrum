import Sequelize, { Model } from "sequelize";

class PedidoProduto extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: Sequelize.INTEGER,
        price: Sequelize.DECIMAL,
        subtotal: Sequelize.DECIMAL,
        order_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "orders", //tabela
            key: "id", // coluna
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          allowNull: false,
        },
        product_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "products", //tabela
            key: "id", // coluna
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "order_products",
      }
    );
  }
}

export default PedidoProduto;
