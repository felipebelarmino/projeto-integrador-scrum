import Sequelize, { Model } from "sequelize";

class CategoryModel extends Model {
  static init(sequelize) {
    super.init(
      {
        category: Sequelize.STRING,
        featured: Sequelize.BOOLEAN
      },
      {
        sequelize,
        tableName: "categories",
      }
    );
  }
  /*
    //1 categoria contém N produtos
    */
  // static associate(models) {
  //   this.belongsTo(models.Product, {
  //     foreignKey: "product_id",
  //   });
  // }
}
export default CategoryModel;
