
# Loja - Aula 2

Projeto desenvolvido na disciplina de Programação Web, dando continuidade ao projeto iniciado em sala de aula.

## Funcionalidades

- Cadastro, listagem, edição e exclusão de produtos;
- Cadastro de imagens nos formatos JPEG e PNG;
- Validação do preço dos produtos;
- Carrinho de compras;
- Finalização e registro das vendas.

## Tecnologias utilizadas

- React
- Bootstrap
- Axios
- Node.js
- Express
- Sequelize
- MariaDB

## Como executar

Primeiro, crie o banco de dados no MariaDB:

```sql
CREATE DATABASE IF NOT EXISTS loja;
```

### API

Acesse a pasta Api:

```bash
cd Api
npm install
```

Configure as variáveis DB_NAME, DB_USER, DB_PASSWORD e DB_HOST de acordo com o seu banco de dados.

Depois, inicie a API:

```bash
npm start
```

### Front-end

Em outro terminal, a partir da pasta principal do projeto:

```bash
cd FrontEnd
npm install
npm start
```

## Rotas

- Loja: http://localhost:3000/home
- Produtos: http://localhost:3000/produtos
- API: http://localhost:5000

As tabelas do banco são criadas automaticamente pelo Sequelize ao iniciar a API.

