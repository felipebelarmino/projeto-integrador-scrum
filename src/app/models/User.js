import Sequelize, { Model } from "sequelize"; //importar o Model de dentro do sequelize
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        surname: Sequelize.STRING,
        cpf: Sequelize.BIGINT,
        ddd: Sequelize.TINYINT,
        phone: Sequelize.INTEGER,
        login: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: "users",
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.FileModel, { foreignKey: "avatar_id", as: "avatar" });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
