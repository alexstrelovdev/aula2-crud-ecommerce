
# Loja - Aula 2

Atividade da disciplina de Programação Web.

O projeto consiste em um sistema de cadastro de produtos e uma loja virtual com carrinho de compras e registro de vendas, utilizando como base o projeto da aula 2.

## Tecnologias

React, Bootstrap, Axios, Node.js, Express, Sequelize e MariaDB.

## Como executar

É necessário ter o Node.js e o MariaDB instalados.

Crie um banco de dados chamado `loja` e configure as variáveis DB_NAME, DB_USER, DB_PASSWORD e DB_HOST de acordo com seu banco.

### Back-end

```bash
cd Api
npm install
npm start
```

### Front-end

Em outro terminal:

```bash
cd FrontEnd
npm install
npm start
```

## Acesso

- Loja: http://localhost:3000/home
- Cadastro de produtos: http://localhost:3000/produtos

A API roda na porta 5000 e as tabelas são criadas automaticamente pelo Sequelize.
