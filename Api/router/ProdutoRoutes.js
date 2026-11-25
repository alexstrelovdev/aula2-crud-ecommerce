//POST - ENVIAR NOVO CADASTRO
//GET - BUSCAR CADASTRO
//PATCH / PUT - ATUALIZAR CADASTRO
//DELETE - DELETAR

const router = require('express').Router();
const ProdutoController = require('../Controller/ProdutoController.js');

router.post('/create', ProdutoController.create);
router.get('/getAll', ProdutoController.getAll);
router.get('/getByID/:id', ProdutoController.getById);
router.put('/update/:id', ProdutoController.update);
router.delete('/delete/:id', ProdutoController.delete);

module.exports = router;