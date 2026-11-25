import api from '../util/api';
async function getAll() { return (await api.get('/produto/getAll')).data; }
async function getById(id) { return (await api.get('/produto/getByID/' + id)).data; }
async function create(produto) { return (await api.post('/produto/create', produto)).data; }
async function update(id, produto) { return (await api.put('/produto/update/' + id, produto)).data; }
async function remove(id) { return (await api.delete('/produto/delete/' + id)).data; }
function useProduto() { return { getAll, getById, create, update, remove }; }
export default useProduto;
