import Product from "../models/Product";
const { Op } = require("sequelize");

class ProductController {
  async store(request, response) {

    console.log(request.body)
    const productExists = await Product.findOne({
      where: { sku: request.body.sku },
    });

    if (productExists) {
      return response.status(400).json({
        error: "Já existe um produto com o mesmo SKU",
        productExists,
      });
    }

    Product.create(request.body)
      .then((data) => response.json(data))
      .catch((err) =>
        response
          .status(500)
          .json({ error: err.message || "Erro interno ao criar um produto" })
      );
  }


  async findAllProducts(request, response) {
        
    let conditions = request.query;

    if (conditions.name) {
      conditions.name = { [Op.like]: `%${conditions.name}%` };
    }    
    
    // Exemplo da estrutura da condição
    // const conditions = [{ name: { [Op.like]: '%e%' }}, {category_id: 1}];    
    const condition = { [Op.and]: conditions };

    Product.findAll({ where: condition })
      .then((data) => {
        if (data.length < 1)
          return response
            .status(400)
            .json({ message: "Produto não encontrado ou não cadastrado!" });

        response.json(data);
      })
      .catch((err) => {
        response.status(500).json({
          message: err.message || "Erro interno ao buscar produto.",
        });
      });
  }

  async findAllProductsByIds(request, response) {
    // let ids = [10, 2, 7];
    let ids = request.body;
    
    Product.findAll({ where: { id: ids }})
      .then((data) => {
        if (data.length < 1)
          return response
            .status(400)
            .json({ message: "Produto não encontrado ou não cadastrado!" });

        response.json(data);
      })
      .catch((err) => {
        response.status(500).json({
          message: err.message || "Erro interno ao buscar produto.",
        });
      });
  }

  async findProductsByName(request, response) {
    const productName = request.query.name;
    let condition = productName
      ? { name: { [Op.like]: `%${productName}%` } }
      : null;

    Product.findAll({ where: condition })
      .then((data) => {
        if (data.length < 1)
          return response
            .status(400)
            .json({ message: "Produto não encontrado ou não cadastrado!" });

        response.json(data);
      })
      .catch((err) => {
        response.status(500).json({
          message: err.message || "Erro interno ao buscar produto.",
        });
      });
  }


  async findProductById(request, response) {
    const id = request.params.id;
    const product = await Product.findOne({ where: { id: id } });

    if (!product) {
      return response.status(400).json({ error: "Produto não encontrado!" });
    }

    return response.status(200).json(product);
  }

  async updateProduct(request, response) {
    const id = request.params.id;
    Product.update(request.body, { where: { id: id } })
      .then((num) => {
        if (num == 1) {
          return response.json({ message: "Product atualizado" });
        } else {
          return response.json({ message: "Product não foi localizado" });
        }
      })
      .catch((err) => {
        return response
          .status(500)
          .json({ error: err.message || "Erro interno" });
      });
  }

  async deleteProduct(request, response) {
    Product.destroy({ where: { id: request.params.id } })
      .then((num) => {
        if (num == 1) {
          return response.json({ message: "Product excluído com sucesso" });
        }
        return response.json({ message: "Product não localizado" });
      })
      .catch((err) => {
        return response
          .status(500)
          .json({ error: err.message || "Erro interno ao excluir o produto" });
      });
  }
}

export default new ProductController();
