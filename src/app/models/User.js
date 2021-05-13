import Sequelize, { Model } from "sequelize"; //importar o Model de dentro do sequelize
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING(20),
        surname: Sequelize.STRING(20),
        cpf: Sequelize.BIGINT(11),
        ddd: Sequelize.TINYINT(2),
        phone: Sequelize.INTEGER(9),
        login: Sequelize.STRING(45),
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
        avatar_id: Sequelize.INTEGER,
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
    this.hasMany(models.File, { foreignKey: "avatar_id" });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
