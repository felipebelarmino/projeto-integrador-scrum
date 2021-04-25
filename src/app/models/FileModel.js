import Sequelize, { Model } from "sequelize";

class FileModel extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: "files",
      }
    );
    return this;
  }
}

export default FileModel;
