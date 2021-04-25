import User from "../models/User";

class UserController {
  async store(request, response) {
    if (!request.body.name || !request.body.login || !request.body.password) {
      return response.status(400).json({
        ERROR: "Campos inválidos, favor preencher corretamente no formato:",
        request: {
          name: "nome",
          login: "email",
          password: "senha",
        },
      });
    }

    const userExists = await User.findOne({
      where: { login: request.body.login },
    });

    if (userExists) {
      return response.status(400).json({ error: "Usuário já existe!" });
    }

    const { id, name, login, active, provider } = await User.create(
      request.body
    );

    return response.json({
      message: "Usuário criado com sucesso!",
      user: {
        id,
        name,
        login,
        active,
        provider,
      },
    });
  }

  async findAllUsers(request, response) {
    const users = await User.findAll({ where: null });
    if (users.length < 1)
      return response.json({ message: "Nenhum usuário cadastrado ainda." });
    return response.json(users);
  }

  async findOneUserById(request, response) {
    const user = await User.findOne({ where: { id: request.params.id } });

    if (!user) {
      return response.status(400).json({ error: "Usuário não encontrado!" });
    }

    return response.status(200).json(user);
  }

  async findOneUserByLogin(request, response) {
    if (!request.body.login)
      return response.status(400).json({
        error: "Campo login omitido! Siga o padrão:",
        body: {
          login: "email",
        },
      });

    const user = await User.findOne({
      where: { login: request.body.login },
    });

    if (!user) {
      return response.status(400).json({ error: "Usuário não encontrado!" });
    }

    return response.status(200).json(user);
  }

  async updateUser(request, response) {
    const { name, login, password } = request.body;

    if (!name || !login || !password) {
      return response.status(400).json({ message: "Algum campo foi omitido na requisição!",
      formato: {
        name: "Nome",
        login: "Email",
        password: "Senha",
        provider: "true ou false",
        active: "true ou false",
      } });
    }

    const id = request.params.id;

    const user = await User.update(request.body, {
      where: { id: id },
    });

    if (user == 1) {
      response.send({
        message: "Cadastro atualizado com sucesso!",
      });
    } else {
      response.send({
        message: `Não foi possível atualizar o cadastro.`,
      });
    }
  }

  async deleteUser(request, response) {
    if (!request.body || !request.params.id)
      return response.json({
        message: "Informações inválidas, ou omitidas na requisição!",
      });

    const { id } = request.params;

    const deletedUser = await User.destroy({
      where: { id: id },
    });

    deletedUser === 1
      ? response.json({
          message: "Usuário excluído!",
        })
      : response.json({ message: "Usuário não encontrado ou já excluído!" });
  }
}

export default new UserController();
