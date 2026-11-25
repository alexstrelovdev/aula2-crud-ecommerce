import api from '../util/api';
function sessao() {
    let id = localStorage.getItem('carrinho');
    if (!id) { id = crypto.randomUUID(); localStorage.setItem('carrinho', id); }
    return id;
}
async function getAll() { return (await api.get('/carrinho/getAll/' + sessao())).data; }
async function update(produtoId, quantidade) { return (await api.put('/carrinho/update/' + sessao(), { produtoId, quantidade })).data; }
async function remove(id) { return (await api.delete('/carrinho/delete/' + sessao() + '/' + id)).data; }
async function finalizar() { return (await api.post('/venda/create/' + sessao())).data; }
function useCarrinho() { return { getAll, update, remove, finalizar }; }
export default useCarrinho;
