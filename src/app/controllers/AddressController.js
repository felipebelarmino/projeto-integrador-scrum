import AddressModel from "../models/AddressModel";

class AddressController {
  async store(request, response) {
    AddressModel.create(request.body)
      .then((data) => response.json(data))
      .catch((err) =>
        response
          .status(500)
          .json({ error: err.message || "Erro interno ao criar endereço" })
      );

    return response.json({
      message: "Endereço criado com sucesso!",
      address: {
        id,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep,
      },
    });
  }

  async findAllAddress(request, response) {
    const users = await AddressModel.findAll();
    if (users.length < 1)
      return response.json({
        message: "Nenhum endereço cadastrado ainda.",
      });
    return response.json(users);
  }

  async updateAddress(request, response) {
    const {
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
    } = request.body;

    if (
      !logradouro ||
      !numero ||
      !complemento ||
      !bairro ||
      !cidade ||
      !estado ||
      !cep
    ) {
      return response.status(400).json({
        message: "Algum campo foi omitido na requisição!",
        formato: {
          logradouro: "rua, avenida...",
          numero: "número",
          complemento: "apartamento, casa, trabalho",
          bairro: "bairro",
          cidade: "cidade",
          estado: "estado",
          cep: "cep",
        },
      });
    }

    const id = request.params.id;

    const address = await AddressModel.update(request.body, {
      where: { id: id },
    });

    if (address == 1) {
      response.send({
        message: "endereço atualizado com sucesso!",
      });
    } else {
      response.send({
        message: `Não foi possível atualizar o endereço.`,
      });
    }
  }

  async deleteById(request, response) {
    const id = request.params.id;
    const address = await AddressModel.destroy({
      where: { id: id },
      truncate: false,
    });

    if (address) {
      return response.status(200).json({
        message: `${address} endereço foi excluída com sucesso!`,
      });
    } else {
      return response.status(500).json({
        message: "Erro ao excluir o endereço.",
      });
    }
  }
}

export default new AddressController();
