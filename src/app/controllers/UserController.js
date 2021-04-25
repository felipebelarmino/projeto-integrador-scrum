import * as Yup from "yup";
import User from "../models/User";

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      login: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({
        yup: await schema.isValid(request.body),
        request: request.body,
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
    const schema = Yup.object().shape({
      name: Yup.string(),
      login: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) => {
          oldPassword ? field.required() : field;
        }),
      confirmPassword: Yup.string().when("password", (password, field) => {
        password ? field.required().oneOf([Yup.ref("password")]) : field;
      }),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ erro: "Falha ao validar campos!" });
    }

    console.log(request.userId);

    const { login, oldPassword } = request.body;

    const user = await User.findByPk(request.userId);

    if (login && login !== user.login) {
      const userExists = await User.findOne({ where: { login } });

      if (userExists) {
        return response.status(400).json({ erro: "Usuário já existe!" });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return response.status(400).json({ erro: "Senha não corresponde." });
    }

    const { name, provider } = await user.update(request.body);

    return response.json({
      mensagem: "Usuário alterado com sucesso para o seguinte:",
      usuario: {
        name,
        login,
        provider,
      },
    });
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
