import Order from "../models/Order";
import Product from "../models/Product";
import OrderProduct from "../models/OrderProduct";

class OrderController {

  async index(request, response) {
    // Obtém da rota o id do usuário
    const { user_id } = request.params.id;

    const orders = await Order.findAll({
      attributes: ['id', 'total'],
      include: { 
        association: 'products', 
        attributes: ['name'], 
        through: {
          attributes: ['quantity', 'price', 'subtotal']
        }} 
    });        
    if (orders.length < 1) {
        return response.json({ message: "Nenhum pedido registrado." });
    }

    return response.json(orders);    
  }

  //----------------------------------------------------------------

  async store(request, response) {
    
    // Obtém da rota o id do usuário
    const { user_id } = request.params.id;

    // ******** IMPLEMENTAR ********* 
    // Verifica o token
    // Verifica se o user existe
    // Se não existir, dá erro
    // ********************************
    
    // Obtém o array de produtos
    const { products } = request.body;

    // Se não houver nenhum item, dá erro
    if (!products || products.length === 0) {
      return response.status(400).json({
        error: "Favor adicionar produto ao pedido."
      });
    }
    
    // Para cada item do pedido:  
    for (const item of products) {
      // Confere se existe um registro dele no banco de dados
      const product = await Product.findByPk(item.product_id);     
      if (!product) {        
        return response.status(400).json({ error: `Erro no pedido. Produto com #id ${item.product_id} não encontrado.` });
      }

      // Verifica se há quantidade suficiente no estoque
      if (product.dataValues.quantity < item.quantity) {        
        return response.status(400).json({ error: `Erro no pedido. Quantidade insuficiente no estoque do produto #id ${item.product_id}.` });
      }
    }

    // Se todos os produtos estiverem ok
    // Registra o pedido, mas com o campo "total" zerado (será adicionado mais à frente no BD)
    let order = await Order.create();
    
    let total = 0;

    // Para cada item do pedido:  
    for (const item of products) {

      // Obtém o produto correspondente
      const product = await Product.findByPk(item.product_id);      

      // Remove a quantidade de produtos disponíveis
      product.quantity -= item.quantity;
      await product.save({ fields: ['quantity'] });

      // Obtém preço e calcula o subtotal
      const price = product.dataValues.price;
      const subtotal = item.quantity * price;

      // Soma o valor ao total        
      total = total + subtotal;
      console.log('\nsomando subtotal ao total', subtotal, "\n")
                    
      // Adiciona o registro na tabela de ligação order-product
      await OrderProduct.create({
        price,
        quantity: item.quantity,
        subtotal,        
        order_id: order.id,
        product_id: item.product_id,
      });

      // Registra informações do produto somente para exibir no response:
      item.name = product.dataValues.name;
      item.price = product.dataValues.price;
      item.subtotal = subtotal;
    }
    
    // Adiciona o valor do total do pedido no banco de dados        
    order.total = total;    
    await order.save({ fields: ['total'] });        
        
    return response.json({
      message: "Pedido efetuado com sucesso!",
      products,
      total
    });     
  }
}

export default new OrderController();