import Sequelize, { Model } from 'sequelize';

class CategoryModel extends Model {
    static init(sequelize) {
        super.init({
            category: Sequelize.STRING,
        }, 
        {
            sequelize,
            tableName: 'categories',
        });
    }
}
export default CategoryModel;