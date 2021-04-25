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

        const categoryUp = await CategoryModel.update(request.body, {
            where: { category: category },
          });
        
          if(!categoryUp) {
            return response.status(400).json({
                error: "O campo não pode estar vazio."
            });
          }        
         // Se não conseguir atualizar, dá erro e retorna zero
         // Se tudo correr bem, retorna 1
          if (categoryUp == 1) {
            response.send({
              message: "Categoria atualizada com sucesso!",
          });   

          } else {
            response.send({
              message: `Não foi possível atualizar o cadastro. A categoria ${category} não foi encontrada.`,
          });
        }
      }

      //GET BY CATEGORY
      async show(request, response) {
          const category = request.params.category;

          if(!category) {
            return response.status(400).json({
              error: "Favor preencher o campo com o nome da categoria."
            });
          }

          const Category = await CategoryModel.findOne({
            where: { category },
          });

          if (!Category) {
            return response.status(400).json({ 
              error: `A categoria ${category} não foi localizada.`
            });
          }

          return response.json(category);
      }

      //GET ALL CATEGORIES
      async index(request, response) {
          const categories = await CategoryModel.findAll();

          if (categories.lenght < 1) {
              return response.json({
                  message: "Nenhuma categoria cadastrada."
              });
          }

          return response.json(categories);
      }

      //DELETE BY CATEGORY
      async delete(request, response) {
          const category = request.params.category;

          const categoryDel = await CategoryModel.destroy({where: {category : category}});

          if (categoryDel == 1) {
              response.json({
                  message: `Categoria ${category} excluída com sucesso!`
              });
          }
          else{
              response.json({
                  message: `Não foi possível excluir o cadastro. A categoria ${category} não foi localizada. `
              })
          }

        

      }

}

export default new CategoryController();
