import File from "../models/FileModel";

class FileController {
  async store(request, response) {
    if (!response) return response.json({ message: "Campos vazios!" });

    const obj = JSON.parse(JSON.stringify(request.body));

    const loginFk = obj.body
    
    const { originalname: name, filename: path } = request.file;
     
    const file = await File.create({
      name,
      path,
      loginFk: loginFk,
    });

    return response.json(file);
  }
}

export default new FileController();
