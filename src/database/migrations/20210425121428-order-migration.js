"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("orders", {
      id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,        
        primaryKey: true,
      },
      total: {
        type: Sequelize.DECIMAL(9,2),
        defaultValue: 0,        
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      // user_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: { model: 'users', key: 'id' },        
      //   onUpdate: 'CASCADE',  // Se o id do usuário for alterado, aqui tbm será
      //   onDelete: 'CASCADE'  // Se o usuário for excluído, aqui tbm será
      // },            
      // address_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      // },
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
    await queryInterface.dropTable("orders");
  },
};
