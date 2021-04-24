import { Model, Sequelize } from "sequelize";

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
        quantidade: Sequelize.INTEGER,
        preco: Sequelize.DECIMAL,
        sku: Sequelize.STRING,
        imagem: Sequelize.STRING,
        disponivel: Sequelize.BOOLEAN,
      },
      { sequelize }
    );
  }
}

export default Produto;
