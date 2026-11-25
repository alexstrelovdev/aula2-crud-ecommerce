const Carrinho = require('../model/Carrinho.js');
const Produto = require('../model/Produto.js');
const db = require('../db/conn.js');

module.exports = class CarrinhoController {
    static async getAll(req, res) {
        try {
            const carrinho = await Carrinho.findOne({ where: { sessao: req.params.sessao } });
            const itens = [];
            for (const item of carrinho ? carrinho.itens : []) {
                const produto = await Produto.findByPk(item.produtoId);
                if (produto) itens.push({ ...item, nome: produto.nome, preco: produto.preco });
            }
            res.json(itens);
        } catch (err) { res.status(500).json({ message: 'Erro ao buscar carrinho' }); }
    }
    static async update(req, res) {
        const { produtoId, quantidade } = req.body;
        if (!Number.isInteger(produtoId) || !Number.isInteger(quantidade) || quantidade < 0 || quantidade > 999) return res.status(422).json({ message: 'Quantidade ou produto inválido' });
        try {
            await Carrinho.findOrCreate({ where: { sessao: req.params.sessao } });
            await db.transaction(async transaction => {
                const carrinho = await Carrinho.findOne({ where: { sessao: req.params.sessao }, transaction, lock: transaction.LOCK.UPDATE });
                if (quantidade && !await Produto.findByPk(produtoId, { transaction })) throw new Error('Produto não encontrado');
                const itens = carrinho.itens.filter(item => item.produtoId !== produtoId);
                if (quantidade) itens.push({ produtoId, quantidade });
                await carrinho.update({ itens }, { transaction });
            });
            res.json({ message: 'Carrinho atualizado' });
        } catch (err) { res.status(422).json({ message: 'Não foi possível atualizar o carrinho' }); }
    }
    static async delete(req, res) {
        req.body = { produtoId: Number(req.params.id), quantidade: 0 };
        return CarrinhoController.update(req, res);
    }
};
