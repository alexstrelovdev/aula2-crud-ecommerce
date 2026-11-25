const { DataTypes } = require('sequelize');
const db = require('../db/conn.js');
const Carrinho = db.define('Carrinho', {
    sessao: { type: DataTypes.STRING(36), allowNull: false, unique: true },
    itens: { type: DataTypes.JSON, allowNull: false, defaultValue: [] }
});
module.exports = Carrinho;
