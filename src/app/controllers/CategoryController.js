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
        category,                         
      });        
    }   
}

export default new CategoryController();
