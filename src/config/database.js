module.exports = {
  database: "db_infoway",
  username: "root",
  password: "ahnes2021",
  host: "localhost",
  dialect: "mysql",
  define: {
 //Forçar o sequelize utilizar o nome da tabela desejado
    timestamp: true, // Mostra createdAt...
    underscored: true, //Padronização de tabelas e colunas
    underscoredAll: true, //Padronização de tabelas e colunas
  },
};
