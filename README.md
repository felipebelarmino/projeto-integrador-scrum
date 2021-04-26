## Projeto integrador Digital House

Projeto de banco de dados de um e-commerce utilizando node express, sequelize e mysql.

### Rotas:

- Administrador da loja (Admin): criar, listar, alterar
- Loja (Store): criar, listar, alterar, excluir
- Clientes (User): criar, listar, alterar, excluir
- Endereços (Address): criar, listar, alterar, excluir
- Categoria de produtos (Category): criar, listar, alterar, excluir
- Produtos (Product): criar, listar, alterar, excluir
- Pedidos de compra (Order): criar, listar

#### Instruções

- Para instalar as dependencias:

```
npm install
```

- Para iniciar o servidor:

```
npm start
```

- Para criar nova migration:

```
npx sequelize-cli migration:generate --name migration-nome
```

- Para executar as migrations:

```
npx sequelize-cli db:migrate
```
