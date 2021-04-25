import Store from "../models/StoreModel";

class StoreController {
  async store(request, response) {
    const { cnpj, name, description } = request.body;

    if (!cnpj || !name) {
      return response.status(400).json({
        error: "Favor preencher corretamente todos os dados.",
      });
    }

    const storeExists = await Store.findOne({
      where: { cnpj },
    });

    if (storeExists) {
      return response
        .status(400)
        .json({ error: `O CNPJ ${cnpj} já está cadastrado!` });
    }

    await Store.create(request.body);

    return response.json({
      message: "Cadastro da loja efetuado com sucesso!",
      store: {
        name,
        cnpj,
        description,
      },
    });
  }

  async findAll(request, response) {
    const stores = await Store.findAll();

    if (stores.length < 1) {
      return response.json({ message: "Nenhuma loja cadastrada ainda." });
    }

    return response.json(stores);
  }

  async findByCnpj(request, response) {
    const cnpj = request.params.cnpj;

    if (!cnpj) {
      return response.status(400).json({
        error: "Favor preencher corretamente o CNPJ.",
      });
    }

    const store = await Store.findOne({
      where: { cnpj },
    });

    if (!store) {
      return response
        .status(400)
        .json({ error: `CNPJ ${cnpj} não encontrado.` });
    }

    return response.json(store);
  }

  async update(request, response) {
    const { cnpjNumber, name } = request.body;

    if (!cnpjNumber || !name) {
      return response.status(400).json({
        message: "Algum campo foi omitido na requisição!",
        formato: {
          cnpj: "CNPJ",
          name: "Nome da loja",
          description: "campo opcional",
        },
      });
    }

    const cnpj = request.params.cnpj;

    const store = await Store.update(request.body, {
      where: { cnpj: cnpj },
    });

    if (store == 1) {
      response.send({
        message: "Cadastro atualizado com sucesso!",
      });
    } else {
      response.send({
        message: `Não foi possível atualizar o cadastro. O CNPJ ${cnpj} não foi encontrado.`,
      });
    }
  }

  async delete(request, response) {
    const cnpj = request.params.cnpj;

    const deletedNumber = await Store.destroy({
      where: { cnpj: cnpj },
    });

    if (deletedNumber >= 1) {
      response.send({
        message: "Cadastro excluído com sucesso.",
      });
    } else {
      response.send({
        message: `Não foi possível excluir o cadastro. O CNPJ ${cnpj} não foi encontrado.`,
      });
    }
  }
}

export default new StoreController();

