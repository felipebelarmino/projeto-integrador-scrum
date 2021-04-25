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
    
      return response.status(200).json({ 
          message: `Categoria ${category} cadastrada com sucesso!`,                                 
      });        
    }  
    
    //UPDATE
    async update(request, response) {
        const category = request.params.category;

        const categoryUp = await CategoryModel.update(request.body, {
            where: { category: category },
          });
          
         /*
        if((!categoryUp) || (categoryUp == category)) {
            return response.status(400).json({
                error: `O campo está vazio ou a categoria ${categoryUp} já existe.`
            });
          } 
          */
              
          if (categoryUp == 1) {
            return response.status(200).json({
              message: "Categoria atualizada com sucesso!",
          });   

          } else {
            return response.status(400).json({
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

          return response.status(200).json(category);
      }

      //GET ALL CATEGORIES
      async index(request, response) {
          const categories = await CategoryModel.findAll();

          if (categories.lenght < 1) {
              return response.status(400).json({
                  message: "Nenhuma categoria cadastrada."
              });
          }

          return response.status(200).json(categories);
      }

      //DELETE BY CATEGORY
      async delete(request, response) {
          const category = request.params.category;

          const categoryDel = await CategoryModel.destroy({where: {category : category}});

          if (categoryDel == 1) {
              return response.status(200).json({
                  message: `Categoria ${category} excluída com sucesso!`
              });
          }
          else{
              return response.status(400).json({
                  message: `Não foi possível excluir o cadastro. A categoria ${category} não foi localizada. `
              });
          }      
      }

      //DELETE ALL CATEGORIES
      async deleteAll(request, response) {
        
        const categoryAll = await CategoryModel.destroy({where: {}, truncate: false});

        if (categoryAll) {
            return response.status(200).json({
                message: `${categoryAll} categorias foram excluídas com sucesso!`
            });
        }
        else {
             return response.status(500).json({
                message: "Erro ao excluir todas as categorias."
            });
        }      
    }
}

export default new CategoryController();
