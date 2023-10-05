"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dtabase_1 = require("../config/dtabase");
class Escola extends sequelize_1.Model {
    id;
    nome;
    email;
    cnpj;
    senha;
}
Escola.init({
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    cnpj: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: dtabase_1.default,
    modelName: 'Escola',
    timestamps: true,
});
exports.default = Escola;
