import Sequelize, { Model } from "sequelize"; //importar o Model de dentro do sequelize

class Store extends Model {
  static init(sequelize) {
    super.init(
      {
        cnpj: Sequelize.BIGINT,
        name: Sequelize.STRING,
        description: Sequelize.STRING,            
      },
      {
        sequelize,
      }
    );
  }    
}

export default Store;
