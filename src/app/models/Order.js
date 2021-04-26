import Sequelize, { Model } from "sequelize";

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        total: Sequelize.DECIMAL,
        completed: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: "orders",
      }
    );
  }

  // 1 usuário possui N pedidos
  // 1 pedido contém 1 endereço

  // N pedidos contêm N produtos
  static associate(models) {
    this.belongsToMany(
      models.Product, // nome da model à qual pertence
      {
        foreignKey: "order_id", // nome da chave estrangeira que se refere a esse model na tabela de ligação order-product
        through: "order_products", // nome da tabela de ligação
        as: "products", // apelido para o campo produto
      }
    );
  }
}

export default Order;
