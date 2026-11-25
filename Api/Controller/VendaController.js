const Venda = require('../model/Venda.js');
const Carrinho = require('../model/Carrinho.js');
const Produto = require('../model/Produto.js');
const db = require('../db/conn.js');
module.exports = class VendaController {
    static async create(req, res) {
        try {
            const venda = await db.transaction(async transaction => {
                const carrinho = await Carrinho.findOne({ where: { sessao: req.params.sessao }, transaction, lock: transaction.LOCK.UPDATE });
                if (!carrinho || !carrinho.itens.length) throw new Error('Carrinho vazio');
                let total = 0;
                const itens = [];
                for (const item of carrinho.itens) {
                    const produto = await Produto.findByPk(item.produtoId, { transaction, lock: transaction.LOCK.UPDATE });
                    if (!produto) throw new Error('Produto indisponível');
                    total += Math.round(Number(produto.preco) * 100) * item.quantidade;
                    itens.push({ ...item, nome: produto.nome, preco: produto.preco });
                }
                const venda = await Venda.create({ sessao: req.params.sessao, total: (total / 100).toFixed(2), itens }, { transaction });
                await carrinho.update({ itens: [] }, { transaction });
                return venda;
            });
            res.status(201).json(venda);
        } catch (err) { res.status(422).json({ message: 'Não foi possível finalizar a venda. Confira o carrinho.' }); }
    }
    static async getAll(req, res) {
        try { res.json(await Venda.findAll({ where: { sessao: req.params.sessao } })); }
        catch (err) { res.status(500).json({ message: 'Erro ao buscar vendas' }); }
    }
};
