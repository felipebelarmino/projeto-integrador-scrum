import User from "../models/User";
import FileModel from "../models/FileModel";

class ProviderController {
  async index(request, response) {
    const provider = await User.findAll({
      where: { provider: 0 },
      attributes: ["id", "name"],
      include: [
        {
          model: FileModel,
          as: "avatar",
          attributes: ["name", "path", "url"],
        },
      ],
    });

    return response.json(provider);
  }
}

export default new ProviderController();
