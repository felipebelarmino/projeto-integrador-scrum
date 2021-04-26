import Order from "../models/Order";
import Product from "../models/Product";
import OrderProduct from "../models/OrderProduct";

class OrderController {
  async index(request, response) {
    // Obtém da rota o id do usuário
    const { user_id } = request.params.id;

    const orders = await Order.findAll({
      attributes: ["id", "total"],
      include: {
        association: "products",
        attributes: ["name"],
        through: {
          attributes: ["quantity", "price", "subtotal"],
        },
      },
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
        error: "Favor adicionar produto ao pedido.",
      });
    }
    
    let total = 0;

    // Para cada item do pedido:  
    for (const item of products) {
      // Confere se existe um registro dele no banco de dados
      const product = await Product.findByPk(item.product_id);
      if (!product) {
        return response
          .status(400)
          .json({
            error: `Erro no pedido. Produto com #id ${item.product_id} não encontrado.`,
          });
      }

      // Se o produto estiver indisponível ou houver quantidade insuficiente no estoque
      if (!product.available || product.dataValues.quantity < item.quantity) {        
        return response.status(400).json({ error: `Erro no pedido. Produto #id ${item.product_id} indisponível ou quantidade insuficiente no estoque.` });
      }

      // Obtém preço e calcula o subtotal
      item.price = product.dataValues.price;
      const subtotal = item.quantity * product.dataValues.price;

      // Verifica se esse subtotal está igual ao recebido pelo front
      if (subtotal !== item.subtotal) {        
        return response.status(400).json({ error: `Erro no pedido. Valor subtotal do produto #id ${item.product_id} não confere.` });
      }

      // Soma o valor ao total        
      total = total + subtotal;
    }

    // Verifica se o total calculado está igual ao recebido pelo front
    if (total !== request.body.total) {        
      return response.status(400).json({ error: `Erro no pedido. Valor total não confere.` });
    }

    // Se todos os produtos e os cálculos estiverem ok
    // Registra o pedido...
    let order = await Order.create(request.body.total);
    
    // ... E os itens
    // Para cada item do pedido:  
    for (const item of products) {
      // Obtém o produto correspondente
      const product = await Product.findByPk(item.product_id);

      // Remove a quantidade de produtos disponíveis
      await product.removeQuantity(item.quantity);      
                    
      // Adiciona o registro na tabela de ligação order-product
      await OrderProduct.create({
        price: item.price,
        quantity: item.quantity,
        subtotal: item.subtotal,        
        order_id: order.id,
        product_id: item.product_id,
      });

      // Registra informações do produto somente para exibir no response:
      item.name = product.dataValues.name;
      item.price = product.dataValues.price;      
    }    
        
    return response.json({
      message: "Pedido efetuado com sucesso!",
      products,
      total,
    });
  }
}

export default new OrderController();