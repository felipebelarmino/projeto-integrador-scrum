import Sequelize, { Model } from "sequelize";

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        logradouro: Sequelize.STRING,
        numero: Sequelize.INTEGER(6),
        complemento: Sequelize.STRING,
        bairro: Sequelize.STRING,
        cidade: Sequelize.STRING,
        estado: Sequelize.STRING(2),
        cep: Sequelize.INTEGER(8), // complemento // Vistual quer dizer que ele só vai existir só no codigo e não no banc
        user_id: {
          type: Sequelize.INTEGER,
          references: "users",
          referencesKey: "id",
        },
      },
      {
        sequelize,
        tableName: "address",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
    });
  }
}

export default Address;
