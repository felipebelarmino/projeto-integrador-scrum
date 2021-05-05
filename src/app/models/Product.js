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
        category_id: Sequelize.STRING,
        
        // {
        //   type: Sequelize.INTEGER,
        //   references: "categories",
        //   referencesKey: "id",
        // }
      },
      { 
        sequelize,
        tableName: "products",        
      }
    );
  }

  // Remove quantidade do produto do banco de dados
  async removeQuantity(itemsToBeRemoved){
    this.quantity -= itemsToBeRemoved;        

    // Se a quantidade de produtos chegar a zero, automaticamente ficará indisponível
    if (this.quantity === 0) {
      this.available = false;
    }

    await this.save({ fields: ['quantity', 'available'] });    
  }

  // N produtos pertencem a N pedidos
  static associate(models) {
    this.belongsToMany(
      models.Order, // nome da model à qual pertence
      {
        foreignKey: "product_id", // nome da chave estrangeira que se refere a esse model na tabela de ligação order-product
        through: "order_products", // nome da tabela de ligação
        as: "orders", // apelido para o campo pedido
      }
    );
    // this.belongsTo(models.CategoryModel, {
    //   foreignKey: "category_id",
    // });
  }
}

export default Product;