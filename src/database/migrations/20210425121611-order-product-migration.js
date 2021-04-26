"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("order_products", {
      id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,        
        primaryKey: true,
      },                  
      quantity: {
        type: Sequelize.INTEGER,        
      },
      price: {
        type: Sequelize.DECIMAL(9,2),        
      }, 
      subtotal: {
        type: Sequelize.DECIMAL(9,2),
        defaultValue: 0,
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'orders', key: 'id' },        
        onUpdate: 'CASCADE',  // Se o id do pedido for alterado, aqui tbm será
        onDelete: 'CASCADE'  // Se o pedido for excluído, aqui tbm será
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' },        
        onUpdate: 'CASCADE',  // Se o id do produto for alterado, aqui tbm será
        onDelete: 'CASCADE'  // Se o produto for excluído, aqui tbm será
      },      
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },   
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("order_products");
  },
};
