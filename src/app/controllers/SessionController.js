import jwt from "jsonwebtoken";
import User from "../models/User";
import authConfig from "../../config/auth";

class SessionController {
  async store(request, response) {
    console.log(request.body);

    const { login, password } = request.body;

    const user = await User.findOne({ where: { login } });

    if (!user) {
      return response.status(401).json({ error: "Usuário não existe" });
    }

    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ error: "Senha não confere" });
    }

    const { id, name, provider } = user;

    const ROLE = provider ? "ROLE_ADMIN" : "ROLE_USER";

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    console.log(ROLE);

    return response.status(200).json({
      id: id,
      name: name,
      username: login,
      email: login,
      roles: ROLE,
      accessToken: token,
    });
  }
}

export default new SessionController();
