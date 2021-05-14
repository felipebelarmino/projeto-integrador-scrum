import File from "../models/FileModel";

class FileController {
  async store(request, response) {
    if (!response) return response.json({ message: "Campos vazios!" });

    const obj = JSON.parse(JSON.stringify(request.body));

    const loginFk = obj.body;

    const { originalname: name, filename: path } = request.file;

    const file = await File.create({
      name,
      path,
      loginFk: loginFk,
    });

    return response.json(file);
  }

  async getAvatar(request, response) {

    // console.log(request.)

    if (!request.body.login)
      return response.status(400).json({
        error: "Campo login omitido! Siga o padrão:",
        body: {
          login: "email",
        },
      });

    const user = await File.findOne({
      where: { login_fk: request.body.login },
    });

    if (!user) {
      return response.status(400).json({ error: "Usuário não encontrado!" });
    }

    return response.status(200).json(user.url);
  }
}

export default new FileController();
