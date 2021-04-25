import Sequelize, { Model } from "sequelize";

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        logradouro: Sequelize.STRING,
        endereco: Sequelize.STRING,
        numero: Sequelize.INTEGER,
        complemento: Sequelize.STRING,
        bairro: Sequelize.STRING,
        cidade: Sequelize.STRING,
        estado: Sequelize.STRING,
        cep: Sequelize.STRING, // complemento // Vistual quer dizer que ele só vai existir só no codigo e não no banc
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

  static associate (models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
    });
  }
}

export default Address;
