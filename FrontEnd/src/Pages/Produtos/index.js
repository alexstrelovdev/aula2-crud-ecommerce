import { useState, useEffect, useRef } from 'react';
import InputGroup from '../../Components/inputGroup';
import useProduto from '../../hooks/useProduto';

const Produto = () => {
    const [produto, setProduto] = useState({ nome: '', preco: '' });
    const [lstProdutos, setlstProdutos] = useState([]);
    const [arquivo, setArquivo] = useState(null);
    const [ocupado, setOcupado] = useState(false);
    const inputImagem = useRef(null);
    const { getAll, getById, create, update, remove } = useProduto();
    useEffect(() => { getAll().then(setlstProdutos).catch(() => alert('Erro ao buscar produtos')); }, [getAll]);
    function handleChange(e) { setProduto({ ...produto, [e.target.name]: e.target.value }); }
    function limpar() {
        setProduto({ nome: '', preco: '' }); setArquivo(null);
        inputImagem.current.value = '';
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!produto.nome.trim() || produto.preco === '' || Number(produto.preco) < 0) return alert('Informe nome e preço válido');
        setOcupado(true);
        try {
            const dados = { nome: produto.nome, preco: produto.preco };
            if (arquivo) {
                if (!/\.(jpeg|png)$/i.test(arquivo.name) || !['image/jpeg', 'image/png'].includes(arquivo.type) || arquivo.size > 2 * 1024 * 1024) throw new Error('Selecione uma imagem .jpeg ou .png de até 2 MB');
                dados.imagem = await new Promise((resolve, reject) => {
                    const leitor = new FileReader(); leitor.onload = () => resolve(leitor.result); leitor.onerror = reject; leitor.readAsDataURL(arquivo);
                });
            }
            if (produto.id) await update(produto.id, dados); else await create(dados);
            limpar(); setlstProdutos(await getAll());
        } catch (err) { alert(err.response?.data?.message || err.message); }
        finally { setOcupado(false); }
    }
    async function editar(id) {
        try { limpar(); setProduto(await getById(id)); } catch (err) { alert('Erro ao buscar produto'); }
    }
    async function excluir(id) {
        if (!window.confirm('Deseja excluir este produto?')) return;
        try { await remove(id); limpar(); setlstProdutos(await getAll()); } catch (err) { alert('Erro ao excluir produto'); }
    }
    return (
        <div className="container mt-3">
            <h1 className="text-center fs-4">Produto</h1>
            <form onSubmit={handleSubmit}>
                <InputGroup label="nome" onChange={handleChange} type="text" placeholder="Nome do produto" name="nome" value={produto.nome} required />
                <InputGroup label="preço" onChange={handleChange} type="number" placeholder="Preço do produto" name="preco" value={produto.preco} min="0" step="0.01" required />
                <div className="input-group mb-3"><span className="input-group-text">Imagem</span><input ref={inputImagem} className="form-control" type="file" accept=".jpeg,.png" onChange={e => setArquivo(e.target.files[0])} /></div>
                <button disabled={ocupado} className="btn btn-primary" type="submit">{produto.id ? 'Atualizar' : 'Salvar'}</button>
                <button className="btn btn-secondary ms-2" type="button" onClick={limpar}>Cancelar</button>
            </form>
            <div className="table-responsive"><table className="table table-striped mt-3">
                <thead><tr><th>Imagem</th><th>Nome</th><th>Preço</th><th>Ações</th></tr></thead>
                <tbody>{lstProdutos.length === 0 ? <tr><td colSpan={4}>Nenhum produto cadastrado</td></tr> : lstProdutos.map(produto => (
                    <tr key={produto.id}><td>{produto.imagem && <img src={produto.imagem} alt={produto.nome} width="60" />}</td><td>{produto.nome}</td><td>R$ {Number(produto.preco).toFixed(2)}</td><td><button className="btn btn-warning btn-sm me-2" onClick={() => editar(produto.id)}>Editar</button><button className="btn btn-danger btn-sm" onClick={() => excluir(produto.id)}>Excluir</button></td></tr>
                ))}</tbody>
            </table></div>
        </div>
    );
};
export default Produto;
