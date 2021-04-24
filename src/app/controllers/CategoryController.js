import CategoryModel from '../models/CategoryModel';

class CategoryController {

    //CREATE
    async store(request, response) {

        const { category } = request.body;
        const categoryExists = await CategoryModel.findOne({ where: { category } });
        
        if(!category) {
            return response.status(400).json({
              error: "O campo categoria precisa ser preenchido!",
            });
          }

        if(categoryExists) {
            return response.status(400).json({ 
                error:`A categoria ${request.body.category} já existe!`});
        }
      
      await CategoryModel.create(request.body);
    
      return response.json({ 
          message: "Cadastro realizado com sucesso!",        
        category,                         
      });        
    }  
    
    //UPDATE
    async update(request, response) {
        const category = request.params.category;
        const categoryAt = await CategoryModel.update(request.body, {
            where: { category: category },
          });
        
        // Se não conseguir atualizar, dá erro e retorna zero
        // Se tudo correr bem, retorna 1
        if (categoryAt == 1) {
          response.send({
            message: "Cadastro atualizado com sucesso!",
          });   

        } else {
          response.send({
            message: `Não foi possível atualizar o cadastro. A categoria ${category} não foi encontrada.`,
          });
        }
      }
}

export default new CategoryController();
