const { DataTypes } = require('sequelize');
const db = require('../db/conn.js');
const Venda = db.define('Venda', {
    sessao: { type: DataTypes.STRING(36), allowNull: false },
    total: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    itens: { type: DataTypes.JSON, allowNull: false }
});
module.exports = Venda;
