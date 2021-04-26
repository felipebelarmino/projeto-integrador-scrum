import AdminModel from "../models/AdminModel";

class AdminController {
  async store(request, response) {
    if (!request.body.name || !request.body.login || !request.body.password) {
      return response.status(400).json({
        ERROR: "Campos inválidos, favor preencher corretamente no formato:",
        request: {
          name: "nome",
          login: "seu-email",
          password: "sua-senha",
        },
      });
    }

    const userExists = await AdminModel.findOne({
      where: { login: request.body.login },
    });

    if (userExists) {
      return response.status(400).json({ error: "Administrador já existe!" });
    }

    const { id, name, login, active, provider } = await AdminModel.create(
      request.body
    );

    return response.json({
      message: "Administrador criado com sucesso!",
      admin: {
        id,
        name,
        login,
        active,
        provider,
      },
    });
  }

  async findAllAdmins(request, response) {
    const users = await AdminModel.findAll({ where: null });
    if (users.length < 1)
      return response.json({
        message: "Nenhum administrador cadastrado ainda.",
      });
    return response.json(users);
  }

  async findOneAdminById(request, response) {
    const admin = await AdminModel.findOne({
      where: { id: request.params.id },
    });

    if (!admin) {
      return response
        .status(400)
        .json({ error: "Administrador não encontrado!" });
    }

    return response.status(200).json(admin);
  }

  async findOneAdminByLogin(request, response) {
    const admin = await AdminModel.findOne({
      where: { login: request.body.login },
    });

    if (!admin) {
      return response
        .status(400)
        .json({ error: "Administrador não encontrado!" });
    }

    return response.status(200).json(admin);
  }

  async updateAdmin(request, response) {
    const { name, login, password } = request.body;

    if (!name || !login || !password) {
      return response.status(400).json({
        message: "Algum campo foi omitido na requisição!",
        formato: {
          name: "Nome",
          login: "Email",
          password: "Senha",
          provider: "true ou false",
          active: "true ou false",
        },
      });
    }

    const id = request.params.id;

    const admin = await AdminModel.update(request.body, {
      where: { id: id },
    });

    if (admin == 1) {
      response.send({
        message: "Cadastro atualizado com sucesso!",
      });
    } else {
      response.send({
        message: `Não foi possível atualizar o cadastro.`,
      });
    }
  }
}

export default new AdminController();
