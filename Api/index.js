const express = require('express');
const app = express();
const port = 5000;
const conn = require('./db/conn.js');
const cors = require('cors');

app.use(express.json({ limit: '3mb' }));
app.use(cors({ credentials: true, origin: '*' }));

const produtoRoutes = require('./router/ProdutoRoutes.js');
app.use('/produto', produtoRoutes);
app.use('/carrinho', require('./router/CarrinhoRoutes.js'));
app.use('/venda', require('./router/VendaRoutes.js'));

conn
    .sync({ alter: true })
    .then(() => { app.listen(port, () => console.log('API rodando na porta ' + port)) })
    .catch((err) => console.log(err));
 