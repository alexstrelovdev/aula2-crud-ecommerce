# Loja
Projeto da aula 2, com cadastro de produtos, carrinho e vendas.

## Como executar
1. Instale Node.js e MariaDB. Crie o banco com `CREATE DATABASE IF NOT EXISTS loja;`.
2. No terminal da pasta Api, configure DB_USER, DB_PASSWORD, DB_HOST e DB_NAME conforme seu banco. Exemplo no PowerShell: `$env:DB_PASSWORD="sua senha"`. No Linux: `export DB_PASSWORD='sua senha'`. O padrão é root, senha vazia, localhost e loja.
3. Na pasta Api: `npm install` e `npm start`.
4. Em outro terminal, na pasta FrontEnd: `npm install` e `npm start`.
5. Acesse http://localhost:3000/home e http://localhost:3000/produtos.

As tabelas são criadas/atualizadas pelo Sequelize. Use um banco de desenvolvimento e faça backup se já tiver dados. As imagens são guardadas no banco em base64 (até 2 MB, .jpeg ou .png). O carrinho é identificado por um ID salvo no navegador. A venda registra os itens e o total no banco, sem pagamento real.

## Conferência
- Cadastre, edite e exclua produtos. Recarregue a página para verificar a persistência.
- Tente cadastrar preço negativo e arquivo GIF ou JPG; devem ser rejeitados.
- Adicione produtos ao carrinho, altere quantidades, remova e finalize.
- Confira se o carrinho esvazia e se a venda foi registrada na tabela Vendas.

## GitHub
Crie um repositório público vazio no GitHub. Na pasta Loja execute:
```
git init
git add .
git commit -m "Finaliza projeto da aula 2"
git branch -M main
git remote add origin URL_DO_REPOSITORIO
git push -u origin main
```
Envie o link do repositório na atividade. Não publique senhas.
