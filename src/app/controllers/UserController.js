import User from "../models/User";

class UserController {
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

  //----------------------------------------------------------------

  async findAllUsers(request, response) {
    const users = await User.findAll({ where: null });
    if (users.length < 1)
      return response.json({ message: "Nenhum usuário cadastrado ainda." });
    return response.json(users);
  }

  //----------------------------------------------------------------

  async findOneUserById(request, response) {
    const user = await User.findOne({ where: { id: request.params.id } });

    if (!user) {
      return response.status(400).json({ error: "Usuário não encontrado!" });
    }

    return response.status(200).json(user);
  }

  //----------------------------------------------------------------

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

  //----------------------------------------------------------------

  async updateUser(request, response) {
    if (!request.body || !request.params)
      return response.json({
        message: "Informações inválidas, ou omitidas na requisição!",
      });

    const { id } = request.params; //Acha pelo parametro da url ( id )

    const user = await User.findOne({
      //Acha pelo parametro do body ( login )
      where: { login: request.body.login },
    });

    if (!user) {
      return response.status(400).json({ error: "Usuário não encontrado!" });
    }

    const { name, login, provider } = await User.update(request.body);

    return response.json({
      message: "Usuário alterado com sucesso!",
      user: {
        id,
        name,
        login,
        provider,
      },
    });
  }
}

export default new UserController();
