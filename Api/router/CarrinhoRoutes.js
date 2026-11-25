const router = require('express').Router();
const CarrinhoController = require('../Controller/CarrinhoController.js');
router.param('sessao', (req, res, next, sessao) => {
    if (!/^[a-f0-9-]{36}$/i.test(sessao)) return res.status(422).json({ message: 'Sessão inválida' });
    next();
});
router.get('/getAll/:sessao', CarrinhoController.getAll);
router.put('/update/:sessao', CarrinhoController.update);
router.delete('/delete/:sessao/:id', CarrinhoController.delete);
module.exports = router;
