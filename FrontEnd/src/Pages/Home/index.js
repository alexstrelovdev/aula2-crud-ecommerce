import { useEffect, useState } from 'react';
import useProduto from '../../hooks/useProduto';
import useCarrinho from '../../hooks/useCarrinho';
const Home = () => {
    const [produtos, setProdutos] = useState([]);
    const [itens, setItens] = useState([]);
    const [ocupado, setOcupado] = useState(false);
    const { getAll } = useProduto();
    const carrinho = useCarrinho();
    const buscarCarrinho = carrinho.getAll;
    useEffect(() => {
        getAll().then(setProdutos).catch(() => alert('Erro ao buscar produtos'));
        buscarCarrinho().then(setItens).catch(() => alert('Erro ao buscar carrinho'));
    }, [getAll, buscarCarrinho]);
    async function alterar(id, quantidade) {
        setOcupado(true);
        try {
            if (quantidade === 0) await carrinho.remove(id); else await carrinho.update(id, quantidade);
            setItens(await buscarCarrinho());
        } catch (err) { alert(err.response?.data?.message || 'Erro no carrinho'); }
        finally { setOcupado(false); }
    }
    async function finalizar() {
        setOcupado(true);
        try {
            const venda = await carrinho.finalizar(); setItens([]);
            alert('Venda nº ' + venda.id + ' finalizada! Total: R$ ' + Number(venda.total).toFixed(2));
        } catch (err) { alert(err.response?.data?.message || 'Erro ao finalizar venda'); }
        finally { setOcupado(false); }
    }
    const total = itens.reduce((soma, item) => soma + Math.round(Number(item.preco) * 100) * item.quantidade, 0) / 100;
    return (
        <div className="container mt-4"><h1 className="fs-3 mb-4">Loja de produtos</h1>
            <div className="row"><div className="col-lg-8"><div className="row g-3">
                {!produtos.length && <p>Nenhum produto cadastrado.</p>}
                {produtos.map(produto => <div className="col-sm-6 col-xl-4" key={produto.id}><div className="card h-100">
                    {produto.imagem ? <img className="card-img-top" style={{height: 160, objectFit: 'contain'}} src={produto.imagem} alt={produto.nome} /> : <div className="bg-light p-5 text-center">Sem imagem</div>}
                    <div className="card-body"><h2 className="fs-5">{produto.nome}</h2><p>R$ {Number(produto.preco).toFixed(2)}</p><button disabled={ocupado} className="btn btn-primary" onClick={() => alterar(produto.id, (itens.find(item => item.produtoId === produto.id)?.quantidade || 0) + 1)}>Adicionar</button></div>
                </div></div>)}
            </div></div><div className="col-lg-4 mt-3 mt-lg-0"><div className="card"><div className="card-body"><h2 className="fs-4">Carrinho</h2>
                {!itens.length && <p>Carrinho vazio</p>}
                {itens.map(item => <div className="border-bottom py-2" key={item.produtoId}><strong>{item.nome}</strong><p className="mb-1">R$ {(Number(item.preco) * item.quantidade).toFixed(2)}</p><button disabled={ocupado} className="btn btn-outline-secondary btn-sm" onClick={() => alterar(item.produtoId, item.quantidade - 1)}>-</button><span className="mx-2">{item.quantidade}</span><button disabled={ocupado} className="btn btn-outline-secondary btn-sm" onClick={() => alterar(item.produtoId, item.quantidade + 1)}>+</button><button disabled={ocupado} className="btn btn-outline-danger btn-sm ms-2" onClick={() => alterar(item.produtoId, 0)}>Remover</button></div>)}
                <h3 className="fs-5 mt-3">Total: R$ {total.toFixed(2)}</h3><button disabled={ocupado || !itens.length} className="btn btn-success w-100" onClick={finalizar}>Finalizar venda</button>
            </div></div></div></div>
        </div>
    );
};
export default Home;
