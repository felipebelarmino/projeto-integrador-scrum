"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("stores", {
      id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,        
        primaryKey: true,
      },
      cnpj: {
        type: Sequelize.BIGINT,
        allowNull: false,        
        unique: true,
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },            
      description: {
        type: Sequelize.STRING,
        allowNull: true,
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("stores");
  },
};
