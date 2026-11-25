const router = require('express').Router();
const VendaController = require('../Controller/VendaController.js');
router.param('sessao', (req, res, next, sessao) => {
    if (!/^[a-f0-9-]{36}$/i.test(sessao)) return res.status(422).json({ message: 'Sessão inválida' });
    next();
});
router.post('/create/:sessao', VendaController.create);
router.get('/getAll/:sessao', VendaController.getAll);
module.exports = router;
