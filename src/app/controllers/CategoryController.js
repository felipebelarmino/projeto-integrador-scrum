import CategoryModel from "../models/CategoryModel";
const { Op } = require("sequelize");

class CategoryController {
  //CREATE
  async store(request, response) {
    const { category } = request.body;

    const categoryExists = await CategoryModel.findOne({ where: { category } });

    if (!category) {
      return response.status(400).json({
        error: "O campo categoria precisa ser preenchido!",
      });
    }

    if (categoryExists) {
      return response.status(400).json({
        error: `A categoria ${request.body.category} já existe!`,
      });
    }

    await CategoryModel.create(request.body);

    return response.status(200).json({
      message: `Categoria ${category} cadastrada com sucesso!`,
    });
  }

  //UPDATE
  async update(request, response) {
    const category = request.params.category;
    const categoryUp = request.body.category;
    const categoryExists = await CategoryModel.findOne({
      where: { category: categoryUp },
    });

    if (!categoryUp || categoryUp.trim().length == 0 || categoryExists) {
      return response.status(400).json({
        error: `O campo está vazio ou a categoria ${categoryUp} já existe.`,
      });
    }

    const categoryNew = await CategoryModel.update(request.body, {
      where: { category: category },
    });

    if (categoryNew == 1) {
      return response.status(200).json({
        message: "Categoria atualizada com sucesso!",
      });
    } else {
      return response.status(400).json({
        message: `Não foi possível atualizar o cadastro. A categoria ${category} não foi encontrada.`,
      });
    }
  }

  //GET BY CATEGORY
  async show(request, response) {
    const category = request.params.category;

    if (!category) {
      return response.status(400).json({
        error: "Favor preencher o campo com o nome da categoria.",
      });
    }

    const Category = await CategoryModel.findOne({
      where: { category },
    });

    if (!Category) {
      return response.status(400).json({
        error: `A categoria ${category} não foi localizada.`,
      });
    }

    return response.status(200).json(category);
  }

  //GET ALL CATEGORIES
  async index(request, response) {
    let { key, value, complete } = request.query;

    let totalMatch = complete === true ? "" : "%";
    let condition =
      key && value
        ? { [key]: { [Op.like]: `${totalMatch}${value}${totalMatch}` } }
        : null;

    const categories = await CategoryModel.findAll({ where: condition });

    if (categories.lenght < 1) {
      return response.status(400).json({
        message: "Nenhuma categoria cadastrada.",
      });
    }

    return response.status(200).json(categories);
  }

  //DELETE BY CATEGORY
  async delete(request, response) {
    const category = request.params.category;

    const categoryDel = await CategoryModel.destroy({
      where: { category: category },
    });

    if (categoryDel == 1) {
      return response.status(200).json({
        message: `Categoria ${category} excluída com sucesso!`,
      });
    } else {
      return response.status(400).json({
        message: `Não foi possível excluir o cadastro. A categoria ${category} não foi localizada. `,
      });
    }
  }

  //DELETE ALL CATEGORIES
  async deleteAll(request, response) {
    const categoryAll = await CategoryModel.destroy({
      where: {},
      truncate: false,
    });

    if (categoryAll) {
      return response.status(200).json({
        message: `${categoryAll} categorias foram excluídas com sucesso!`,
      });
    } else {
      return response.status(500).json({
        message: "Erro ao excluir todas as categorias.",
      });
    }
  }
}

export default new CategoryController();
