import Sequelize, { Model } from "sequelize";

class FileModel extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        login_fk: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3030/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: "files",
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "avatar_id",
    });
  }
}

export default FileModel;
