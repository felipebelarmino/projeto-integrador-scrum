import Sequelize, { Model } from "sequelize";

class CategoryModel extends Model {
  static init(sequelize) {
    super.init(
      {
        category: Sequelize.STRING,
        product_id: {
          type: Sequelize.INTEGER,
          references: "products",
          referencesKey: "id",
        },
      },
      {
        sequelize,
        tableName: "categories",
      }
    );
  }
  /*
  //1 categoria contém N produtos
  static associate(models) {
    this.belongsTo(
      models.Product,
      {
        foreignKey: "product_id",
      }
    )
  }
  */
}
export default CategoryModel;
