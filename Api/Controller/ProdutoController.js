const Produto = require('../model/Produto.js');

function validar(nome, preco, imagem) {
    if (typeof nome !== 'string' || !nome.trim() || nome.length > 255) return 'Informe um nome válido';
    if (preco === undefined || preco === null || String(preco).trim() === '' || !Number.isFinite(Number(preco)) || Number(preco) < 0 || Number(preco) > 99999999.99) return 'Informe um preço válido, maior ou igual a zero';
    if (imagem !== undefined) {
        if (typeof imagem !== 'string' || !/^data:image\/(jpeg|png);base64,[A-Za-z0-9+/]+={0,2}$/.test(imagem)) return 'Apenas imagens JPEG e PNG';
        const dados = Buffer.from(imagem.split(',')[1], 'base64');
        const png = dados.subarray(0, 8).toString('hex') === '89504e470d0a1a0a';
        const jpeg = dados.subarray(0, 3).toString('hex') === 'ffd8ff';
        if (dados.length > 2 * 1024 * 1024 || !(imagem.startsWith('data:image/png') ? png : jpeg)) return 'Imagem inválida ou maior que 2 MB';
    }
}
module.exports = class ProdutoController {
    static async create(req, res) {
        const { nome, preco, imagem } = req.body;
        const erro = validar(nome, preco, imagem);
        if (erro) return res.status(422).json({ message: erro });
        try {
            await Produto.create({ nome, preco, imagem });
            res.status(201).json({ message: 'Produto criado com sucesso!' });
        } catch (err) { res.status(500).json({ message: 'Erro ao criar produto' }); }
    }
    static async getAll(req, res) {
        try { res.json(await Produto.findAll()); }
        catch (err) { res.status(500).json({ message: 'Erro ao buscar produtos' }); }
    }
    static async getById(req, res) {
        try {
            const produto = await Produto.findByPk(req.params.id);
            if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
            res.json(produto);
        } catch (err) { res.status(500).json({ message: 'Erro ao buscar produto' }); }
    }
    static async update(req, res) {
        const { nome, preco, imagem } = req.body;
        const erro = validar(nome, preco, imagem);
        if (erro) return res.status(422).json({ message: erro });
        try {
            const produto = await Produto.findByPk(req.params.id);
            if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
            await produto.update({ nome, preco, ...(imagem !== undefined ? { imagem } : {}) });
            res.json({ message: 'Produto atualizado com sucesso' });
        } catch (err) { res.status(500).json({ message: 'Erro ao atualizar produto' }); }
    }
    static async delete(req, res) {
        try {
            const produto = await Produto.findByPk(req.params.id);
            if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
            await produto.destroy();
            res.json({ message: 'Produto deletado com sucesso' });
        } catch (err) { res.status(500).json({ message: 'Erro ao deletar produto' }); }
    }
};
