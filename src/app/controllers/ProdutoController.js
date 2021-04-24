import Produto from "../models/Produto";

class ProdutoController {
    async store(request, response) {
        const produtoExiste = await Produto.findOne(
            { where: { nome: request.body.nome } }
        );

        if (produtoExiste) {
            return response.status(400).json({ error: "Já existe um produto com o mesmo nome" });
        }

        Produto.create(request.body)
            .then(data => response.json(data))
            .catch(err => response.status(500).json({ error: err.message || "Erro interno ao criar um produto" }));
    };

    async index(request, response) {
        Produto.findAll({ where: null })
            .then(data => {
                if (data.length < 1) {
                    return response.json({ message: "Nenhum produto cadastrado" });
                }
                return response.json(data)
            })
            .catch(err => response.status(500).json({ error: err.message || "Erro interno ao acessar os dados" }));

    };

    async updade(request, response) {
        const id = request.params.id;
        Produto.update(request.body, { where: { id: id } })
            .then(num => {
                if (num == 1) {
                    return response.json({ message: "Produto atualizado" });
                }
                else {
                    return response.json({ message: "Produto não foi localizado" });
                }
            })  
            .catch(err => {
                return response.status(500).json({ error: err.message || "Erro interno" });
            })
    };

    async delete(request, response) {
        Produto.destroy({ where: { id: request.params.id } })
            .then(num => {
                if (num == 1) {
                    return response.json({ message: "Produto excluído com sucesso" });
                }
                return response.json({ message: "Produto não localizado" });
            })
            .catch(err => {
                return response.status(500)
                    .json({ error: err.message || "Erro interno ao excluir o produto" })
            })
    }
}

export default new ProdutoController();